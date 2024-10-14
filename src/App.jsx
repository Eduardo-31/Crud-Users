import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Trash from './components/Trash'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer'
import UsersPlaceholders from './components/UsersPlaceholders'

const INITIAL_QUANTITY = 36

function App() {

  const [users, setUsers] = useState()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState()
  const [showForm, setShowForm] = useState(false)
  const [trash, setTrash] = useState(false)
  const { register, handleSubmit, reset, formState:{errors}, setValue } = useForm();

  const containerListRef = useRef()
  const cancelToken = useRef(false)

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
        setLoading(true)
        axios.get(users.info.nextPage)
          .then(res => {
            setUsers(state => ({
              ...res.data,
              users: state.users.concat(res.data.users)
            }))
          })
          .finally(() => setLoading(false))
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
      setSearch('')
      toast.success('User successfully created')
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  // function delete
  const deleteUser = (id) => {
    axios.delete(`${API_URL}${id}`)
    .then(res => {
        setSearch('')
        toast.success('User successfully deleted')
        getAllUsers()
      })
      .catch(err => console.log(err))
    }
    
    // function patch
    const patchUser = (id, data) => {
      axios.patch(`${API_URL}${id}`, data)
      .then(res =>  {
        setSearch('')
        toast.info('User successfully updated')
        getAllUsers()
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
    setSearch(e.target.value)
    const value =  e.target.value.replace(/\s\s+/g, ' ')
    if(cancelToken.current){
      cancelToken.current.cancel("Nueva búsqueda, se cancela la anterior.")
    }

    if(value.trim() != search.replace(/\s\s+/g, ' ').trim()) { 
      cancelToken.current = axios.CancelToken.source()
      axios.get(`${API_URL}/?q=${encodeURIComponent(value)}`, {
        cancelToken: cancelToken.current.token
      })
        .then(res => setUsers(res.data))
        .catch(err => console.error(err))
      }

      if(!value){
        getAllUsers()
      }
  }
  
  const arrPlaceholders = Array.from({ length: INITIAL_QUANTITY}, ((_,index) => `placeholder-${index}`))

  return (
    <div className="App">
      <header>
        <div className='title'>
          <h1>USER MANAGEMENT</h1>
        </div>
        <div className='card-new-create'>
          <div className='input-search-container'>
            <input value={search} className='input-search' type="text" onChange={searchUser} placeholder='Search by name or email' />
            { search && <span translate='no' onClick={() => { 
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
            {
              (search && users?.info.count === 0) ?
                <div className='not-results'>No results found for <span>{search.replace(/\s\s+/g, ' ').trim()}</span></div>
              :
              <main ref={containerListRef} className='container-grid'>
                {
                  !users ? 
                    arrPlaceholders.map(item => (
                      <UsersPlaceholders key={ item}/>
                    ))
                  :
                  users.users.map(user => (
                    <UsersList 
                      key={user.id}
                      user={user}
                      setUpdate={setUpdate}
                      setShowForm={setShowForm}
                      reset={reset}
                      setTrash={setTrash}
                    />
                  ))
                }
              </main>
            }
            
            {
              loading &&
              <span class="loader"></span>
            }
            
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

      <Footer />

      <ToastContainer autoClose={2700} theme="dark"/>
    </div>
  )
}

export default App
