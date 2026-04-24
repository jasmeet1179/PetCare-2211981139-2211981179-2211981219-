// import React from "react";

// const Footer=()=>{

// return(
//     <>
//     <div className="grid grid-cols-2 bg-slate-100 mt-20">
    
// <div className=" ">

// <div className="p-4"> 
//     <div className="text-2xl ">About Pet care</div>
//   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veritatis enim reiciendis esse quia non vitae, excepturi molestiae fugiat! Tempore omnis natus at voluptatem cum delectus placeat odit nemo alias.</div>
//   </div> 
  
//   <div className="p-4"> 
//     <div className="text-2xl ">Our network</div>
//   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veritatis enim reiciendis esse quia non vitae, excepturi molestiae fugiat! Tempore omnis natus at voluptatem cum delectus placeat odit nemo alias.</div>
//   </div> 

// </div>

// <div className=" ">

// <div className="p-4">
//      <div className="text-2xl">Help center</div>
//   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veritatis enim reiciendis esse quia non vitae, excepturi molestiae fugiat! Tempore omnis natus at voluptatem cum delectus placeat odit nemo alias.</div>
//   </div> 

//   <div className="p-4"> 
//      <div className="text-2xl">Cities</div>
//   <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veritatis enim reiciendis esse quia non vitae, excepturi molestiae fugiat! Tempore omnis natus at voluptatem cum delectus placeat odit nemo alias.</div>
//   </div> 


// </div>
//     </div>
//     </>
// )

// }
// export default Footer;

import React from "react";
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 p-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">About PetCare</h3>
          <p className="text-gray-400">
            At PetCare, we provide love, care, and professional services for your furry friends. 
            Whether it's grooming, veterinary care, or a safe space while you're away — we've got it covered!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/services" className="hover:text-blue-400">Our Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact Us</a></li>
            <li><a href="/faqs" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Help Center</h3>
          <ul className="space-y-2">
            <li><a href="/support" className="hover:text-blue-400">Support</a></li>
            <li><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Stay Connected</h3>
          <p className="text-gray-400 mb-4">Follow us for pet tips & updates!</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="hover:text-blue-500" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram className="hover:text-pink-500" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className="hover:text-blue-400" /></a>
            <a href="mailto:support@petcare.com" className="hover:text-yellow-400"><Mail /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500">
        © {new Date().getFullYear()} PetCare. All rights reserved. 🐾
      </div>
    </footer>
  );
};

export default Footer;