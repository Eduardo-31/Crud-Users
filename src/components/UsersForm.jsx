import React from 'react'

const UsersForm = ({register, handleSubmit, createUser, update, patchUser, setShowForm, setUpdate, errors, setValue}) => {

    const submit = (data) => {
      console.log('DATA',data)
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
            <label className={update? 'label-update' : 'label-create'} htmlFor="firstName"> <a><i className="fa-solid fa-user"></i></a> First Name</label>
            <input className={update? 'input-update' : 'input-create'}
              type="text"
              id='firstName'
              autoComplete='off'
              {...register("firstName", {
                required: {
                  value: true,
                  message: 'firstName is a required field'
                },
                validate: (value) => {
                  const firstThree = value.substring(0, 3)
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/
                  if(!regex.test(firstThree)){
                    return "firstName can only contain letters in the first 3 characters"
                  }
                  const valueClean = value.replace(/\s\s+/g, ' ').trim()
                  if(!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value) && (valueClean.length >= 3 && valueClean.length <= 50)){
                    return "firstName can only contain letters, accents, and spaces"
                  }
                  if(valueClean.length < 3 || valueClean.length > 50){
                    return 'firstName must be between 3 and 50 characters'
                  }
                },
                onChange: (e) => {
                  const value = e.target.value
                  const valueClean = value.replace(/\s\s+/g, ' ')
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/
                    if(regex.test(valueClean) && value != ' '){
                        setValue('firstName', valueClean)
                    }else{
                      setValue('firstName', valueClean.slice(0, valueClean.length - 1))
                    }
                },
              })}
            />
            { errors.firstName && <span className='input-error-message'> {errors.firstName.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="lastName"> <a><i className="fa-solid fa-user-plus"></i></a> Last Name</label>
            <input 
              className={update? 'input-update' : 'input-create'}
              type="text" 
              id='lastName'
              autoComplete='off'
              {...register('lastName', {
                required: {
                  value: true,
                  message: 'lastName is a required field'
                },
                validate: (value) => {
                  const firstThree = value.substring(0, 3);  // Extraemos los primeros 3 caracteres
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/;
                  if(!regex.test(firstThree)){
                    return "lastName can only contain letters in the first 3 characters"
                  }

                  const valueClean = value.replace(/\s\s+/g, ' ').trim()
                  if(!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(value) && (valueClean.length >= 3 && valueClean.length <= 100)){
                    return "lastName can only contain letters, accents, and spaces"
                  }
                  if(valueClean.length < 3 || valueClean.length > 100){
                    return 'lastName must be between 3 and 100 characters'
                  }
                },
                onChange: (e) => {
                  const value = e.target.value
                  const valueClean = value.replace(/\s\s+/g, ' ')
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/
                    if(regex.test(valueClean) && value != ' '){
                        setValue('lastName', valueClean)
                    }else{
                      setValue('lastName', valueClean.slice(0, valueClean.length - 1))
                    }
                },
              })} 
            />
            { errors.lastName && <span className='input-error-message'> {errors.lastName.message} </span> }
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
                  message: 'email is a required field'
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-z0-9+-]+\.[a-z]{2,4}$/,
                  message: "email must contain '@' and include a '.'"
                },
                maxLength: {
                  value: 40,
                  message: 'email must contain a maximum of 40 characters.'
                }
              })}
            />
            { errors.email && <span className='input-error-message'> {errors.email.message} </span> }
          </div>
          <div className='form-l-i'>
            <label className={update? 'label-update' : 'label-create'} htmlFor="birthdate"> <a><i className="fa-solid fa-cake-candles"></i></a> Date of Birth</label>
            <input
              className={update? 'input-update' : 'input-create'}
              type="date"
              id='birthdate'
              autoComplete='off'
              {...register('birthdate', {
                required: {
                  value: true,
                  message: 'birthdate is a required field'
                },
                validate: (value) => {
                  if(new Date(value) > new Date()) {
                    return ("birthdate cannot be in the future")
                  }
                }
              })} 
            />
            { errors.birthdate && <span className='input-error-message'> {errors.birthdate.message} </span> }
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
