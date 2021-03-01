import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { userLoggedContext } from '../../../context/userContext';
import { useHistory } from "react-router-dom";
import AccountView from './AccountView';


const Account = ( { action } ) => {
    const [isLogged, setIsLogged] = useContext(userLoggedContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    let history = useHistory();    

    useEffect( () => {
        if (isLogged){
            setUsername(Cookies.getJSON('user').username);
            setNickname(Cookies.getJSON('user').nickname);
        }else{
            setUsername("");
            setNickname("");
        }
        setPassword("");
    }, [isLogged]);

    function handleDelete(){
        axios.delete(`http://localhost:27017/users/${Cookies.getJSON("user").id}`)
            .then(() => {
                Cookies.remove('user', { path: '' });
                setIsLogged(false);
                history.push('/posts/list/all');
            })
            .catch(err => setSubmitMessage(err));
    }

    function handleSubmit(){
        if (action === "createAccount") {
            if (username === "" || password === "" || nickname === "")
                return setSubmitMessage("Deben completarse todos los campos.");
        
            axios.post(`http://localhost:27017/users/add`, { username: username, password: password, nickname: nickname })
                .then(res => {
                    setSubmitMessage(res.data.message);
                    Cookies.set("user", {id: res.data.id, username: username, nickname: nickname});
                    setIsLogged(true);
                    history.push('/posts/list/all');
                })
                .catch(err => setSubmitMessage(err));
        }
        
        if (action === "signin") {
            if (username === "" || password === "")
                return setSubmitMessage("Deben completarse todos los campos.");
            
            axios.get(`http://localhost:27017/users/signin/${username}/${password}`)
                .then(res => {
                    if (res.data.message)
                        return setSubmitMessage(res.data.message);
                    
                    Cookies.set("user", { username: res.data.username, nickname: res.data.nickname } );
                    setIsLogged(true);
                    history.push('/posts/list/all')
                })
                .catch(err => {
                    setSubmitMessage(err);
                });
        }

        if (action === "myAccount") {
            if (username === "")
                return setSubmitMessage("El campo username no puede quedar vacío.");

            if (nickname === "")
                return setSubmitMessage("El campo nickname no puede quedar vacío.");

            axios.put(`http://localhost:27017/users/update/${Cookies.getJSON('user').id}`, { username: username, password: password, nickname: nickname })
                .then(res => {
                    setSubmitMessage(res.data.message);
                    Cookies.set("user", {id: Cookies.getJSON("user").id, username: username, nickname: nickname});
                    setIsLogged(true);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    return (
        <AccountView 
            action={action}
            submitMessage={submitMessage}
            username={username}
            password={password}
            nickname={nickname}
            setUsername={setUsername}
            setPassword={setPassword}
            setNickname={setNickname}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
        />
        );
}

export default Account;