import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosInstance";
import { setResetToken } from "../store/userSlice";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const token = useSelector((state: any) => state.user.token);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/auth/reset-password", {
          token: token, 
          password: values.password,
        });

        if (response.status === 200) {
          toast.success("Password reset successfully! You can log in now.");
          dispatch(setResetToken({ token: null })); 
          navigate("/login");
        } else {
          toast.error("Unexpected response from the server. Please try again.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Reset Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Reset Password
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-500">
            Remembered your password? <a href="/login" className="text-green-600 hover:underline">Log In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
