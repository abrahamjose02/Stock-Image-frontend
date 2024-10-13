import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Routes,Route } from "react-router-dom"
import { Toaster } from 'sonner';
import Verification from "./pages/Verification";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verification" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
