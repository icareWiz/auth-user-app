import React, {useEffect} from 'react';
import styled from "@emotion/styled";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const UnauthorizedError = () => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isAccessedDirectly = !document.referrer;
        const isNavigated = location.pathname === '/users';
        if (isAccessedDirectly && !isNavigated) {
            navigate('/404');
        }
    }, [location, navigate]);

    return (
        <ErrorContainer>
            <p>Erreur 401 unauthorized !</p>

            <p><NavLink className={"loginLink"} to={'/login'}>Connectez-vous</NavLink> pour accéder à cette page.</p>
        </ErrorContainer>
    );
};

export default UnauthorizedError;

const ErrorContainer = styled.div`
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
  
  .loginLink:hover {
    text-decoration: underline;
  }
`;