import React from 'react'
import {Link} from 'react-router-dom'

const Username = () => {
  return (
    <div className="conatiner mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again </h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More By 
            </span>
          </div>

          <form action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img src="" alt="avatar" />
            </div>
            <div className="textbox">
              <input type="text" placeholder='Username'/>
              <button type="submit">Submit</button>
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