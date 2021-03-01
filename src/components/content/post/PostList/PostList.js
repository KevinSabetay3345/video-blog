import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostList.css';
import ReactPlayer from 'react-player/youtube';
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

const PostList = () => {
    const { user } = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      axios.get(`http://localhost:27017/posts/${user}`)
        .then(res => {
          setIsLoading(false);
          if (res.data.length > 0) {
              setPosts(res.data);
              setError(undefined);
          } else {
            setError({message: "No se encuentra ningun post disponible."})
          }
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, [user]);
    
    if (isLoading){ 
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (typeof(error) !== "undefined"){
      return <div className="error-message">{error.message}</div>;
    }

    return (
        <>
        <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">

            {posts.map(post => {
              return(
                <div key={post._id}>
                  <div className="post-preview">

                    <a href="post.html">
                      <h2 className="post-title">
                        {post.title}
                      </h2>
                      <h3 className="post-subtitle">
                        {post.subtitle}
                      </h3>
                    </a>
                    
                    <ReactPlayer url={post.ytURL} width="60vw" controls />
                    
                    <div className="post-footer">
                      <p className="post-meta">Posted by
                        <Link to={`/posts/list/${post.userNickname}`}>{" " + post.userNickname + " "}</Link>
                        on {post.date}
                      </p>

                      { Cookies.getJSON('user') && post.userNickname === Cookies.getJSON('user').nickname && 
                        <p className="post-meta">
                          <Link id="edit" to={`/posts/update/${post._id}`} >Edit</Link>
                        </p> 
                      }
                    </div>

                  </div>
                  <hr/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    
      <hr/>
      </>
    )
}

export default PostList;