import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiUrl } from './ApiUrl';
import axios from 'axios';
const SignUpPage = () => {
  const navigate = useNavigate();
  const[formData,setFormData]=useState({
    email:'',
    password:''
  })
  const[errors,setErrors]=useState({});
  const validateForm = ()=>{
   const errors ={};
   if(!formData.email){
    errors.email="Email is required";
   }
   else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
    errors.email="please enter a valid email address";
   }

   if(!formData.password){
    errors.password= "password is required";
   }
   else if(formData.password.length<8){
      errors.password="Password must be at least 8 characters";
   }
   else if(!/[A-Z]/.test(formData.password)){
    errors.password = "Password must contain at least one uppercase letter";
   }
   else if (!/[a-z]/.test(formData.password)){
    errors.password="Password must contain at least one lowercase letter";
   }
   else if(!/[0-9]/.test(formData.password)){
    errors.password="Password must contain at least one digit";
   }
   else if(!/[@$!%*&?]/.test(formData.password)){
    errors.password="Password must contain at least on special character";
   }
   setErrors(errors);
   return Object.keys(errors).length===0;//Return true if no errors
  }

  const handleSubmit =async()=>{
    try {
      if(validateForm()){
        console.log('apiUrl:',`${ApiUrl}/register`,formData)
        const response = await axios.post(`${ApiUrl}/register`,formData)
        console.log(response)
        if(response.status == 200){
          console.log(response.data.message)
          alert(response.data.message);
          navigate('/')
        }            
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response.message) {
        alert(error.response.data.message);
    }
    else{
      alert(error.response.error);
    }
   
  }
}
  return (
        <div className=' bg-lime-600 w-full h-screen fixed flex justify-center items-center '>
          <div className='w-[40%] h-[60%] rounded-3xl border flex flex-col items-center border-blue-600 border-5 bg-gray-300'>
            <h1 className='text-purple-600 font-bold text-3xl mt-10'>Register FORM</h1>
            <label className='ml-28'>Email</label>
            <input type='email'
            name='email'
            autoComplete="off"
             value={formData.email}
             onChange={(e)=>setFormData({...formData,email:e.target.value})}
             placeholder='Enter yur email'/>
             {
              errors.email&&(
                <p className='text-red-600'>{errors.email}</p>
              )
             }
            <label className='ml-28'>Password</label>
            <input type='password'
            name='password'
             value={formData.password}
             onChange={(e)=>setFormData({...formData,password:e.target.value})}
             autoComplete="off"
             placeholder='Enter your password'/>
              {
              errors.password&&(
                <p className='text-red-600'>{errors.password}</p>
              )
             }
            <button className='border mt-5 text-white border-5 bg-purple-600 px-12 py-1 rounded-xl'onClick={handleSubmit}>Submit</button>
            <span className='flex mt-2'>
              <h2>If you have an account</h2>
              <h2 className='text-purple-600 cursor-pointer ml-1'onClick={()=>navigate('/')}>Login</h2>
            </span>
          </div>
        </div>
      )
}

export default SignUpPage
