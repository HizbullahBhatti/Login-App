import React, { useEffect } from 'react'
import styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import {resetPasswordValidation} from '../helper/validate'
import {resetPassword} from '../helper/helper'
import {useAuthStore} from '../store/Store'
import { useNavigate, Navigate } from 'react-router-dom'
import { useFetch } from '../hooks/fetch.hooks'

const Reset = () => {

  const {username} = useAuthStore(state=>state.auth)
  const navigate = useNavigate()
  const [{ isLoading,apiData,status,serverError }] = useFetch('createResetSession')


  useEffect(()=>{
    console.log(apiData)
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async (values) => {
      console.log(values)

      let resetPromise =resetPassword({username,password:values.password})

      toast.promise(resetPromise,{
        loading:'Updattiing ...',
        success:<b>Reset Successfully</b>,
        error:<b>Could not reset</b>
      });

      resetPromise.then(()=>navigate('/password'))


    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1> 
  if(status &&  status !== 201) return <Navigate to='/password' replace = {true} />

  return (
    <div className="conatiner mx-auto">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Rseset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter New Password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password'/> 
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Confirm Password'/> 
              <button className={styles.btn} type="submit">Reset</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Reset