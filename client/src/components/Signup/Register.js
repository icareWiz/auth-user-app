import React from 'react';
import SignupForm from "./SignupForm";
import styled from "@emotion/styled";

const Register = () => {
    return (
        <Main>
            <SignupForm />

            <div className={"importantInfos"}>
                <p>* Cette application web est un exercice personnel, il n'y a aucune condition d'utilisation.</p>
                <p>** Ne renseignez pas votre véritable adresse mail ni de domaine valide comme ".com, .fr etc..".</p>
                <p>*** Ne renseignez pas un mot de passe que vous utilisez pour vous connecter sur un autre site.</p>
            </div>


        </Main>
    );
};

export default Register;

const Main = styled.main `
  
  div.importantInfos {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: max-content;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    
    p {
      font-size: 1.4rem;
      text-align: center;
    }
  }
  
`;