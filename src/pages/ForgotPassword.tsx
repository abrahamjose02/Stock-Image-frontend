import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setResetToken } from "../store/userSlice";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/forgot-password", {
          email: values.email,
        });

        if (response.status === 201) {
          dispatch(setResetToken({ token: response.data.token }));
          toast.success("Redirecting to OTP verification Page");
          navigate("/verify-otp");
        } else {
          toast.error("Unexpected response from the server. Please try again.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to send reset request. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Forgot Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-500">
            Remembered your password? <a href="/login" className="text-blue-600 hover:underline">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
