import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from './googleLogin';

const GoogleSocialAuth = () => {

    const responseGoogle = async(response) => {
      	let googleResponse  = await googleLogin(response.accessToken)
      	console.log(googleResponse);
      	console.log(response);
    };
    
    return (
      <div className="App">
        <GoogleLogin
          clientId="213170417385-544j24pclf9q779i6j04kresk0arnc7s.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
}

export default GoogleSocialAuth;