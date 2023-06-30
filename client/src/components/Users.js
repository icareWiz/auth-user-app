import {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import styled from "@emotion/styled";
import {ReactComponent as LogoutSVG} from "../assets/svg/grommet-icons_logout.svg";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../utils/AxiosInstance";

const Users = () => {
    const [cookies, setCookies, removeCookies] = useCookies(['_id','loggedOn']);
    const userId = cookies._id;

    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
            axios.get(`/authorization${userId}/users`, {withCredentials: true})
                .then(res => {
                    setUsers(res.data.data.users)
                })
                .catch(error => {
                    if (error.message.includes("401")) {
                        setCookies('loggedOn', 'no', {path:'/'})
                        navigate('/401');
                    } else if (error.message.includes("403")) {
                        navigate('/404');
                    }
                });
            axios.get(`/profils/user/${userId}`, {withCredentials: true})
                .then(res => {
                    setUserData(res.data.data.user)
                })
    }, [userId])

    const handleClick = useCallback(async () => {
        removeCookies('_id', {path: '/'});

        try {
            await axios.get(`/user/${userId}/logout`, {
                withCredentials: true
            })
                .then(res => {
                    setCookies('loggedOn', 'no', {
                        path: '/',
                        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                    })
                    navigate('/');
                })
        } catch (error) {
            navigate('/404');
        }

    }, []);

    return (
        <UsersContainer>
            <div className={"userInfosContainer"}>
                <h2>Bienvenu {userData && userData.pseudo}</h2>
                <p onClick={handleClick} className={"logout"}><LogoutSVG/>Déconnexion</p>
            </div>
            <h1>Liste des utilisateurs inscrits :</h1>

            {
                users.map((user, index) => {
                    return (
                        <div className={"userContainer"} key={index}>
                            <hr/>
                            {
                                Object.entries(user).map(([key, value], index) => (

                                    key === 'pseudo' ? <p className={"pseudo"} key={index}>Pseudo : {value}</p>
                                        : <p className={"email"} key={index}>Email : {value}</p>

                                ))
                            }
                        </div>
                    )
                })
            }

        </UsersContainer>
    )
};

export default Users;

const UsersContainer = styled.main`
  background-color: rgba(204, 204, 204, 0.42);
  width: 100%;
  height: 100vh;
  padding: 40px;

  .userInfosContainer {
    display: flex;
    align-items: center;
    margin-bottom: 50px;

    h2 {
      font-size: 2rem;
    }

    .logout {
      font-size: clamp(1.2rem, 2vw, 1.6rem);
      padding: 5px 0 5px;
      margin-left: 30px;
      color: rgba(231, 48, 48, 0.88);
      font-weight: 500;
      cursor: pointer;

      svg {
        position: relative;
        transform: translateY(20%);
      }
    }
  }

  h1 {
    margin-bottom: 15px;
  }

  .userContainer {
    position: relative;
    background-color: #fff;
    width: 100%;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.14);
    margin-bottom: 20px;

    p {
      font-size: 1.6rem;

      &.pseudo {
        margin-right: 5px;
      }
    }

    hr {
      position: absolute;
      height: 100%;
      @media (max-width: 600px) {
        display: none;
      }
    }

  }
`