import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import {
  ButtonBarContainer,
  SignInContainer,
  SignInTitle,
} from "./sign-in.styles";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(emailSignInStart(userCredentials));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          value={email}
          handleChange={handleChange}
          required
          type="email"
          label="email"
        />
        <FormInput
          name="password"
          value={password}
          handleChange={handleChange}
          required
          type="password"
          label="password"
        />

        <ButtonBarContainer>
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={() => dispatch(googleSignInStart())}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </ButtonBarContainer>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
