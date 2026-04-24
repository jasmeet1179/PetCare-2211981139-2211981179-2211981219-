import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SignInContext from "../context/sigincontext/signinContext.js";

const IsLoggedIn = ({ children }) => {
  const  user  = useContext(SignInContext);
  const navigate = useNavigate();

if(user.User.isLoggedIn===true)
  return children;
else {
    alert("please sign in");
    navigate("/");
    return null;
}
return null;
}

  


export default IsLoggedIn;