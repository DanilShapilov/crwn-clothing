// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore, collection, writeBatch } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVx5xu2IMWvNKo5Hz-83_jfA6KHIc6Bk0",
  authDomain: "crwn-db-41649.firebaseapp.com",
  projectId: "crwn-db-41649",
  storageBucket: "crwn-db-41649.appspot.com",
  messagingSenderId: "1064671310045",
  appId: "1:1064671310045:web:7ca435bbe3c6a93fc6eb34",
  measurementId: "G-C1L7D2J51Z"
};



// Initialize Firebase
initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = getAuth()
export const firestore = getFirestore()

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`)
  const snapShot = await getDoc(userRef)



  if (!snapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {})
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey)

  const batch = writeBatch(firestore)
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef)
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

