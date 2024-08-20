import React from 'react'
import {ErrorMessage, useFormik} from 'formik'
import axios from "axios"
import Loading from '../Loading/Loading'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [loading,setLoading]=useState(false)
    const [errMessage,setErrMessage]=useState("")
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
    function submit()
    {
        setLoading(true)
        return axios.post("http://localhost:4000/login",{email:values.email,password:values.password}).then(
            (res)=>
            {
                setLoading(false)
                console.log(res)
                localStorage.setItem("id",res.data._id)
            }
        ).catch(err=>
            {
                console.log(err)
                setErrMessage(err.response.data)
                setLoading(false)
            }
        )
        
    }
    const {errors,values,touched,isSubmitting,handleSubmit,handleBlur,handleChange}=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit:submit,
    })
    if(loading)
        {
            return(
                <Loading />
            )
        }
  return (
    <div className='flex items-center min-h-screen bg-slate-800'>
        <div className='flex-1 max-w-80 mx-auto'>
            <h3 className='text-3xl font-medium text-center mb-5 text-white'>Login</h3>
            <form className='flex flex-col gap-3 w-full items-stretch' onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' className='shadow-md outline-none p-2 border shadow-black rounded border-blue-300' value={values.email} name='email' onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.email && touched.email?"block":"none"}}>{errors.email}</p>
                <input type="password" placeholder='Password' className='shadow-md outline-none p-2 shadow-black border rounded border-blue-300' value={values.password} name="password" onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.password && touched.password?"block":"none"}}>{errors.password}</p>

                <p className='text-red-400 text-xs pl-1' style={{display:errMessage?"block":"none"}}>{errMessage}</p>
                <button className='border border-blue-700 p-1 hover:bg-slate-100 hover:text-gray-600 text-gray-400 transition-all duration-300' type='submit' disabled={isSubmitting} style={{opacity:isSubmitting?"0.4":"1"}}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login