import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar.jsx';
import './Nav.css';
import Logo from '../Logo.png';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import { gapi } from 'gapi-script';

function Nav({onSearch}) {
  const googleKey = process.env.REACT_APP_GOOGLE_KEY;
  const [user, setUser] = useState({});
  const responseSuccess = (response) => {
    setUser(response.profileObj)
  }

  const responseFailure = (response) => {
    console.log(response);
  }

  const onSuccess = () => {
    window.location.reload(true)
    console.log('Log out successfull');
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleKey,
        scope: ""
      })
    };
    gapi.load('client:auth2', start)
  })

  return (
    <div className='nav'>
      <div className='nav-div'>
        <div className='header' onClick={() => window.location.reload(true)}>
          <img 
            src={Logo} 
            width="40" 
            height="40" 
            alt="pageLogo"
            />{' '}
          <h2 className='title'>Social Network</h2>
        </div>
        <SearchBar onSearch={onSearch} />
        {user.name?
          <div className='user-container'>
            <img 
              className='user-picture'
              src={user.imageUrl}
              alt="pageLogo"
            />
            <div className='user-option'>
              <h4 className='user-name'>{user.name}</h4>
              <div className='logout'>
                <GoogleLogout
                  clientId={googleKey}
                  render={renderProps => (
                    <button className='btn-google' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <svg viewBox="0 0 24 24" width="1" height="1" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                        </g>
                      </svg>
                      Logout
                    </button>
                  )}
                  onLogoutSuccess={onSuccess}
                />
              </div>
            </div>
          </div>
          :
        <GoogleLogin
            clientId={googleKey}
            render={renderProps => (
              <button className='btn-google' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <svg viewBox="0 0 24 24" width="2" height="2" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                Login
              </button>
            )}
            onSuccess={responseSuccess}
            onFailure={responseFailure}
            cookiePolicy={'single_host_origin'}
        />}
      </div>
    </div>
  );
};
  
  export default Nav;