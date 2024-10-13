
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance'; 
import { toast } from 'sonner'; 
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; 

interface SignupFormValues {
  fullname: string;
  email: string;
  phonenumber: string;
  password: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullname: '',  
      email: '',
      phonenumber: '',  
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Full Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phonenumber: Yup.string()
        .matches(/^\d{10}$/, 'Must be exactly 10 digits')
        .required('Phone Number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values: SignupFormValues) => {
      try {
        const res = await axiosInstance.post('/auth/register', values);
        console.log("res.data :",res.data)
        if (res.status === 201) {
          
          dispatch(setUser({ 
            fullname: values.fullname,
            email: values.email,
            phonenumber: values.phonenumber,
            token: res.data.token, 
          }));
          toast.success('Registration successful! Redirecting to verification...');
          navigate('/verification'); 
        } else {
          toast.error('Unexpected response from the server. Please try again.');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">SIGN UP</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullname"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.fullname && formik.touched.fullname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps('fullname')}
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.fullname}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phonenumber"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.phonenumber && formik.touched.phonenumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps('phonenumber')}
            />
            {formik.touched.phonenumber && formik.errors.phonenumber && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phonenumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
