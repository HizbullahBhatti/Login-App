import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {userNameValidate} from '../helper/validate'
import { useAuthStore } from '../store/Store'

const Username = () => {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  // const handleUsername = (e) => {
  //   setUsername(e.target.value)
  //   console.log(username)
  // }

  return (
    <div className="conatiner mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again </h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More By Connecting with us
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} alt="avatar" className={styles.profile_img}/>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} /*value={username} onChange={handleUsername}*/ className={styles.textbox} type="text" placeholder='Username'/> 
              <button className={styles.btn} type="submit">Lets Go</button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member <Link className='text-green-600' to='/register'>Register</Link></span>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Username