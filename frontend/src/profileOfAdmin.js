//importing
import React from 'react'
import TopBar from './Topbar';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import IMG from './img';
import './proofadmin.css';
import { useAuth } from './Auth-context';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useRef } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const access = localStorage.getItem('access') //getting access token from local storage

const ProfileOfAdmin = () => {
  const authInfo = useAuth(); //getting user's data
  
  //creating states
  const [location, setLocation] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountriesList, setShowCountriesList] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const navigate = useNavigate() //creating navigate
  const fileInputRef = useRef(null); //useref hook



//setting initial vlaue of the states
  useEffect(() => {
    if (authInfo) {
      if(authInfo.user.userprofile!=null){
        setLocation(authInfo.user.userprofile.location);
        setPhone(authInfo.user.userprofile.phone);
        setGender(authInfo.user.userprofile.gender);

      }
      
      setFirstName(authInfo.user.first_name);
      setLastName(authInfo.user.last_name);
      setEmail(authInfo.user.email);
    }
  }, []);

    
    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get('https://restcountries.com/v2/all');
            setCountries(response.data);
          } catch (error) {
          }
        };
    
        fetchCountries();
      }, []);
      const handleIconClick = () => {
        setShowCountriesList(!showCountriesList);
      };
    
      const handleCountryChange = (selectedCountry) => {
        setLocation(selectedCountry.name);
        setShowCountriesList(false);
      };


    const handleAdminUpdateProfile = async(e) => {
      e.preventDefault();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        toastr.warning('Invalid email format');
        return;
      }
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);  
      formData.append('gender', gender);
      formData.append('phone', phone);
      // formData.append('date', date);
      formData.append('location', location);
      formData.append('image', image);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/update_profile',formData,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        window.location.reload();
        toastr.success("You updated your Profile succeessfully!")


      }catch(error){
      }

  
    };
    const handleImage = () => {
      // Trigger the file input when the icon is clicked
      fileInputRef.current.click();
    };
    
  return (
    <>
    {
      authInfo?
    <><div className='tolbar1'><TopBar home={'/Admin Dashbord'} name={authInfo.user.first_name} fname={authInfo.user.last_name} imageSrc={authInfo.user.userprofile.photo!=null?authInfo.user.userprofile.photo:null}/></div><div className="adminpro">
            <div>

              <div className='userpage'>
                <a onClick={() => navigate('/admin Dashbord')}><img src={process.env.PUBLIC_URL + '/Icons/back.png'} style={{ width: '26px', height: '26px' }} alt='Back' /></a>

                <div className="card">
                  <div className="card1">
                  <div style={{ position: 'relative' }}>
                      <IMG imgName={authInfo.user.userprofile != null ? authInfo.user.userprofile.photo : image} size={'100px'} />
                      <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <a onClick={handleImage}><img style={{ marginTop: '50px',paddingRight:'80px', width:'100px'}} src={process.env.PUBLIC_URL + '/Icons/addphoto.png'} alt='Add Photo' className="topicon" /></a>
                      </div>
                    </div>
                      
                    <div className="card__text">

                      <h2>{authInfo.user.first_name} {authInfo.user.last_name}</h2>
                      <p style={{ color: 'black' }}>{authInfo.user.userprofile.location}</p>
                    </div>
                  </div>
                  <ul className="card2">
                    <li>
                      <img src={process.env.PUBLIC_URL + '/Icons/name.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />
                      <span>{authInfo.user.groups[0]===1?'Admin':'User'}</span>
                    </li>
                    <li>
                      <img src={process.env.PUBLIC_URL + '/Icons/active.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />
                      <span>{authInfo.user.is_active===true?'Active':'Inactive'}</span>
                    </li>
                    <li>
                    {authInfo.user.userprofile.gender==='Male'?(<img src={process.env.PUBLIC_URL + '/Icons/men.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />):(
                      <img src={process.env.PUBLIC_URL + '/Icons/women.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />
                    )}
                      <span>{authInfo.user.userprofile.gender}</span>
                    </li>
                  </ul>
                  <ul className="card3">
                    <li>
                      <img src={process.env.PUBLIC_URL + '/Icons/email.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />
                      <span>{authInfo.user.email}</span>
                    </li>
                    <li>
                      <img src={process.env.PUBLIC_URL + '/Icons/phone.png'} style={{ width: '15px', height: '15px', marginRight: '10px', marginTop: '20px' }} alt='Back' className="topicon" />
                      <span>+{authInfo.user.userprofile.phone}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form-container adminprofile" style={{ marginTop: '75px' }}>

              <form className='form editform admin-pro' onSubmit={handleAdminUpdateProfile}>
                <h1 className='htwo'>Update Profile</h1>
                <input
                type="file" accept="image/*" value={FormData.image} onChange={(e) => setImage(e.target.files[0])}
                ref={fileInputRef}
                style={{ display: 'none' }}
      
              />
                <div className='input3'>
                  <input type='text' placeholder='first name' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='input2'>
                  <input type="text" placeholder="last name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="gender" style={{ marginTop: '7.5px' }}>
                  <label style={{marginLeft:'0px' }}>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="" disabled selected>Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>
                </div>
                <div className='input2'>
          <PhoneInput
          
          style={{marginTop: '10px', border: '1px solid #38A899' ,width:'302px', borderRadius:'3px'}}
          inputProps={{
            style: {
              backgroundColor: '#eee',
              padding: '12px 15px',
              border: 'none',
              margin: '8px 0',
              marginLeft:'30px',
              width: '270px',
              height: '50px',   
            },
          }}
          country={'et'}
          value={phone} 
          onChange={(phone) => setPhone(phone)} 
      />
          
          </div>
                <div className='inputcountry gender' style={{ marginTop: '7.5px' }}>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value='' disabled selected>Select Location</option>
                    {countries.map((country) => (
                      <option key={country.alpha2Code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>

                  {showCountriesList && (
                    <div>
                      <ul>
                        {countries.map((country) => (
                          <li key={country.alpha2Code} onClick={() => handleCountryChange(country)}>
                            {country.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className='input2'>
                  <input type='email' placeholder='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input6'>
                  <button type='submit'>Save</button>
                </div>
              </form>

            </div>
          </div></>
          :
          <h1>Loading..</h1>
          }
</>
  )
}

export default ProfileOfAdmin;