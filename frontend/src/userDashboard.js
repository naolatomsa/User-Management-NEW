//importing
import React from 'react'
import TopBar from './Topbar';
import IMG from './img';
import {useNavigate} from 'react-router-dom';
import { useAuth } from './Auth-context';
import './edituser.css'

const role = localStorage.getItem('userRole') //Getting the role
const UserDashboard = () => {
  const authInfo = useAuth(); //getting user's data
  const navigate = useNavigate(); //navigate

  // JSX
  return (
   <>
   {
    authInfo ? ( <>
      <TopBar name={authInfo.user.first_name} fname={authInfo.user.last_name} imageSrc={authInfo.user.userprofile!=null?authInfo.user.userprofile.photo:null}/>
      <div className="card auserboard">
        <li style={{display:'flex', gap:'10px'}}>
          <a  onClick={()=>navigate('/setaccount')}><img src={process.env.PUBLIC_URL + '/Icons/backpage.png'} style={{ width: '26px', height: '26px' }} alt='Back'  className="topicon"/></a>
          <div style={{marginTop:'15px'}}><span style={{marginBottom:'10px'}}><a onClick={()=>{navigate('/setaccount')}}>Finish your Account</a></span></div>
        </li>
        <div className="card1">
          <div className="wrapper userprofile">
          
              <a className="third after" style={{fontSize:'17px'}}>My profile</a>
              <a onClick={()=>navigate('/updatepro')} className='third after' style={{fontSize:'17px'}}>Update profile</a>
          </div>
    
          <IMG imgName={authInfo.user.userprofile!==null?authInfo.user.userprofile.photo:null} 
          size={'100px'}/>
          <div className="card__text" >
            <h2>{authInfo.user.first_name}  {authInfo.user.last_name}</h2>
            <p style={{color: 'black'}}>{authInfo.user.userprofile!==null?authInfo.user.userprofile.location:"-"}</p>
          </div>
        </div>
        <ul className="card2" style={{ borderBottom: '1px solid #ccc', width:'50%',marginBottom:'0', marginLeft:'100px' }}>
          <li>
          <img src={process.env.PUBLIC_URL + '/Icons/name.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
            <span>{authInfo.user.groups[0]===1?'Admin':'User'}</span>
          </li>
          <li>
          <img src={process.env.PUBLIC_URL + '/Icons/active.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
          <span>{authInfo.user.is_active === true ? 'Active' : 'Inactive'}</span>

          </li>
          <li>
          {authInfo.user.userprofile!==null?authInfo.user.userprofile.gender==='Male'?(<img src={process.env.PUBLIC_URL + '/Icons/men.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>):
          (<img src={process.env.PUBLIC_URL + '/Icons/women.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>):"-"}
          
            <span>{authInfo.user.userprofile!==null?authInfo.user.userprofile.gender:"-"}</span>
          </li>
        </ul>
        <ul className="card3" style={{width:'350px', marginTop:'0',marginLeft:'100px'}} >
          <li>
          <img src={process.env.PUBLIC_URL + '/Icons/email.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
            <span>{authInfo.user.email}</span>
          </li>
          <li>
          <img src={process.env.PUBLIC_URL + '/Icons/phone.png'} style={{ width: '15px', height: '15px',marginRight:'10px', marginTop:'20px' }} alt='Back'  className="topicon"/>
            <span>{authInfo.user.userprofile!==null?authInfo.user.userprofile.phone:"-"}</span>
          </li>

        </ul>
    </div>
    </>):(

      <h1>Loading ...</h1>
    )
   }
  </>
    );
}

export default UserDashboard;