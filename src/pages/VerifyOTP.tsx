import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import { useSelector } from "react-redux";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  
  
  const token = useSelector((state: any) => state.user.token);

  console.log("Reset Token:", token); 

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .length(4, "OTP must be exactly 4 characters"), 
    }),
    onSubmit: async (values) => {
      console.log("Submitting OTP:", values.otp); 

      if (!token) {
        toast.error("Reset token is missing. Please try again.");
        return;
      }

      try {
        
        const response = await axiosInstance.post("/auth/verify-otp", {
          otp: values.otp,
          token: token, 
        });

        console.log("Response from server: ", response); 

        if (response.status === 200) {
          toast.success("OTP verified! Redirecting to password reset page...");
          navigate("/reset-password");
        } else {
          toast.error("OTP verification failed. Please try again.");
        }
      } catch (error: any) {
        console.error("Error during OTP verification:", error); 
        const errorMessage =
          error.response?.data?.message ||
          "Failed to verify OTP. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Verify OTP</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              id="otp"
              className={`mt-1 block w-full px-3 py-2 border ${formik.errors.otp && formik.touched.otp ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              {...formik.getFieldProps("otp")}
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
