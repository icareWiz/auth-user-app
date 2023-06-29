import React from 'react';
import styled from "@emotion/styled";

const Error404 = () => {
    return (
        <ErrorContainer>
            <p>Erreur 404 not found !</p>

            <p>Cette page est introuvable.</p>
        </ErrorContainer>
    );
};

export default Error404;

const ErrorContainer = styled.div `
  background-color: rgba(204, 204, 204, 0.51);
  height: 100vh;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  p:nth-of-type(1) {
    margin-bottom: 50px;
    margin-top: -100px;
    font-size: min(4rem, 4rem);
  }
`;