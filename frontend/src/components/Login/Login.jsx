import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../validations/userSchema';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setLoading(false);
      navigate('/todos');
    }
    setLoading(false);
  }, [navigate]);

  async function formSubmit(values,actions){
    console.log("in handle submit")
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/login', {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('id', res.data._id);
      navigate('/todos'); // Redirect after successful login
    } catch (err) {
      setErrMessage(err.response?.data || 'An error occurred');
    } finally {
      setLoading(false);
    }
    actions.setSubmitting(false)
  }
  const { errors, values, touched, isSubmitting, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginSchema,
    onSubmit: formSubmit
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex items-center min-h-screen bg-gray-100">
      <div className="min-w-80 max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg flex-grow">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {errMessage && (
            <p className="text-red-500 text-sm mt-1">{errMessage}</p>
          )}
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg focus:outline-none ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <div>
            <p className="text-red-400 text-sm mt-1">Don't Hvae an Account?</p>
            <Link to="/" className='block'>
              <button
                className={`w-full py-3 text-white rounded-lg focus:outline-none ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`} 
                >Signup</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
