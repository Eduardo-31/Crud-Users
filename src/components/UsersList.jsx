import React from 'react'

const UsersList = ({user, setUpdate, setShowForm, reset, setTrash}) => {


  const updateUser = () => {
    setShowForm(true)
    const obj = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthdate: user.birthdate
    }
    reset(obj)
    setUpdate(user)
  }

  const cardDelete = () => {
    setTrash(true) 
    setUpdate(user)
  }

  return (
      <article className='article-users-list'>
            <p> <a><i className="fa-solid fa-user"></i></a> {user.firstName} {user.lastName} </p> 
            <p> <a><i className="fa-solid fa-envelope"></i></a> {user.email} </p>
            <p> <i className="fa-solid fa-cake-candles"></i> {user.birthdate} </p>
            <div className='card-icons'>
              <button className='card-icon-delete' onClick={() => cardDelete()}> <a href="#"><i className="fa-solid fa-trash-can"></i></a> </button>
              <button className='card-icon-update' onClick={() => updateUser()}><a href="#"><i className="fa-solid fa-pen-to-square"></i></a> </button>      
            </div>      
      </article>
  )
}

export default UsersList