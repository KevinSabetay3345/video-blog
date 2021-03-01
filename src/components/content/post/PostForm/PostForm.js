import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import PostFormView from './PostFormView';

const PostForm = ({ action }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [ytURL, setYtURL] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { id } = useParams();
    let history = useHistory();    

    useEffect(() => {
        if (action === "update"){
            axios.get(`http://localhost:27017/posts/get/${id}`)
                .then(res => {
                    setTitle(res.data.title);
                    setSubtitle(res.data.subtitle);
                    setYtURL(res.data.ytURL);
                })
                .catch(err => console.log(err));
        }
    }, [action, id])

    function handleSubmit() {
        if (title === "" || subtitle === "" || ytURL === ""){
            setMessage("Deben completarse todos los campos.");
            setIsSuccess(false);
            return;
        }
        if (action === "new"){
            axios.post(`http://localhost:27017/posts/add`, { title: title, subtitle: subtitle, ytURL: ytURL, userNickname: Cookies.getJSON('user').nickname })
                .then(res => {
                    setMessage(res.data.message);
                    setIsSuccess(true);
                })
                .catch(err => {
                    setMessage(err);
                    setIsSuccess(false);
                });

        } else {
            
            axios.put(`http://localhost:27017/posts/update/${id}`, { title: title, subtitle: subtitle, ytURL: ytURL, userNickname: Cookies.getJSON('user').nickname })
                .then(res => {
                    setMessage(res.data.message);
                    setIsSuccess(true);
                })
                .catch(err => {
                    setMessage(err);
                    setIsSuccess(false);
                });
        }
    }

    function handleDelete() {
        axios.delete(`http://localhost:27017/posts/${id}`)
            .then(res => {
                history.push('/posts/list/all')
            })
            .catch(err => setMessage(err));
    }

    return (
        <PostFormView 
            action={action}
            message={message}
            isSuccess={isSuccess}
            title={title}
            setTitle={setTitle}
            subtitle={subtitle}
            setSubtitle={setSubtitle}
            ytURL={ytURL}
            setYtURL={setYtURL}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
        />
    );
}

export default PostForm;