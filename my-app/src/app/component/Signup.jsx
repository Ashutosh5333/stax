import { useState } from "react";
import { useDispatch } from "react-redux";
import { SignupPost } from "../Redux/AppReducer/action";
import toast, { Toaster } from "react-hot-toast";
export const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
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

  const handleSignup = (e) => {
    e.preventDefault();
  
    let formValid = true;
    const newErrors = {};
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      formValid = false;
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      formValid = false;
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    dispatch(SignupPost(formData))
      .then((res) => {
        console.log("resss", res);
           if(res?.payload?.msg=="Signup successful"){
            toast.success("Signup Successful");
            setFormData({
              name: "",
              email: "",
              password: "",
             })
           }
          
      })
      .catch((err) => {
        console.log("err", err);
      
      });
  };

  return (
    <div className="max-w-xs mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Signup
        </button>
      </form>
      <Toaster />
    </div>
    
  );
};
