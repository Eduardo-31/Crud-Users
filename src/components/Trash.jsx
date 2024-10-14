import React from 'react'

const Trash = ({setTrash, update, deleteUser, setUpdate}) => {


  const deleted = () => {
    deleteUser(update?.id)
    setTrash(false)
    setUpdate(null)
  }

  const cancel = () => {
    setTrash(false)
    setUpdate(null)
  }

  return (
    <section className='container-trash'>
        <article className='card-trash'>
            <i className="fa-solid fa-triangle-exclamation"></i> 
            <p>Are you sure you want to complete the following action?</p>
            <div className='card-trash-button'>
                <button className='button-accept' onClick={deleted}>Accept</button>
                <button className='button-cancel' onClick={cancel} >Cancel</button>
            </div>
        </article>
    </section>
  )
}

export default Trash