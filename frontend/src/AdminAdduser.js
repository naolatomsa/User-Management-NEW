//Admin Add new user

//importing required materials
import React from 'react'
import { useEffect, useState } from 'react';
import TopBar from './Topbar'
import axios from 'axios'
import './edituser.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth-context';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

//function to write component
function AdminAdduser(){

  //context api to fech user's data
  const authInfo = useAuth();
  const navigate = useNavigate();
   //use state(component memory)
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");  
  const [error, setError] = useState('');

  //function to handle add new user
  const handleAdduser = async (e)=>{
    e.preventDefault(); 
    if(Password===ConfirmPassword){

        // Regular expressions for validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      
        //regex validation
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

      //connection with backend
      try{
        const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
          Email, Password, ConfirmPassword, Username
        })

        toastr.success("You have Added new user Succesfully")
        setConfirmPassword("")
        setPassword("")
        setEmail("")
        setUsername("")
        navigate('/Admin Dashbord')
        

      } catch(error){

      }

      }
      else{
        toastr.warning("Password Doesn`t match")
      }

  }


  //JSX 
  return (
    <>
    {
      authInfo? 
      <div className='Add-user'>
        <TopBar home={'/Admin Dashbord'} nav={'/adminpro'} name= {authInfo.user.first_name} fname= {authInfo.user.last_name} imageSrc={authInfo.user.userprofile.photo!=null?authInfo.user.userprofile.photo:null}/>
        <a onClick={()=>navigate('/Admin Dashbord')}><img src={process.env.PUBLIC_URL + '/Icons/back.png'} style={{ width: '26px', height: '26px', marginLeft:'100px' }} alt='Back' /></a>
        <div className='form-container adduser'>
        <form className='form editform' style={{height:"500px"}} onSubmit={handleAdduser}>
        <h1 className='htwo'>Add New User</h1>
        <div className='input3'>
            <input type='text' placeholder='username' required value={Username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
        <div className='input2'>
        <input type="email" placeholder="email" required value={Email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
            <div className='input3'>
            <input type='password' placeholder='password' required value={Password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
        <div className='input2'>
        <input type="password" placeholder="confirm password" required value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
            <div className='input6' style={{gridColumn: '-3 / -1', paddingLeft:'240px'}}>
            <button type='submit' >Add user</button> 
            </div>
        </form>
        </div>
    </div>
    :
    <h1>Loading...</h1>
    }
    </>
  )
}

export default AdminAdduser;