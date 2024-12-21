import React from 'react'
import {useSelector} from "react-redux"
const Profile = () => {

  const selector = useSelector((state)=>{return state.auth.userinfo})
  console.log(selector);
  
  return (
    <>
    <h1>Fname:{selector.Firstname}</h1>
    <h1>Lname:{selector.Lastname}</h1>
    <h1>email:{selector.Email}</h1>
    </>
  )
}

export default Profile