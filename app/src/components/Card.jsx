import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

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
      <div key={id}>
        <img src={owner.picture} alt="ownerImage" />
        <h4 onClick={() => getProfile(owner.id)}>{owner.firstName} {owner.lastName}</h4>
        <h5>{text}</h5>
        <div>{tags.map((t, index) => {
            return(
                <p key={index}>#{t}</p>
            )
        })}</div>
        <img src={image} alt="postImage" />
        <div>👍{likes}</div>
        <button onClick={showComments} disabled={comments.length < 1}>Comentarios({comments.length})</button>
        <Modal 
            active={modalComments}
            change={setModalComments} 
            name={'Comentarios'}
        >   
            <ul>
                {comments.length? comments.map(c => {
                    return(
                        <li key={c.id}>
                            <img src={c.owner.picture} alt="pictureComment" /> 
                            <h5>{c.owner.firstName} {c.owner.lastName}</h5>
                            <h3>{c.message}</h3>
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
            <img src={profile.picture} alt="profilePicture" />
            <h3>{profile.firstName} {profile.lastName}</h3>
            <h4> email: {profile.email}</h4>
            <h4> phone: {profile.phone}</h4>
            <h4> date of birth: {profile.dateOfBirth}</h4>
            {profile.location?
                <ul>
                    <li> city: {profile.location.city}</li>
                    <li> country: {profile.location.country}</li>
                    <li> state: {profile.location.state}</li>
                </ul>
                :""}
        </Modal>
      </div>
    );
};