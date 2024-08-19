import React from 'react'
import {useFormik} from 'formik'
const Login = () => {
    async function submit()
    {

    }
    const {errors,values,touched,isSubmitting,handleSubmit,handleBlur,handleChange}=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        onSubmit:submit,
    })
  return (
    <div className='flex items-center min-h-screen bg-slate-800'>
        <div className='flex-1 max-w-80 mx-auto'>
            <h3 className='text-3xl font-medium text-center mb-5 text-white'>Login</h3>
            <form className='flex flex-col gap-3 w-full items-stretch' onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' className='shadow-md outline-none p-2 border shadow-black rounded border-blue-300' value={values.email} name='email' onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.email && touched.email?"block":"none"}}>{errors.email}</p>
                <input type="password" placeholder='Password' className='shadow-md outline-none p-2 shadow-black border rounded border-blue-300' value={values.password} name="password" onBlur={handleBlur} onChange={handleChange}/>
                <p className='text-red-400 text-xs pl-1' style={{display:errors.password && touched.password?"block":"none"}}>{errors.password}</p>
                <button className='border border-blue-700 p-1 hover:bg-slate-100 hover:text-gray-600 text-gray-400 transition-all duration-300' type='submit' disabled={isSubmitting} style={{opacity:isSubmitting?"0.4":"1"}}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login