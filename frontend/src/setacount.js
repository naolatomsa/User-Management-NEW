//importing
import React from 'react';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import IMG from './img';
import './login.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const token = localStorage.getItem('access') //getting access token from local storage
function SetAcount() {
  
  //creating states
  const [save, setSave] = useState('Save Changes');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountriesList, setShowCountriesList] = useState(false);

  const navigate = useNavigate() //navigate

  //libraries used to get list of countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
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



  //setting account
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('image', image);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/update_profile', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toastr.success("You finished your account setup")
      setFirstName('')
      setLastName('')
      setGender('')
      setPhone('')
      setDate('')
      setLocation('')
      setImage('')
      navigate('/userpro')
      window.location.reload()
    } 
    catch (error) {
    }
  };

  //used to clear the input field (setSates(''))
  const handleClear=()=>{
    setFirstName("");
    setLastName("")
    setGender("");
    setPhone("");
    setGender("");
    setDate("");
    setLocation("");
    setImage("");

  }
   
 //JSX
  return (
    <div className='all'>
      <div className='wow'>
          <div className='Naol'>
          <div id="styleec" />
          <div id="stylerec" />
          <div id="poly1" />
          <div className='midlep'>
        <p className='fp'>
            Set up your profile. Let’s know a little bit about you.
            </p>
            <p className='fp'> This won’t take long.</p>
            <a onClick={()=>navigate('/userpro')}><img src={process.env.PUBLIC_URL + '/Icons/backpage.png'} style={{ width: '26px', height: '26px' }} alt='Back'  className="topicon"/></a>
          </div>
        </div>
      </div>
      <div className='form-container' style={{paddingBottom:'0'}}>
        <form className='form' onSubmit={handleSave}>
          <h1 className='h2'>Finish Account Setup</h1>
          <div className='input3'>
            <input type='text' placeholder='First name' required value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            </div>

            <div className='input3'>
            <input type='text' placeholder='Last name' required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
    
        <div className="gender">
          <label style={{marginLeft:'0px' }}>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
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
   
            <div className='input4'>
              <input type='date' placeholder='Date of birth' required value={date} onChange={(e)=>{setDate(e.target.value)}}/>
            </div>
            <div className='inputcountry gender '  >
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
            <div className='input4' >
              
              <input type='file' accept="image/*"   value={FormData.image} onChange={(e)=>{setImage(e.target.files[0])}}/>
            </div>
            <div className='Buttons'>
            <div>
              <button type='submit'>Save Changes</button>
            </div>
            <div >
              <button type='button' className='InputClear' onClick={handleClear} >Clear</button>
              </div>
              </div>
          <p style={{ color: 'black' }}>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SetAcount;
