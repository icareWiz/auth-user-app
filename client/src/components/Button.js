import React, {memo, useState} from 'react';
import styled from "@emotion/styled";
import {NavLink} from "react-router-dom";

const Button =  memo(({content, id, type, to, className, navigate}) => {
    return (
        <>
            <Btn className={className} id={id} type={type}>
                {
                    navigate ?
                    <NavLink to={to}>{content}</NavLink>
                        :
                        content
                }
            </Btn>
        </>
    );
});
export default Button;

const Btn = styled.button `
 
    padding: 10px 0;
    background: #6D20FE;
    color: #fff;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    border-radius: 8px;
    outline: none;
    border: none;
    cursor: pointer;
  
  a {
    color: #fff;
    padding: 10px 20px;
  }
  
`

