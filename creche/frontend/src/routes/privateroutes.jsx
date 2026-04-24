import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SignInContext from "../context/sigincontext/signinContext.js";

const PrivateRoute = ({ children }) => {
  const  user  = useContext(SignInContext);
  const navigate = useNavigate();
console.log(user.User);
if(user.User.crecheOwner===true)
  return children;
else if(user.User.crecheOwner==null){
  alert("please sign in");
navigate(-1);}
else if(user.User.crecheOwner===false){
  setTimeout(() => navigate("/"), 0); // Use setTimeout to ensure proper navigation
  alert("You are not authorized to access this page");
  
return null;
}

  
};

export default PrivateRoute;