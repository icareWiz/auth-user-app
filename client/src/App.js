import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./components/Login/Login";
import Register from "./components/Signup/Register";
import {useCookies} from "react-cookie";
import axios from "axios";
import Users from "./components/Users";
import Error404 from "./components/Errors/Error404";
import UnauthorizedError from "./components/Errors/UnauthorizedError";


function App() {
    const [userData, setUserData] = useState();

    const [cookie] = useCookies();

    const userId = cookie._id;
    const loggedOn = cookie.loggedOn;

    return (
            <BrowserRouter>
                <Routes>
                    <Route path={'*'} element={<Navigate to={'/404'} />} />
                    <Route path={'/404'} element={<Error404 />}/>
                    <Route path={'/401'} element={<UnauthorizedError />}/>
                    <Route path={'/'} element={!userId ? <Login/> : <Users userData={userData}/>}/>
                    <Route path={'/register'} element={!userId ? <Register/> : <Users userData={userData}/>}/>
                    <Route path={'/login'} element={(!userId || loggedOn === 'no') ? <Login/> : <Users userData={userData}/>}/>
                    <Route path={'/users'} element={userId ? <Users userData={userData}/> : <UnauthorizedError />}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
