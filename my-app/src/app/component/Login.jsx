import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { LoginPost } from "../Redux/AppReducer/action";
export const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;      
    setFormData({
      ...formData,
      [name]: value,
    });
    
    setErrors({
      ...errors,
      [name]: "", 
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
   
    if (formData.email.trim() === "") {
      setErrors({
        ...errors,
        email: "Email is required",
      });
      return;
    }
   
    if (formData.password.trim() === "") {
      setErrors({
        ...errors,
        password: "Password is required",
      });
      return;
    }
  
    dispatch(LoginPost(formData))
      .then((res) => {
        console.log("res", res);
        if(res?.payload?.msg=="Login successful"){
          toast.success("Login successful");
          localStorage.setItem("token",JSON.stringify(res?.payload?.token))
         }
         if(res?.type=="LOGINPOSTFAILURE"){
          toast.error("Check Password");
         }
      })
      .catch((err) => {
        console.log("err", err);
       
      });
  };

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.password && <div className="text-red-500">{errors.password}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
};
