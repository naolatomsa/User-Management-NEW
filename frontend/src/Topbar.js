//importing 
import React from "react";
import './topbar.css';
import IMG from "./img";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
  //props
  const name = props.name;
  const fname = props.fname;
  const imageSrc = props.imageSrc;
  const nav = props.nav;
  const home = props.home;
  const message = props.message;
  const navigate = useNavigate();
  
  const handleNav=()=>{
    navigate(nav)
  }
  const handleHome=()=>{
    navigate(home)
  }

  // Logout
 const handleLogout = () => {
    try{
    //removing all neccessary tokens from local storage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userRole');

    navigate('/');
    }catch(error){
      console.log(error)
    }
  };

  //JSX
  return(
    
    <div className="user-bar">
      <a onClick={handleHome}><img src={process.env.PUBLIC_URL + '/Icons/top icon.png'} style={{ width: '26px', height: '26px' }} alt='Back'  className="topicon"/></a> 
      <a onClick={handleHome}><p className="Iconname">UMS</p></a>
    
      <p className="topbarname" style={{color:'white'}}><a onClick={handleNav} style={{color:'white'}}>{name} {fname}</a></p>
      <div className="left">
        <IMG style={{justfiyself:'start'}} imgName={imageSrc} 
        size={'25px'}/>
        <button className='logout' onClick={handleLogout} style={{borderRadius:'10px',cursor:'pointer'}}> logout</button>
      </div>


    
    </div>
  );
}
export default TopBar;