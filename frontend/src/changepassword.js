//importing
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Changepassword = () => {
  //creating States
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams(); //getting user Id from link
  const { token } = useParams(); //getting token from link

  //connection with backend
  const handleChangepassword = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/reset_password', { 
        token, userId, newPassword , confirmNewPassword
      })
      console.log('sent secussfilly now login', response)
      navigate('/');
    }catch(error){
      console.log(error)
    }
    
  };


  //JSX
  return (
    <div className='all'>
    <div className='wow'>
        <div className='Naol'>
        <div id="styleec" />
        <div id="stylerec" />
        <div id="poly1" />
        <div className='midlep'>
          <h1 className='h1'>WELCOME!</h1>
          <p className='fp'>
            From chaos to clarity. Simplify user management and say goodbye to spreadsheets.
          </p>
          <p className='sp'>Your time</p>
          <p className='thp'>your data</p>
          <p className='fitp'style={{marginBottom:'0'}}>your peace of mind!</p>
        </div>
      </div>
    </div>
    <div className='form-container' style={{paddingBottom:'0'}}>
      <form className='form' onSubmit={handleChangepassword}>
        <h1 style={{color:'#36AE8B'}}>CREATE NEW PASSWORD</h1>
        <div className='input2'>
          <input type='password' placeholder='New password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/password.png')`, backgroundSize: '20px 20px', 
                backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px'}}/>
        </div>
        <div className='input2'>
          <input type='password' placeholder='Confirm new password' required value={confirmNewPassword} onChange={(e)=>setConfirmPassword(e.target.value)} style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/password.png')`, backgroundSize: '20px 20px', 
                backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px'}}/>
        </div>
        <button type='submit' style={{marginTop: '30px'}}>Change</button>
      </form>
    </div>
  </div>
  )
}

export default Changepassword;