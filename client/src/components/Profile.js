import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Register.module.css";
import extend from "../styles/Profile.module.css";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import { ConvertToBase64 } from "../helper/Convert";
import { useFetch } from '../hooks/fetch.hooks'
import {updateUser} from '../helper/helper'



const Profile = () => {
  
  const [file, setFile] = useState();
  const [{isLoading,apiData,serverError}] = useFetch()
  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || "",
      lastname: apiData?.lastName || "",
      mobile: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true, 
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || apiData?.profile || "" });
      let updatePromise = updateUser(values)
      
      toast.promise(updatePromise,{
        loading:'Updating...',
        success: <b>Updated Successfully ...!</b>,
        error: <b>Something went wrong ...!</b>
      })
    },
  });

  // formik does not support file upload so we have to use onChange event handler to get the file

  const onUpload = async (e) => {
    const base64 = await ConvertToBase64(e.target.files[0]);
    setFile(base64);
  };

  //user logout function
  const userLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="conatiner mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{width:"45%",paddingTop:"1rem",height:"90%"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can Update the Details
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  alt="avatar"
                  className={styles.profile_img}
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                name="profile"
                id="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                
                  {...formik.getFieldProps("firstname")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Firstname"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Lastname"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email"
                />
              </div>

              
                <input
                  {...formik.getFieldProps("address")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Address"
                />
                <button className={styles.btn} type="submit">
                  Update
                </button>
              
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Comeback Later &nbsp;
                <button className="text-green-600" onClick={userLogout}> 
                  Log Out
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
