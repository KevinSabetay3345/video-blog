import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostForm.css';

const PostFormView = ({ action, message, isSuccess, title, setTitle, subtitle, setSubtitle, ytURL, setYtURL, handleSubmit, handleDelete }) => {
    return (
        <div className="registration-form">
        <form>
            <div class="form-icon">
                <span><i class="bi bi-file-earmark-play" style={{'font-size': '4rem'}}></i></span>
            </div>
            {message !== "" && <div class={`alert alert-${isSuccess ? "success" : "danger"} mb-3`} role="alert">{message}</div>}
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control item" 
                    id="title" 
                    placeholder="Title"
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                />
            </div>
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control item" 
                    id="subtitle" 
                    placeholder="Subtitle"
                    value={subtitle}
                    onChange={ (e) => setSubtitle(e.target.value) }
                />
            </div>
            <div class="form-group">
                <input 
                    type="text" 
                    class="form-control item" 
                    id="ytURL" 
                    placeholder="YouTube URL"
                    value={ytURL} 
                    onChange={ (e) => setYtURL(e.target.value) }
                />
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-block create-post" onClick={handleSubmit}>{action === "update" ? "Modificar post" : "Crear post" }</button>
            </div>
            {   
                action === "update" &&
                <div class="form-group">
                    <button type="button" to="/" class="btn btn-block delete-post" onClick={handleDelete}>Eliminar post</button>
                </div>
            }
        </form>
        </div>
    );
}

export default PostFormView;