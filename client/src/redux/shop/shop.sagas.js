import { takeLatest, call, put, all } from 'redux-saga/effects'

import ShopActionTypes from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export function* fetchCillectionsAsync() {
  try {
    const collectionRef = collection(firestore, "collections");
    const snapshot = yield getDocs(collectionRef);
    const collecttionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collecttionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCillectionsAsync)
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}