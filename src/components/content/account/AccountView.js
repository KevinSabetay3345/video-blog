import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './account.css';

const AccountView = ( { action, submitMessage, username, setUsername, password, setPassword, nickname, setNickname, handleSubmit, handleDelete } ) => {
    return (
        <div className="registration-form" key={action}>
        <form>

            <div className="form-icon">
                <span><i class="bi bi-person" style={{'font-size': '4rem'}}></i></span>
            </div>
            {submitMessage !== "" && <div className="alert alert-danger mb-3" role="alert">{submitMessage}</div>}

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control item" 
                    id="username" 
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    className="form-control item"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </div>
            <div className={action === "signin" ? "form-group hidden" : "form-group" }>
                <input 
                    type="text" 
                    className="form-control item" 
                    id="nickname" 
                    placeholder="Nickname"
                    value={nickname}
                    onChange={ (e) => setNickname(e.target.value) }
                />
            </div>
            <div className="form-group">
                <button type="button" to="/posts/list/all" className="btn btn-block create-account" onClick={handleSubmit}>{ action === "account" ? "Modificar datos" : action === "signin" ? "Sign in" : "Crear Cuenta" }</button>
            </div>
            {   
                action === "account" &&
                <div className="form-group">
                    <button type="button" to="/posts/list/all" className="btn btn-block delete-account" onClick={handleDelete}>Eliminar cuenta</button>
                </div>
            }
            { action === "signin" && <p>¿No tenés cuenta? <span><a href="/createAccount">Registrate</a></span></p> }           
            { action === "createAccount" && <p>¿Ya tenés cuenta? <span><a href="/signin">Sign in</a></span></p> }
            
        </form>
        </div>
    );
}
export default AccountView;