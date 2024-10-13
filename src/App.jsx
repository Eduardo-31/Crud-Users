import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Trash from './components/Trash'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [users, setUsers] = useState()
  const [search, setSearch] = useState('')
  const [update, setUpdate] = useState()
  const [showForm, setShowForm] = useState(false)
  const [trash, setTrash] = useState(false)
  const { register, handleSubmit, reset, formState:{errors}, setValue } = useForm();

  const containerListRef = useRef()

//https://users-crud.academlo.tech/users
  const API_URL = 'https://crud-user-single.onrender.com/api/v1/users/'

  // obteniendo todos los users
  const getAllUsers = () => {
    axios.get(API_URL)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    if(!users || !users?.info.nextPage) return
    const onChange = (entries, observer) => {
      if(entries[0].isIntersecting){
        axios.get(users.info.nextPage)
          .then(res => {
            setUsers(state => ({
              ...res.data,
              users: state.users.concat(res.data.users)
            }))
          })
        observer.disconnect()
      }
    }
  
    const observer = new IntersectionObserver(onChange, {
      rootMargin: '0px'
    })
    const lastElement = containerListRef.current.children[users.users.length -1]
    observer.observe(lastElement)

    return () => observer.disconnect();
  }, [users])
  



  // function create
  const createUser = (data) => {
    axios.post(API_URL, data)
    .then(res => {
      toast.success('User created successfully')
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  // function delete
  const deleteUser = (id) => {
    axios.delete(`${API_URL}${id}`)
      .then(res => getAllUsers())
      .catch(err => console.log(err))
  }

  // function patch
  const patchUser = (id, data) => {
    axios.patch(`${API_URL}${id}`, data)
      .then(res =>  {
        getAllUsers()
        toast.info('User updated successfully')
      })
      .catch(err => console.log(err))
  }



  const isShow = () => {
    const obj = {
      firstName: '',
      lastName: '',
      email: '',
      birthdate: ''
    }
    reset(obj)
    setShowForm(true)
  }


  const searchUser = (e) => {
    const value = e.target.value.replace(/\s\s+/g, ' ').toLowerCase()
    console.log(value)
    setSearch(e.target.value)
    if(value.trim()){
      console.log('---')
      axios.get(`${API_URL}/?q=${encodeURIComponent(value)}`)
        .then(res => {
          console.log('exito')
          setUsers(res.data)
        })
        .catch(err => console.log(err))
    }

    if(!value){
      getAllUsers()
    }

  }

 
  return (
    <div className="App">
      <header>
        <div className='title'>
          <h1>USER MANAGEMENT</h1>
        </div>
        <div className='card-new-create'>
          <div className='input-search-container'>
            <input value={search} className='input-search' type="text" onChange={searchUser} placeholder='Search by name or email' />
            { search && <span onClick={() => { 
                setSearch('')
                getAllUsers() 
              }} 
              className='input-search-icon-clean'>&#120;</span>
            }
          </div>
          <button className='button-new-create' onClick={isShow} ><i className="fa-solid fa-plus"></i>Create New User</button>
        </div>
      </header>
      <div style={{ flex: '1', paddingBottom: '20px'}}>
            <main ref={containerListRef} className='container-grid'>
              {
                users?.users.map(user => (
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
      </div>
      { 
        showForm &&
        <UsersForm
          register={register}
          handleSubmit={handleSubmit}
          createUser={createUser}
          update={update}
          patchUser={patchUser}
          setShowForm={setShowForm}
          setUpdate={setUpdate}
          errors={errors}
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
      <footer>
        <div className='footer-content'>
          <div className='footer-icon'>
            {/*<a className='footer-a' href="#"><i className="fa-brands fa-instagram"></i></a>*/}
            <a className='footer-a' href="#"><i className="fa-brands fa-github"></i></a>
            <a className='footer-a' target='blank' href="https://github.com/Eduardo-31/Crud-Users.git"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
            <p>Made by eduardo izacupe</p>
            <p>All rights reserved</p>
        </div>
      </footer>
      
    <ToastContainer autoClose={2700} theme="dark"/>
    </div>
  )
}

export default App
