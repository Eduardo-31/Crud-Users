import React from 'react'

const UsersForm = ({register, handleSubmit, createUser, update, patchUser, setShowForm, showForm, isShow, getAllUsers, setUpdate, errors, watch,setValue}) => {

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

    console.log('first')
    const closeCreate = () =>{
      setShowForm(false)
      setUpdate(null)
    }

  return (
    
    <section className='section-form'>
      <form className={update? 'form-update' : 'form-create'} onSubmit={handleSubmit(submit)}>
        <div className={update ? 'form-title-update' : 'form-title-create'} >
          <div className='form-title'>
            <h2> <i className={update? "fa-solid fa-pen-to-square": "fa-solid fa-user"}></i> {update? 'Modify User' : 'New User'} </h2>
            <button className='button-close' onClick={closeCreate}><i className="fa-solid fa-xmark"></i></button>
          </div>
        </div>

        <div className={update? 'form-content form-content-update': 'form-content form-content-create'}>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="first_name"> <a><i className="fa-solid fa-user"></i></a> First Name</label>
            <input className={update? 'input-update' : 'input-create'}
              type="text"
              id='first_name'
              autoComplete='off'
              {...register("first_name", {
                required: {
                  value: true,
                  message: 'First name is a required field'
                },
                maxLength: {
                  value: 25,
                  message: 'First name must contain a maximum of 25 characters'
                },
                onChange: (value) => {
                  const valueClean = value.target.value.replace(/\s\s+/g, ' ')
                  if(valueClean[0] != ' '){
                      setValue('first_name', valueClean)
                  }else{
                    setValue('first_name', '')
                  }
                }
              })}
            />
            { errors.first_name && <span className='input-error-message'> {errors.first_name.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="last_name"> <a><i className="fa-solid fa-user-plus"></i></a> Last Name</label>
            <input 
              className={update? 'input-update' : 'input-create'}
              type="text" 
              id='last_name'
              autoComplete='off'
              {...register('last_name', {
                required: {
                  value: true,
                  message: 'Last name is a required field'
                },
                maxLength: {
                  value: 25,
                  message: 'Last name must contain a maximum of 25 characters'
                },
                onChange: (value) => {
                  const valueClean = value.target.value.replace(/\s\s+/g, ' ')
                  if(valueClean[0] != ' '){
                      setValue('last_name', valueClean)
                  }else{
                    setValue('last_name', '')
                  }
                }
              })} 
            />
            { errors.last_name && <span className='input-error-message'> {errors.last_name.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="email"> <a><i className="fa-solid fa-envelope"></i></a> Email</label>
            <input 
              className={update? 'input-update' : 'input-create'}
              type="text"
              id='email'
              autoComplete='off'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is a required field'
                },
                /*validate: (value) => {
                    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                    // Using test we can check if the text match the pattern
                    return validEmail.test(value) || "Email must contain '@' and include a '.'"
                }*/
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9+-]+\.[a-z]{2,4}$/,
                  message: "Email must contain '@' and include a '.'"
                },
                maxLength: {
                  value: 40,
                  message: 'Email must contain a maximum of 40 characters.'
                }
              })}
            />
            { errors.email && <span className='input-error-message'> {errors.email.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="password"> <a><i className="fa-solid fa-lock"></i></a> Password</label>
            <input 
              className={update? 'input-update' : 'input-create'}
              type="password"
              id='password'
              autoComplete='off'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is a required field'
                },
                maxLength: {
                  value: 25,
                  message: 'Password must contain a maximum of 25 characters.'
                }
              })}
            />
            { errors.password && <span className='input-error-message'> {errors.password.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="birthday"> <a><i className="fa-solid fa-cake-candles"></i></a> Date of Birth</label>
            <input
              className={update? 'input-update' : 'input-create'}
              type="date"
              id='birthday'
              autoComplete='off'
              {...register('birthday')} 
            />
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
