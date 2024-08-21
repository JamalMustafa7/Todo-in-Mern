import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { userSchema } from '../../validations/userSchema';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setLoading(false);
      navigate('/todos');
    }
    setLoading(false);
  }, [navigate]);

  const formSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('id', res.data);
      navigate('/todos'); // Redirect after successful signup
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      actions.setSubmitting(false); // Set submitting to false if an error occurs
    }
  };

  const {
    errors,
    handleBlur,
    isSubmitting,
    touched,
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: userSchema,
    onSubmit: formSubmit,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center min-h-screen bg-gray-200">
      <div className="min-w-80 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg flex-grow">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Signup</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              name="name"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
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
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              name="confirmPassword"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg focus:outline-none ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
          <Link to="/login" className='block'>
            <button
              className={`w-full py-3 text-white rounded-lg focus:outline-none ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
              disabled={isSubmitting}
            >Login</button>
          </Link>
            
        </form>
      </div>
    </div>
  );
};

export default Signup;
