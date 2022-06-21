import React from 'react'

const UsersForm = ({register, handleSubmit, createUser, update, patchUser, setShowForm, showForm, isShow, getAllUsers, setUpdate}) => {

    const submit = (data) => {
    if(!update){ 
      createUser(data)
      setShowForm(false)
    } else {
      patchUser(update.id, data)
      setShowForm(false)  
      setUpdate(null)    
    }
    }


    const closeCreate = () =>{
      setShowForm(false)
      setUpdate(null)
    }

  return (

    <section className='section-form'>
      <form className={update? 'form-update' : 'form-create'} onSubmit={handleSubmit(submit)}>
        <div className={update? 'form-title form-title-update': 'form-title form-title-create'}>
          <h2> <i className={update? "fa-solid fa-pen-to-square": "fa-solid fa-user"}></i> {update? 'Modify User' : 'New User'} </h2>
          <button className='button-close' onClick={closeCreate}><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className={update? 'form-content form-content-update': 'form-content form-content-create'}>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="first_name"> <a><i className="fa-solid fa-user"></i></a> First Name</label>
            <input className={update? 'input-update' : 'input-create'} type="text" id='first_name' {...register("first_name")}/>
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="last_name"> <a><i className="fa-solid fa-user-plus"></i></a> Last Name</label>
            <input className={update? 'input-update' : 'input-create'} type="text" id='last_name' {...register('last_name')} />
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="email"> <a><i className="fa-solid fa-envelope"></i></a> Email</label>
            <input className={update? 'input-update' : 'input-create'} type="text" id='email' {...register('email')} />
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="password"> <a><i className="fa-solid fa-lock"></i></a> Password</label>
            <input className={update? 'input-update' : 'input-create'} type="password" id='password' {...register('password')} />
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="birthday"> <a><i className="fa-solid fa-cake-candles"></i></a> Date of Birth</label>
            <input className={update? 'input-update' : 'input-create'} type="date" id='birthday' {...register('birthday')} />
          </div>
          <div className='form-l-i'>
            <button className={update? 'button-submit button-submit-update' : 'button-submit button-submit-create' }> { update ? 'update' : 'Submit'} </button>
          </div>
        </div>
      </form>
    </section>

  )
}

export default UsersForm
