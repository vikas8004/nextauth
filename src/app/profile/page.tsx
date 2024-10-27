"use client";
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Profile = () => {
  const [user, setUser] = useState("nothing")
  const router = useRouter();
  const logout = async () => {
    try {
      let res = await axios.get("/api/logout");
      if (res) {
        toast.success(res.data.msg);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast("logging out failed")

    }
  }
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/me");
      console.log(res.data);
      setUser(res.data.data._id)
    } catch (error: any) {
      console.log(error);

    }
  }
  console.log(user);
  
  return (
    <>
      <div className='font-bold text-2xl text-center'>Profile</div>
      <h2>{user==="nothing"?"Nothing here":<Link href={`/profile/${user}`}>{user}</Link>}</h2>
      <hr />
      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto' onClick={logout}>Logout</button>
      </div>
      <div className='mt-20'>
        <button className='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mx-auto' onClick={getUserDetails}>GetData</button>
      </div>

    </>
  )
}

export default Profile