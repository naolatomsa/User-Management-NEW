//Importing
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './userpage.css';
import IMG from './img';
import './login.css';
import './edituser.css';
import TopBar from './Topbar';
import { useAuth } from './Auth-context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';


const token = localStorage.getItem('access'); //getting token from local storage
function Edit(){
    const authInfo = useAuth(); //getting users data
    
    //creating states
    const [Username, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { userId } = useParams();
    const [userData, setUserData] = useState({});
    const [userActivities, setUserActivities] = useState([]);
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user_profile_by_admin/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
            );
            setUserData(response.data);
            const activitiesResponse = await axios.get(`http://127.0.0.1:8000/api/get_user_activity/${userId}`
            ,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
            );
            setUserActivities(activitiesResponse.data); 

        } catch (error) {
        }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (userData) {
          setEmail(userData.email);
          setUserName(userData.username);
          
        }
      }, [userData]);

    //admin edit user
    const handleEdituser = async(e)=>{
        e.preventDefault();

        if(Password || confirmPassword!==(''))
        {
          if(Password===confirmPassword)
          {
              const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
              try{
                  const response = await axios.put(`http://127.0.0.1:8000/api/user_profile_by_admin/${userId}`,{
                      Username, Password, confirmPassword, Email
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                  );
                  
              }catch(error){
      
              }
          }
          else{
              toastr.warning('Password Doesn`t much');         
          }

        }
        else{
          const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        
          if (!usernameRegex.test(Username)) {
            toastr.warning('Invalid username format');
            return;
          }
        
          if (!emailRegex.test(Email)) {
            toastr.warning('Invalid email format');
            return;
          }
        
          // if (!passwordRegex.test(Password)) {
          //   toastr.warning('Your password length must be 8 characters and above, it must contain at least one lowercase, one uppercase, one digit.  ');
          //   return;
          }
          try{
              const response = await axios.put(`http://127.0.0.1:8000/api/user_profile_by_admin/${userId}`,{
                  Username, Password, confirmPassword, Email
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
              );
              
          }catch(error){
  
          }

        }
   

    //JSX
  return(
        

        <>
        {
         authInfo ? ( <>
           <div className='tolbar1'><TopBar  home={'/Admin Dashbord'} nav={'/adminpro'} name={authInfo.user.first_name}  fname={authInfo.user.last_name} imageSrc={authInfo.user.userprofile.photo!=null?authInfo.user.userprofile.photo:null} /></div>
        <div className='adminedituserpage'>
        < div className='userpage'>
               <a onClick={()=>navigate('/Admin Dashbord')} style={{margin:'0', height:'47px'}}> <img src={process.env.PUBLIC_URL + '/Icons/back.png'} style={{ width: '26px', height: '26px', marginTop:'20px' }} alt='Back' /></a>

            <div className="card">
            <div className="card1">
            { userData.userprofile!=null?
            (
          <>
          <IMG  imgName={userData.userprofile!==null?userData.userprofile.photo:null}
          size={'100px'} /><div className="card__text">

          <h2>{userData.first_name} {userData.last_name}</h2>

          <p style={{ color: 'black' }}>{userData.userprofile.location!= null ? userData.userprofile.location : "-"}</p>
          </div>
          </>

            ):(<p>Loading...</p>)}
            
            </div>
            <ul className="card2">
            <li>
            <img src={process.env.PUBLIC_URL + '/Icons/name.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
                <span>{userData.groups===1?'Admin':'User'}</span>
            </li>
            <li>
            <img src={process.env.PUBLIC_URL + '/Icons/active.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
                <span>{userData.is_active==true?'Active':'Inactive'}</span>
            </li>
            <li>
            <img src={process.env.PUBLIC_URL + '/Icons/men.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
                <span>{userData.userprofile!=null?userData.userprofile.gender:"-"}</span>
            </li>
            </ul>
            <ul className="card3">
            <li>
            <img src={process.env.PUBLIC_URL + '/Icons/email.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
                <span>{userData.email}</span>
            </li>
            <li>
            <img src={process.env.PUBLIC_URL + '/Icons/phone.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
                <span>{userData.userprofile!=null?userData.userprofile.phone:"-"}</span>
            </li>
            </ul>
        </div>
        </div>

        <div className="edituser">
        <div className='form-container edit'>
        <form className='form editform' onSubmit={handleEdituser}>
        <h1 className='htwo'>Edit {userData.username}'s Account</h1>
        <div className='input2'>
        <input type="text" placeholder="username"  value={Username} onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div className='input2'>
        <input type="email" placeholder="email"  value={Email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='input3'>
            <input type='password' placeholder='password'  value={Password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='inputfour'>
            <input type='password' placeholder='confirm password'  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className='input6'>
                <p style={{color:'red'}}>{message}</p>
            <button type='submit'>save</button>
            </div>
        </form>
      <div className='activitybox'> 
        <table className="responsivetable activitytable" style={{width:'770px', marginLeft:'0'}}>
            <thead>
                <tr className="Date">
                <th className="col1">Date</th>
                <th className="col2">Activity</th>
                </tr>
            </thead>
            <tbody>
                {userActivities && userActivities.map((activity) => (
                <tr key={activity.id}>
                    <td className="col1">{new Date(activity.date_time).toLocaleString()}</td>
                    <td className="col2">{activity.is_login?'loged in':'logged out'}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    </div>
    </div> 
         </>):(
     
           <h1>Loading ...</h1>
         )
        }
       </>
         );
     }

export default Edit;