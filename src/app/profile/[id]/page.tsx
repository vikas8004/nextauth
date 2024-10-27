import React from 'react'

const ProfileId = ({params}:any) => {
    const {id}=params;
    console.log(id);
    
  return (
    <>
    <div>ProfileId</div>
    <div >Profile page <span className='text-orange-600 font-bold tracking-wider'>{id}</span></div>
    </>
  )
}

export default ProfileId