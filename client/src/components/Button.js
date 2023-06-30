import React, {memo} from 'react';
import styled from "@emotion/styled";

const Button =  memo(({content, type, className}) => {
    return (
        <>
            <Btn className={className} type={type}>
                { content }
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

