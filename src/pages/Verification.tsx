
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../axios/axiosInstance';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';


interface VerificationFormValues {
  activationCode: string;
}

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  
  const token = useSelector((state: any) => state.user.token);
  

  const formik = useFormik<VerificationFormValues>({
    initialValues: {
      activationCode: '',
    },
    validationSchema: Yup.object({
      activationCode: Yup.string()
        .required('Activation code is required'),
    }),
    onSubmit: async (values: VerificationFormValues) => {
      try {
        
        const response = await axiosInstance.post('/auth/activate', {
          token, 
          activationCode: values.activationCode,
        });
        
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(clearUser());
          navigate('/login'); 
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        console.error('Activation error:', error);
        const errorMessage = error.response?.data?.message || 'Activation failed. Please try again.';
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">VERIFY YOUR ACCOUNT</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="activationCode" className="block text-sm font-medium text-gray-700">Activation Code</label>
            <input
              type="text"
              id="activationCode"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.activationCode && formik.touched.activationCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...formik.getFieldProps('activationCode')}
            />
            {formik.touched.activationCode && formik.errors.activationCode && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.activationCode}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Verify Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verification;
