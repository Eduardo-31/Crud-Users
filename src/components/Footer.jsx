import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className='footer-content'>
        <div className='footer-icon'>
            {/*<a className='footer-a' href="#"><i className="fa-brands fa-instagram"></i></a>*/}
            <a className='footer-a' target='blank' href="https://github.com/Eduardo-31/Crud-Users.git"><i className="fa-brands fa-github"></i></a>
            <a className='footer-a' href="#"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
            <p>Made by eduardo izacupe</p>
            <p>All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer