//Importing 
import React, { useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  useEffect(() => {
    const refresh= localStorage.getItem('refresh') //getting refresh token from local storage

    const fetchNewAccessToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh
        });

        const {access} = response.data //getting access token from response.data

        localStorage.removeItem('access'); //removing older access token from local storage

        localStorage.setItem('access', access); //storing access token in local storage
      } catch (error) {
      }
    };

    fetchNewAccessToken();
  }, []);
};
export default MyComponent;



/* 

//Importing 
import React, { useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const MyComponent = () => {
  useEffect(() => {
    const fetchNewAccessToken = async () => {
      const refresh = localStorage.getItem('refresh'); // Get refresh token from local storage
      const access = localStorage.getItem('access'); // Get access token from local storage

      // Check if the access token is expired
      if (isTokenExpired(access)) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
              refresh
          });

          const { access: newAccess } = response.data; // Get new access token from response.data

          localStorage.setItem('access', newAccess); // Store new access token in local storage
        } catch (error) {
          // Handle error
        }
      }
    };

    fetchNewAccessToken();
  }, []);

  const isTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if the token's expiry time is in the past
    return decodedToken.exp < currentTime;
  };

  return null; // This component doesn't render anything
};
export default MyComponent;
*/