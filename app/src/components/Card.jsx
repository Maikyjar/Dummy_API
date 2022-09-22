import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './Card.css';

export default function Card ({id, image, likes, text, owner, tags}) {
    const [modalComments, setModalComments] = useState(false);
    const [comments, setComments] = useState({})
    const showComments = () => setModalComments(true);
    const key = process.env.REACT_APP_API_KEY;
    const [modalProfile, setModalProfile] = useState(false);
    const [profile, setProfile] = useState({})

    function getProfile(id) {
        axios
            .get(`https://dummyapi.io/data/v1/user/${id}`, {
                headers: {
                  "app-id": key,
                }
              }
            )
            .then(response => {
                    const data = response.data
                    setProfile(data)
            }).catch(console.log);
        
        setModalProfile(true);
    }

    useEffect(() => {
        axios
            .get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`, {
                headers: {
                  "app-id": key,
                }
              }
            )
            .then(response => {
                    const data = response.data.data
                    setComments(data)
            }).catch(console.log);
    }, [])
    
    return (
      <div key={id} className='card-container'>
        <div className='profile'>
            <img className='owner-image' src={owner.picture} alt="ownerImage" width="60" height="60"/>
            <h4 className='profile-name' onClick={() => getProfile(owner.id)}>{owner.firstName} {owner.lastName}</h4>
        </div>
        <h4 className='comment'>{text}</h4>
        <img src={image} alt="postImage" width="700" height="600"/>
        <div>{tags.map((t, index) => {
            return(
                <span key={index}>#{t} </span>
            )
        })}</div>
        <div className='like'>👍{likes}</div>
        <button className='btn-comments' onClick={showComments} disabled={comments.length < 1}>Comentarios({comments.length})</button>
        <Modal 
            active={modalComments}
            change={setModalComments} 
            name={'Comentarios'}
        >   
            <ul>
                {comments.length? comments.map(c => {
                    return(
                        <li key={c.id} className='comment-container'>
                            <div className='profile'>
                                <img className='owner-image' width="40" height="40" src={c.owner.picture} alt="pictureComment" /> 
                                <h5 className='profile-name'>{c.owner.firstName} {c.owner.lastName}</h5>
                            </div>
                            <h3 className='comment'>{c.message}</h3>
                        </li>
                    )
                }):""}
            </ul>
        </Modal>
        <Modal 
            active={modalProfile}
            change={setModalProfile} 
            name={'Profile'}
        >   
            <div className='profile'>
                <img className='owner-image' src={profile.picture} alt="profilePicture" />
                <h4 className='profile-name'>{profile.firstName} {profile.lastName}</h4>
            </div>
            <hr />
            <div className='profile-information'>
                <div className='profile-item'>
                    <span className='profile-information-title'> email </span>
                    <span>{profile.email}</span>
                </div>
                <div className='profile-item'>
                    <span className='profile-information-title'> phone </span>
                    <span>{profile.phone}</span>
                </div>
                <div className='profile-item'>
                    <span className='profile-information-title'> date of birth </span>
                    <span>{profile.dateOfBirth}</span>
                </div>
                <h4>Location: </h4>
                {profile.location?
                    <ul>
                        <li> 
                            <span className='profile-information-title'> city </span>
                            <span>{profile.location.city}</span>
                        </li>
                        <li> 
                            <span className='profile-information-title'> country </span>
                            <span>{profile.location.country}</span>
                        </li>
                        <li> 
                            <span className='profile-information-title'> state </span> 
                            <span>{profile.location.state}</span>
                        </li>
                    </ul>
                    :""}
            </div>
        </Modal>
      </div>
    );
};