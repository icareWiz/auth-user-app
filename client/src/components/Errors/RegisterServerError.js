import styled from "@emotion/styled";

const RegisterServerError = ({errPseudo, errEmail, serverErr}) => {
    return (
        <ServerErrorContainer className={"serverError"}>
            {errEmail && <span>Cette email est déjà utilisée !</span>}
            {errPseudo && <span>Ce pseudo est déjà utilisé !</span>}
            {serverErr && <span>{serverErr}</span>}
        </ServerErrorContainer>
    );
};

export default RegisterServerError;

const ServerErrorContainer = styled.div`
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
`