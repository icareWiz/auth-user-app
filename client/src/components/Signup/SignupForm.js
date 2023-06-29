import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";
import Inputs from "../Inputs";
import Button from "../Button";
import axios from "axios";
import {ReactComponent as EmailSvg} from "../../assets/svg/emailsvg.svg";
import {ReactComponent as PasswordSvg} from "../../assets/svg/lock.svg";
import {ReactComponent as PersonSvg} from "../../assets/svg/ic_round-person.svg";
import {emailPattern, passwordPattern, pseudoPattern} from "../../Patterns/Patterns";
import {useCookies} from "react-cookie";
import {NavLink, useNavigate} from "react-router-dom";
import RegisterServerError from "../Errors/RegisterServerError";


const SignupForm = () => {
    const pseudoInput = useRef();
    const emailInput = useRef();
    const confirmEmailInput = useRef();
    const passwordInput = useRef();
    const checkboxInput = useRef();

    const [cookies, setCookies, removeCookies] = useCookies(['_id', 'loggOn']);

    const navigate = useNavigate();

    const [errEmail, setErrEmail] = useState(false);
    const [errPseudo, setErrPseudo] = useState(false);
    const [serverErr, setServerErr] = useState("");

    useEffect(() => {

        setTimeout(() => {
            setErrEmail(false);
            setErrPseudo(false);
        }, 4000);

    }, [errPseudo, errEmail])


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        let ok = true;

        const data = {
            pseudo: pseudoInput.current?.value,
            email: emailInput.current?.value,
            confirmEmail: confirmEmailInput.current?.value,
            password: passwordInput.current?.value,
            checkedConditions: checkboxInput.current?.checked,
        };


        const {pseudo, email, password, confirmEmail, checkedConditions} = data;

        if (!pseudo.match(pseudoPattern)) {
            pseudoInput.current.className = "inputError";
            ok = false;
        }
        if (!email.match(emailPattern)) {
            emailInput.current.className = "inputError";
            ok = false;
        }
        if (!password.match(passwordPattern)) {
            passwordInput.current.className = "inputError";
            ok = false;
        }
        if (confirmEmail !== email) {
            confirmEmailInput.current.className = "inputError";
            ok = false;
        }
        if (!checkedConditions) {
            document.querySelector('label[for="useConditions"]').style.color = "red";
            ok = false;
        }


        if (ok) {
            try {

                await axios.post('/register', {pseudo, email, password}, {withCredentials: true})
                    .then(res => {
                        setCookies('_id', res.data.user._id, {
                            path: '/',
                            expires: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000))
                        });
                        setCookies('loggedOn', 'yes', {
                            path:'/',
                            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                        });
                        navigate('/users')
                    })
            } catch (error) {
                    if (error.response?.data.message.includes("email")) {
                        setErrEmail(true);
                    } else if (error.response?.data.message.includes("pseudo")) {
                        setErrPseudo(true);
                    } else {
                        setServerErr("Erreur 500. Le serveur ne répond pas")
                    }

                }
        }

    }, []);

    const handleBlurConfirm = useCallback(() => {
        emailInput.current?.value !== confirmEmailInput.current?.value
            ?
            confirmEmailInput.current.className = "inputError"
            :
            confirmEmailInput.current.className = "";
    }, [])

    const handleBlur = useCallback((input, regex) => {
        if (!input.current?.value.match(regex)) {
            input.current.className = "inputError";
        } else {
            input.current.className = "";
        }
    }, []);


    return (
        <Form onSubmit={handleSubmit}>
            {
                (errEmail || errPseudo || serverErr) &&
                <RegisterServerError
                    errEmail={errEmail}
                    errPseudo={errPseudo}
                    serverErr={serverErr}
                />
            }
            <h4>Nouveau sur le site ?</h4>
            <p>Saisissez les informations nécessaires pour continuer.</p>

            <Inputs
                htmlfor={"pseudo"}
                divClass={"pseudoInput"}
                labelClass={"pseudoSvg"}
                seo={"pseudo"}
                inputRef={pseudoInput}
                type={"text"}
                name={"pseudo"}
                id={"pseudo"}
                placeholder={"Votre pseudo"}
                svg={<PersonSvg />}
                height={"25px"}
                blur={() => handleBlur(pseudoInput, pseudoPattern)}
            />
            <span className={"errMsg"}>Uniquement des minuscules, majuscules et ( _ , - ).</span>

            <Inputs
                htmlfor={"email"}
                labelClass={"emailSvg"}
                divClass={"emailInput"}
                seo={"email"}
                inputRef={emailInput}
                type={"text"}
                name={"email"}
                id={"email"}
                placeholder={"Votre adresse email"}
                blur={() => handleBlur(emailInput, emailPattern)}
                svg={<EmailSvg/>}
                height={"16px"}
            />

            <Inputs
                htmlfor={"confirmEmail"}
                labelClass={"emailSvg"}
                divClass={"confirmEmailInput"}
                seo={"confirmEmail"}
                inputRef={confirmEmailInput}
                type={"text"}
                name={"confirmEmail"}
                id={"confirmEmail"}
                placeholder={"Confirmez votre adresse email"}
                blur={handleBlurConfirm}
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
            <span className={"errMsg"}>8 caractères minimum. Une majuscule, une minuscule, un chiffre, un caractère spéciale.</span>

            <hr/>
            <br/>

            <Inputs
                htmlfor={"useConditions"}
                divClass={"conditionsInput"}
                inputRef={checkboxInput}
                type={"checkbox"}
                name={"useConditions"}
                id={"useConditions"}
                click={true}
            >
                J'accepte les conditions d'utilisations.
            </Inputs>

            <Button
                className={"signupBtn"}
                type={"submit"}
                content={"S'inscrire"}
            />

            <p>
                Déjà inscrit ?
                <NavLink to={'/login'}>
                    Je me connecte !
                </NavLink>
            </p>

        </Form>
    );
};

export default SignupForm;

const Form = styled.form`
  background-color: #fff;
  width: clamp(30%, 50vw, 440px);
  height: auto;
  margin-left: 50%;
  margin-top: 50px;
  margin-bottom: 50px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  padding: 10px;


  h4 {
    font-size: 1.8rem;
    margin-top: 20px;
  }

  p {
    font-size: max(1.2rem, 1.4rem);
    margin: 15px 0 30px;
  }

  hr {
    width: 90%;
  }

  .signupBtn {
    width: 60%;
  }

  .checkedError {
    color: red;
  }

  .errMsg {
    width: 90%;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 5px;
    color: rgba(198, 32, 32, 0.73);
  }


  @media (max-width: 768px) {

    width: clamp(70%, 90vw, 440px);

  }
`