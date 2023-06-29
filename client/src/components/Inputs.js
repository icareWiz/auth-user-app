import React, {useCallback, useState} from 'react';
import styled from "@emotion/styled";
import {ReactComponent as CloseEye} from "../assets/svg/close_eye.svg";
import {ReactComponent as OpenEye} from "../assets/svg/open_eye.svg";

const Inputs = ({htmlfor, inputRef, name, labelClass, type, id, placeholder, svg, seo, blur, divClass, height, click,onChange, children}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleVisible = useCallback(() => {
        setPasswordVisible(!passwordVisible);
    }, [passwordVisible]);

    const handleClickChecked = useCallback(() => {
        if (inputRef.current?.checked === true) {
            document.querySelector('label[for="useConditions"]').style.color = "initial";
        }
    }, [])


    return (
        <Container className={divClass} height={height}>
            <label htmlFor={htmlfor} className={labelClass}>
                {svg && svg}
                {click && children}
                <span>{seo}</span>
            </label>
            <input
                ref={inputRef}
                type={divClass === "passwordInput" && passwordVisible ? "text" : type}
                name={name}
                id={id}
                placeholder={placeholder}
                onBlur={blur}
                onClick={click && handleClickChecked}
                onChange={onChange && onChange}
            />
            {
                divClass === "passwordInput" &&
                <span
                    className={"eyesSVG"}
                    onClick={handleVisible}
                >
                    {
                        passwordVisible ? <OpenEye/> : <CloseEye/>
                    }
                </span>
            }
        </Container>
    );
};

export default Inputs;

const Container = styled.div `
  width: 90%;
  height: 40px;
  margin-bottom: 15px;
  position: relative;

  span:not(.eyesSVG) {
    font-size: 1.3rem;
  }

  &.pseudoInput {
    height: fit-content;
    margin-bottom: 5px;
  }
  
  &.passwordInput {
    height: fit-content;
    margin-bottom: 5px;
  }

  &.conditionsInput {
    display: flex;
    margin-top: 10px;

    label {
      font-size: clamp(1.4rem, 3vw, 1.4rem);
      margin: 0 0 0 2rem;
    }

    input {
      margin: 0.4rem;
      cursor: pointer;
    }
  }

  label {
    height: ${props => props.height};
    position: absolute;
    left: 5px;
    top: 20px;
    transform: translateY(-50%);
  }

  p {
    margin: 5px 0 10px;
  }


  input:not(#useConditions) {
    width: 100%;
    height: 40px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    outline: none;
    border: .8px solid rgba(68, 68, 68, 0.7);
    padding-left: clamp(15px, 8vmin, 35px);
    font-size: clamp(1.4rem, 3vw, 1.6rem);

    &.inputError {
      border: 1px solid red !important;
    }
  }

  label span {
    display: none;
  }

  .eyesSVG {
    position: absolute;
    right: 5px;
    top: 22px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`