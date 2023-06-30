import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";
import Inputs from "../Inputs";
import Button from "../Button";
import axios from "axios";
import {ReactComponent as EmailSvg} from "../../assets/svg/emailsvg.svg";
import {ReactComponent as PasswordSvg} from "../../assets/svg/lock.svg";
import {emailPattern, passwordPattern} from "../../Patterns/Patterns";
import {NavLink, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


const LoginForm = () => {
    const emailInput = useRef();
    const passwordInput = useRef();

    const [cookies, setCookies] = useCookies(['_id', 'loggOn']);

    const navigate = useNavigate();

    const [logErr, setLogErr] = useState("");

    useEffect(() => {

        setTimeout(() => {
            setLogErr("");
        }, 4000);

    }, [logErr])


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        let ok = true;

        const data = {
            email: emailInput.current?.value,
            password: passwordInput.current?.value,
        };

        const {email, password} = data;

        if (!email.match(emailPattern)) {
            emailInput.current.className = "inputError";
            ok = false;
        }
        if (!password.match(passwordPattern)) {
            passwordInput.current.className = "inputError";
            ok = false;
        }

        if (ok) {
            try {
                await axios.post('/login', {email, password}, {withCredentials: true})
                    .then(res => {
                        setCookies('_id', res.data.user._id, {
                            path: '/',
                            expires: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000))
                        });
                        setCookies('loggedOn', 'yes', {
                            path:'/',
                            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                        });
                        navigate('/users');
                    })
            } catch (error) {
                if (error.response?.data.message.includes("Adresse")) {
                    setLogErr(error.response.data.message);
                } else {
                    navigate('/404');
                }
            }

        }

    }, []);


    const handleBlur = useCallback((input, regex) => {
        !input.current?.value.match(regex) ? input.current.className = "inputError" : input.current.className = "";
    }, [])


    return (
        <Form onSubmit={handleSubmit}>
            {
                (logErr) &&
                <div className={"logErrContainer"}>
                    <span>{logErr}</span>
                </div>
            }
            <h4>J'ai déjà un compte</h4>
            <p>Je me connecte pour avoir accès à la liste des utilisateurs inscris.</p>

            <Inputs
                htmlfor={"emailInput"}
                divClass={"emailInput"}
                seo={"emailInput"}
                inputRef={emailInput}
                type={"text"}
                id={"idConnexion"}
                placeholder={"Votre adresse email"}
                blur={() => handleBlur(emailInput, emailPattern)}
                svg={<EmailSvg/>}
                height={"16px"}
            />

            <Inputs
                htmlfor={"password"}
                labelClass={"passwordSvg"}
                divClass={"passwordInput"}
                seo={"password"}
                inputRef={passwordInput}
                type={"password"}
                name={"password"}
                id={"password"}
                placeholder={"Choisissez un mot de passe"}
                blur={() => handleBlur(passwordInput, passwordPattern)}
                svg={<PasswordSvg/>}
                height={"19px"}
            />

            <hr/>
            <br/>

            <Button
                className={"signupBtn"}
                type={"submit"}
                content={"Se connecter"}
            />

            <p>
                Pas encore inscris ?
                <NavLink className={"signup"} to={'/register'}>
                    Je m'inscris !
                </NavLink>
            </p>

        </Form>
    );
};

export default LoginForm;

const Form = styled.form`
  background-color: #fff;
  width: clamp(35%, 55vw, 440px);
  height: auto;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  padding: 10px;
  margin-left: 50%;
  margin-top: 50px;
  margin-bottom: 50px;

  .logErrContainer {
    width: 100%;
    height: 30px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: #d1233b;
    text-align: center;

    span {
      line-height: 30px;
      font-size: clamp(1rem, 2vw, 1.6rem);
      color: #fff;
    }
  }
  
  h4 {
    font-size: 1.8rem;
    margin-top: 20px;
  }

  p {
    font-size: max(1.2rem, 1.4rem);
    margin: 15px 0 20px;
    padding: 0 10px;
  }

  hr {
    width: 90%;
    margin-top: 10px;
  }

  .signupBtn {
    width: 60%;
  }

  .checkedError {
    color: red;
  }

  .selectContainer {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      margin-right: 1vmin;
      font-size: clamp(1.4rem, 3vw, 1.6rem);
    }

    select {
      max-width: 80%;
      font-size: 1.6rem;
    }
  }

  .signup {
    margin: 5px;
    font-size: clamp(1.2rem, 2vw, 1.4rem);

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {

    width: clamp(70%, 90vw, 440px);

  }
`