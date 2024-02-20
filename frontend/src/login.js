//importing
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './login.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


function Login() {
  //creating states
  const [action, setAction] = useState('Login');
  const [isSignUp, setIsSignUp] = useState(false);
  const [Username, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [Email, setEmail] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate()
  //used to switch between signup and login
  const switchForm = () => {
    setIsSignUp(!isSignUp);
    setAction(isSignUp ? 'Login' : 'Sign Up');
    setUserName("");
    setPassword("");
    
    
  };

  //Regular expressions for validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z!@#$%^&*()_+0-9]{6,}$/;
  const isValid = passwordRegex.test(Password);
  useEffect(()=>{
   setIsValidPassword(isValid);
  }, [isValid])

  const handleForget = () => {
    navigate('./forget')
  }
  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!Username.trim() || !Password.trim() || !Email.trim() || !ConfirmPassword.trim()) {
      console.error('All fields are required.');
      return;
    }
    if (Password !== ConfirmPassword) {
      toastr.warning('Passwords do not match');
      return;
    }
  
    // Regular expressions for validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    if (!usernameRegex.test(Username)) {
      toastr.warning('Invalid username format');
      return;
    }
  
    if (!emailRegex.test(Email)) {
      toastr.warning('Invalid email format');
      return;
    }
  
    if (!passwordRegex.test(Password)) {
      toastr.warning('Your password length must be 8 characters and above, it must contain at least one lowercase, one uppercase, one digit.  ');
      return;
    }

    //signup
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        Username, Email, Password, ConfirmPassword
      });
  
      const { access, refresh, userRole } = response.data;
  
  
      navigate('/userpro');
      window.location.reload();
      toastr.success('You have signed up successfully. Now you can finish your account setup or skip and finish later!');
  
      //storing Token(both) to local storage
      localStorage.setItem('access', access); 
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('userRole', userRole);
    } catch (error) {
    }
  };

    //login
    const handleLogin = async (e) => {
      e.preventDefault()

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          Username,
          Password,
        });


        const {access} = response.data
        const {refresh} = response.data
        const {userRole} = response.data
        if (userRole==="Admin"){
          
          navigate('/Admin Dashbord')
          toastr.success('Logged in successfully');
          window.location.reload()
        }

        else{
          navigate('/userpro')
          toastr.success('Logged in successfully');
          window.location.reload();
        }
        
        //storing Token(both) to local storage
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('userRole', userRole);

      } catch (error) {
        toastr.error('Invalid Credential or user doesnot exist')

        
      }
    };

  //JSX
  return (
    <div className='all'>
      <div className='wow'>
          <div className='Naol'>
          <div id="styleec" />
          <div id="poly1" />
          
          <div className='midlep'>
          <div id="stylerec" />
          
            <h1 className='h1'>WELCOME!</h1>
            <p className='fp'>
              From chaos to clarity. Simplify user management and say goodbye 
              to spreadsheets.
            </p>
  
            <p className='sp'>Your time</p>
            <p className='thp'>your data</p>
            <p className='fitp' style={{marginBottom:'0'}}>your peace of mind!</p>
          </div>
        </div>
      </div>
      <div className='form-container' style={{paddingBottom:'0'}}>
        
        <form className='form' onSubmit={isSignUp ? handleSignup : handleLogin}>
        
          <h1 className='h2'>{action}</h1>
          
          {isSignUp && (
            <div className='input3'>
              <input type='email' placeholder='Email' required value={Email} onChange={(e)=>{setEmail(e.target.value)}}
              style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/email.png')`, backgroundSize: '20px 20px', 
              backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px' }}/>
            </div>
          )
          }
          <div className='input1'>
            <input type='text' required value={Username} onChange={(e)=>{setUserName(e.target.value)}} placeholder={error ? error : 'Username'}
        style={{ borderColor: error ? 'red' : '' , backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/name.png')`, backgroundSize: '20px 20px', 
        backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px' }} />
          </div>
          <div className='input2'>
            <input type='password' required value={Password} onChange={(e)=>{setPassword(e.target.value)}} placeholder={error ? error : 'Password'}
        style={{ borderColor: error ? 'red' : '' , backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/password.png')`, backgroundSize: '20px 20px', 
        backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px'}}/>

          </div>
          {isSignUp && (
            <div className='input4'>
              <input type='password' placeholder='Confirm Password' required value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}
                style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/password.png')`, backgroundSize: '20px 20px', 
                backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px' }}/>
            </div>
          )}
          
          {isSignUp ? (<button onClick={handleSignup}>{action}</button>):
           (<button type='submit' onClick={handleLogin}>{action}</button>)}
           {isSignUp ? '': (<a onClick={handleForget} style={{fontSize:'17px',color:'#38A899'}}>Forgot your password?</a>)}

          <p style={{ color: 'black',fontSize:'17px'}} >
            {isSignUp ? 'Already have an account?' : 'New user?'}
            <a onClick={switchForm} style={{fontSize:'17px', color:'#38A899'}}> {isSignUp ? 'Login' : 'Sign Up'}</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
