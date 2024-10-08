import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Trash from './components/Trash'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {

  const [users, setUsers] = useState()
  const [update, setUpdate] = useState()
  const [showForm, setShowForm] = useState(false)
  const [trash, setTrash] = useState(false)
  const { register, handleSubmit, reset, formState:{errors}, watch,setValue } = useForm();


  const URL = 'https://users-crud.academlo.tech/users/'

  // obteniendo todos los users
  const getAllUsers = () => {
    axios.get(URL)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])


  // function create
  const createUser = (data) => {
    axios.post(URL, data)
    .then(res => getAllUsers())
    .catch(err => console.log(err))
  }
  
  // function delete
  const deleteUser = (id) => {
    axios.delete(`${URL}${id}/`)
    .then(res => getAllUsers())
    .catch(err => console.log(err))
  }

  // function patch
  const patchUser = (id, data) => {
    axios.patch(`${URL}${id}/`, data)
    .then(res =>  getAllUsers())
    .catch(err => console.log(err))
  }



  const isShow = () => {
    const obj = {
      first_name: '',
      last_name: '',
      email: '',
      birthday: '',
      password: ''
    }
    reset(obj)
    setShowForm(true)
  }

 
  return (
    <div className="App">

      <header>
        <div className='title'>
          <h1>USER MANAGEMENT</h1>
        </div>
        <div className='card-new-create'>
          <button className='button-new-create' onClick={isShow} ><i className="fa-solid fa-plus"></i>Create New User</button>
        </div>
      </header>


      { 
      showForm &&
      <UsersForm
      register={register}
      handleSubmit={handleSubmit}
      patchUser={patchUser}
      createUser={createUser}
      update={update}
      setShowForm={setShowForm}
      showForm={showForm}
      getAllUsers={getAllUsers}
      setUpdate={setUpdate}
      isShow={isShow}
      errors={errors}
      watch={watch}
      setValue={setValue}
      />
      }
        
     
        {
          trash && 
          <Trash 
          update={update}
          deleteUser={deleteUser}
          setTrash={setTrash}
          setUpdate={setUpdate}
          />
        }
        
    
      <main>
        
        {
          users?.map(user => (
            <UsersList 
            user={user}
            key={user.id}
            setUpdate={setUpdate}
            setShowForm={setShowForm}
            reset={reset}
            setTrash={setTrash}
            />
          ))
        }

      </main>
      <footer>
        <div className='footer-content'>
          <div className='footer-icon'>
            <a className='footer-a' href="#"><i className="fa-brands fa-instagram"></i></a>
            <a className='footer-a' href="#"><i className="fa-brands fa-github"></i></a>
            <a className='footer-a' href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
            <p>Made by eduardo izacupe</p>
            <p>All rights reserved</p>
        </div>
      </footer>


    </div>
  )
}

export default App
