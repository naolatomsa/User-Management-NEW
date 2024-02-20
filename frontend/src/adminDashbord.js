//Admin dashboard

//Importing required materials
import React, { useState } from 'react';
import { useEffect } from 'react';
import TopBar from './Topbar';
import axios from 'axios';
import './adminDashbord.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth-context';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import IMG from './img';
import Modal from 'react-modal';

const access = localStorage.getItem('access') //getting access token from local storage
function Naol() {
  const authInfo = useAuth();//context api used to fetch user data
  //use state(component memory)
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  //fetching user's data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_list');
        const responseData = response.data;
        if (Array.isArray(responseData)) {
          setData(responseData.map(user => ({ ...user, status: true })));
        } 
        
        else {
          console.error('Fetched data is not an array:', responseData);
          setData([]);
        }
      } catch (error) {
        setData([]);
      }
    };


    fetchData();
  }, []);


// Handle Deactivate user
const handleDeactivate = async (userId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/deactivate_user/${userId}`);

    setData((prevData) =>
      prevData.map((item) =>
        item.id === userId ? { ...item, is_active: !item.is_active } : item
      )
    );
  } catch (error) {
    console.error('Error deactivating user:', error);
  }
};
  

//modal
const openDeleteModal = (userId) => {
  setSelectedUserId(userId);
  setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setIsDeleteModalOpen(false);
};

 // Handle delete user
 const handleConfirmDelete = async () => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete_user/${selectedUserId}`);
    toastr.info('Deleted successfully');

    setData((prevData) => prevData.filter((item) => item.id !== selectedUserId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }

  closeDeleteModal();
};

const handleDelete = async (userId) => {
  openDeleteModal(userId);
};


//JSX
  return (
    <>
    {
      authInfo ?(    <div className="page">
      <TopBar nav={'/adminpro'} name={authInfo.user.first_name} fname={authInfo.user.last_name} imageSrc={authInfo.user.userprofile!=null?authInfo.user.userprofile.photo:null}/>
      <div className="user-man">
        <p style={{
        color: 'black' , fontWeight:'bold'
      }}>User Management</p>
       
      </div>
      <div className="user-role">
            <div className="selectdiv">
          <label>
              <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
                  <option value=''>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
              </select>
          </label>
          <label> 
              <select className="filter-role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                  <option value=''>Role</option>
                  <option>Admin</option>
                  <option>User</option>
              </select>
          </label>
        </div>
        <button onClick={()=>navigate('/adduser')}>Add User</button>
      </div>
      <div className="user-top">
        <div>
           <p style={{
        color: 'black', fontWeight:'bold'
      }}>
          User <br /> 
        </p>
        <p style={{
        color: 'black'
      }}>here is a list of all User</p>
        </div>
       
        <input type="text" placeholder="search" value={search} onChange={(e)=>setSearch(e.target.value)} style={{backgroundImage: `url('${process.env.PUBLIC_URL}/Icons/search.png')`, backgroundSize: '20px 20px', 
                  backgroundRepeat: 'no-repeat',backgroundPosition: 'left 10px center', paddingLeft: '50px'}} />
      </div>
  
      <table>
        <thead>
          <tr>
          <th>User Name</th>
          <th>email</th>
          <th>Role</th>
          <th>status</th>
          <th>Action</th>
          </tr>
          </thead>
          <tbody> 
          {data.filter((item)=>{
            const usernameMatch = item.username.toLowerCase().includes(search.toLowerCase()) || 
            item.email.toLowerCase().includes(search.toLowerCase())

            // Filter by role
            const roleMatch = item.groups[0] === 1 && filterRole === 'Admin' ||
                              item.groups[0] !== 1 && filterRole === 'User' ||
                              filterRole === '';
      
            // Filter by status
            const statusMatch = item.is_active && filterStatus === 'Active' ||
                                !item.is_active && filterStatus === 'Inactive' ||
                                filterStatus === '';
      
            return usernameMatch && roleMatch && statusMatch;
           }) 
           .map((item)=>(
          <tr key={item.id}>
          <td  style={{display:'flex', gap:'10px'}}><IMG   imgName={item.userprofile!= null ? item.userprofile.photo : null} size={'20px'} />   <div>{item.username}</div></td>
          <td>{item.email}</td>
          <td>{item.groups[0]===1?'Admin':'User'}</td>
          <td><a  onClick={() => handleDeactivate(item.id)}>{item.is_active? 'Active':'Inactive'}</a></td>
          <td><a  onClick={()=> navigate(`/edituser/${item.id}`)}><img src={process.env.PUBLIC_URL + '/Icons/active.jpg'} style={{ width: '20px', height: '20px' }} alt='Back' /></a>
          <a onClick={() => handleDelete(item.id)}><img src={process.env.PUBLIC_URL + '/Icons/delete.jpg'} style={{ width: '20px', height: '20px' , marginLeft:'5px'}} alt='Back' /></a></td>
          </tr>
          ))}</tbody>
        </table>

        <Modal className="modal" isOpen={isDeleteModalOpen}>
        <div >
          <p style={{color:'black', fontWeight:'bold'}}>Are you sure you want to delete this user?</p>
          <button style={{width:'70px', height:'50px', borderRadius:'4px', backgroundColor:'red', marginLeft:'50px' }} onClick={handleConfirmDelete}>Yes</button>
          <button style={{width:'70px', height:'50px', borderRadius:'4px', marginLeft:'50px'}} onClick={closeDeleteModal}>No</button>
        </div>
      </Modal>
    </div>):
    (
      <h1>Loading...</h1>
    )
    }
    
    </>
  );
}

export default Naol;
