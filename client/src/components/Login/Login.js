import React from 'react';
import styled from "@emotion/styled";
import LoginForm from "./LoginForm";


const Login = ({setLoggedIn}) => {
    return (
        <>
            <LoginForm setLoggedIn={setLoggedIn}/>
        </>
    );
};

export default Login;

const Form = styled.form `
  width: 50%;
  height: 65vh;
  max-height: 600px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  
  label, input, h2 {
    width: 50%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  
  h2 {
    text-align: center;
    font-size: 4rem;
    margin-bottom: 30px;
  }

  label {
    font-size: clamp(1.2rem, 5vw, 2.4rem);
    margin-bottom: 10px;
  }
  
  input {
    margin-bottom: 50px;
    height: 40px;
    outline: none;
    padding-left: 10px;
    font-size: 1.8rem;
  }
  
  .login-btn {
    width: 40%;
    margin: 0 auto;
  }
`