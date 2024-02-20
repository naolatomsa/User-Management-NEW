//importing
import React from 'react'
import { useEffect, useState } from 'react';
import TopBar from './Topbar'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import './edituser.css'
import IMG from './img';
import './topbar.css'
import { useAuth } from './Auth-context';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useRef } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const access = localStorage.getItem('access') //getting access token from local storage

const UserUpdateProfile = () => {

  const authInfo = useAuth(); //getting User's data
 
  //creating states
  const [location, setLocation] = useState();
  const [countries, setCountries] = useState([]);
  const [showCountriesList, setShowCountriesList] = useState(false);
  const [person, setPerson] = useState({
    firstName: authInfo && authInfo.user ? authInfo.user.first_name: '',
    lastName: authInfo && authInfo.user ? authInfo.user.last_name: ''
  });
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const fileInputRef = useRef(null);

  //setting initial value of the created state
  useEffect(() => {
    if (authInfo) {
      if(authInfo.user.userprofile!=null){
        setLocation(authInfo.user.userprofile.location);
        setPhone(authInfo.user.userprofile.phone);
        setGender(authInfo.user.userprofile.gender);
        setImage(authInfo.user.userprofile.photo);

      }
      
      // setFirstName(authInfo.user.first_name);
      // setLastName(authInfo.user.last_name);
      setEmail(authInfo.user.email);
    }
  }, []);


  const navigate = useNavigate()

  //libraries used to get countries list 
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

    //updating....
    const handleUserUpdateProfile = async(e) => {
      e.preventDefault();
      
      //regular expressions for validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        toastr.warning('Invalid email format');
        return;
      }
      const formData = new FormData();
      formData.append('firstName', person.firstName);
      formData.append('lastName', person.lastName);  
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('email', email);
      formData.append('image', image);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/update_profile', formData,

          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        

      }catch(error){
      }
      toastr.success('You are updated your profile successfully');
      setEmail("")
      setPhone("")
      setLocation("")
      setGender("")
      // setFirstName("")
      // setLastName("")
      window.location.reload();
    };
    const handleImage = () => {
      fileInputRef.current.click(); // Trigger the file input when the icon is clicked
    };
    

  //JSX  
  return (
    <>
    {
           
      authInfo?
      <><TopBar home={'/userpro'} nav={'/userpro'} name={authInfo.user.first_name} fname={authInfo.user.last_name} imageSrc={authInfo.user.userprofile!=null?authInfo.user.userprofile.photo:null} /><div className="card auserboard">


            <div className="wrapper userprofile" style={{ height: '50px' }}>
              <a onClick={() => navigate('/userpro')} className="third after" style={{ fontSize: '17px' }}>My profile</a>
              <a className='third after' style={{ fontSize: '17px' }}>Update profile</a>
            </div>
            <div style={{ position: 'relative' }}>
              <IMG imgName={authInfo.user.userprofile!==null?authInfo.user.userprofile.photo:null} size={'100px'} />
              <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <a onClick={handleImage}><img style={{ marginBottom: '30px', paddingLeft: '45px', width:'70px'}} src={process.env.PUBLIC_URL + '/Icons/addphoto.png'} alt='Add Photo' className="topicon" /></a>
              </div>
            </div>

            
            <form className='editform' onSubmit={handleUserUpdateProfile}>

                    <input
                type="file" accept="image/*" value={FormData.image} onChange={(e) => setImage(e.target.files[0])}
                ref={fileInputRef}
                style={{ display: 'none' }}
      
              />
              <div className='input3'>
                
              <input 
                    type='text' 
                    placeholder='first name'  
                    value={person.firstName} 
                    onChange={(e) => setPerson({ ...person, firstName: e.target.value })} 
                  />
              </div>
              <div className='input2'>
                <input type="text" placeholder="last name"  value={person.lastName} onChange={(e) => setPerson({ ...person, lastName: e.target.value })} />
              </div>

              <div className="gender" style={{ marginTop: '7.5px', marginLeft:'0' }}>
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
          
          style={{marginTop: '10px', border: '1px solid #38A899', borderRadius:'3px'}}
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
                  <option value='' disabled>Select Location</option>
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
                <input type='email' placeholder='email'  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='input6' style={{ gridColumn: '-3 / -1', paddingLeft: '240px' }}>
                {
                  
                }
                <button type='submit'>Update</button>
              </div>
            </form>

          </div></>:
    <h1>Loading..</h1>
    }
    </>
  )
}

export default UserUpdateProfile;