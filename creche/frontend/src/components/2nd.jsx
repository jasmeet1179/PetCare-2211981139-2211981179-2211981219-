// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import SignInContext from "../context/sigincontext/signinContext";

// const Second=()=>{

// const a= useContext(SignInContext).User;


// return(
//     <>
//     <div className="conatiner rounded h-60 w-full bg-white flex justify-between">


// <div className=" w-full h-full  mt-2 rounded-lg border-4 flex ">

// <div className="relative w-1/2 h-full  p-2">
// <img src="pug3.jpg " className="h-full w-full rounded-lg "></img>

// <div className="absolute top-20 left-10 w-1/3    text-white text-4xl font-title">
//     Register Your Own Creche.
// </div>

// </div>

// <div className="relative w-1/2 h-full  p-2">

// <Link to="/registercreche">
// <img src="pug3.jpg " className="h-full w-full rounded-lg "></img>

// <div className="absolute top-20 left-10 w-1/3    text-white text-4xl font-title">
//     Register Your Own Creche.
// </div>
// </Link>
// </div>



// </div>





//     </div>
//     </>
// )

// }

// export default Second;



import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SignInContext from "../context/sigincontext/signinContext";

const Second = () => {
  const a = useContext(SignInContext).User;

  return (
    <>
      <div className="container w-full bg-white rounded-xl my-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-6">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-64 overflow-hidden rounded-2xl shadow-lg group">
            <img
              src="pug3.jpg"
              alt="Register Creche"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex flex-col items-start justify-center p-8">
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">
                Want to grow with us?
              </h2>
              <p className="text-white mb-6 hidden md:block">
                Join our network of trusted pet care centers and reach thousands of pet owners!
              </p>
              <Link to="/registercreche" state={{editing:false}}>
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-semibold transition-all">
                  Register Your Creche
                </button>
              </Link>
            </div>
          </div>

          {/* Text Section (Optional) */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
              Why Register With Us?
            </h2>
            <p className="text-gray-600 mb-6">
              Expand your business visibility, connect with more pet parents, and be part of a growing trusted community.
            </p>
            <Link to="/registercreche" state={{editing:false}}>
              <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-semibold transition-all">
                Start Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;