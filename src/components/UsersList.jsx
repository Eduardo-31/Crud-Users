import React from 'react'

const UsersList = ({user, setUpdate, setShowForm, reset, setTrash}) => {


  const updateUser = () => {

    setShowForm(true)

    const obj = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      birthday: user.birthday,
      password: user.password
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
            <h3> {user.first_name} {user.last_name} </h3>
            <span>email: </span>
            <p> {user.email} </p>
            {
              user.birthday && 
              <p> <i className="fa-solid fa-cake-candles"></i> {user.birthday} </p>
            }
            <div className='card-icons'>
              <button className='card-icon-delete' onClick={cardDelete}><i className="fa-solid fa-trash-can"></i></button>
              <button className='card-icon-update' onClick={updateUser}><i className="fa-solid fa-pen-to-square"></i></button>      
            </div>      
      </article>
  )
}

export default UsersList