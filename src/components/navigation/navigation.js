import React, { useContext } from 'react';
import './navigation.css';
import { Link } from "react-router-dom";
import { userLoggedContext } from '../../context/userContext';
import Cookies from "js-cookie";

const Navigation = () => {
    const [ isLogged, setIsLogged ] = useContext(userLoggedContext);

    function signout(){
      setIsLogged(false);
      Cookies.remove("user", { path: '' });
    }
    
    return (
      <nav id="mainNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/posts/list/all">Home</Link>
            </li>
            <li className="nav-item">
              { !isLogged && <Link className="nav-link" to="/signin">My account</Link> }
              { isLogged && <Link className="nav-link" to="/myAccount">My account</Link> }
            </li>
            <li className="nav-item">
              { !isLogged && <Link className="nav-link" to="/signin">My posts</Link> }
              { isLogged && <Link className="nav-link" to={`/posts/list/${Cookies.getJSON('user').nickname}`}>My posts</Link> }
            </li>
            <li className="nav-item">
              { !isLogged && <Link className="nav-link" to="/signin">New post</Link> }
              { isLogged && <Link className="nav-link" to="/posts/new">New post</Link> }
            </li>
            <li className="nav-item">
              { !isLogged && <Link className="nav-link" to="/signin">Sign in</Link> }
              { isLogged && <Link className="nav-link" to="/posts/list/all" onClick={ signout }>Sign out</Link> }
            </li>
          </ul>
      </nav>
    )
}

export default Navigation;