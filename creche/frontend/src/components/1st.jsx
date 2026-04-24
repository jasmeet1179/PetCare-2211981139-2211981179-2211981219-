import React from "react";
import Searchbar from "./searchbar";

const Top = () => {
  return (
    <div className="container w-full h-96 rounded-lg mt-2 overflow-hidden">
      <div className="relative w-full h-full">
        <img src="/dd.jpg" className="object-cover w-full h-full" alt="Pet Care" />

        <div className="absolute inset-0 flex flex-col justify-center items-center  p-4">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-title mb-3 text-center">
            Pet Care
          </h1>
          <p className="text-white text-lg sm:text-xl font-sans mb-16 text-center ">
            We care for you!
          </p>

          <div className="w-full max-w-2xl px-10 "> 
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;