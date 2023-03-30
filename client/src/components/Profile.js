import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Register.module.css";
import extend from "../styles/Profile.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import { ConvertToBase64 } from "../helper/Convert";


const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "hizbullahbhatti110@gmail.com",
      address: "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  // formik does not support file upload so we have to use onChange event handler to get the file

  const onUpload = async (e) => {
    const base64 = await ConvertToBase64(e.target.files[0]);
    setFile(base64);
  };

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
                  src={file || avatar}
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
                  Register
                </button>
              
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Comeback Later &nbsp;
                <Link className="text-green-600" to="/">
                  Log Out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
