import React, {useState } from 'react'
import { useFormik } from 'formik';
import {userSchema} from '../../validations/userSchema';
import axios from 'axios'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading/Loading';
const Signup = () => {
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>
    {
        const id=localStorage.getItem("id");
        if(id)
            {
                setLoading(false)
                navigate("/todos");
            }
        setLoading(false)
    },[])
    async function formSubmit(values,action)
    {
        
            return axios.post("http://localhost:4000/signup",{name:values.name,email:values.email,password:values.password}).then(res=>
            {
                localStorage.setItem("id",res.data)
                console.log('item added')
            }
            ).catch(err=>console.log(err))
    }
    const {errors,handleBlur,isSubmitting,touched,values,handleChange,handleSubmit}=useFormik(
        {
            initialValues:{
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            },
            validationSchema:userSchema,
            onSubmit:formSubmit,
        }
    )
    console.log(errors)
    console.log(isSubmitting)
    if(loading)
    {
        return(
            <Loading />
        )
    }
  return (
    <div className='flex items-center min-h-screen bg-slate-800'>
        <div className='flex-1 max-w-80 mx-auto'>
            <h3 className='text-3xl font-medium text-center mb-5 text-white'>Signup</h3>
            <form className='flex flex-col gap-3 w-full items-stretch' onSubmit={handleSubmit}>
                <input type="text" placeholder='Name' className='shadow-md outline-none p-2 border shadow-black rounded border-blue-300' value={values.name} onBlur={handleBlur} onChange={handleChange} name='name'/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.name &&touched.name?"block":"none"}}>{errors.name}</p>
                <input type="email" placeholder='Email' className='shadow-md outline-none p-2 border shadow-black rounded border-blue-300' value={values.email} name='email' onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.email && touched.email?"block":"none"}}>{errors.email}</p>
                <input type="password" placeholder='Password' className='shadow-md outline-none p-2 shadow-black border rounded border-blue-300' value={values.password} name="password" onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.password && touched.password?"block":"none"}}>{errors.password}</p>
                <input type="password" placeholder='Confirm Password' className='shadow-md outline-none p-2 shadow-black border rounded border-blue-300' value={values.confirmPassword} name='confirmPassword' onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.confirmPassword && touched.confirmPassword?"block":"none"}}>{errors.confirmPassword}</p>

                <button className='border border-blue-700 p-1 hover:bg-slate-100 hover:text-gray-600 text-gray-400 transition-all duration-300' type='submit' disabled={isSubmitting} style={{opacity:isSubmitting?"0.4":"1"}}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Signup;

