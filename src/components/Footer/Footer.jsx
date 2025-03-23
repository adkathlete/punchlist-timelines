import React from "react";

import {
  NavLink,
  useLocation
} from "react-router-dom";

const Footer = ()=>{
  //---------------------------------COMPONENT----------------------------------
  return(
    <div className="flex flex-col w-full items-center justify-start bg-black">
      <div className='flex flex-row w-full justify-around flex-wrap items-center pb-2'>
        <NavLink to="/" className="mx-2 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-highlight">
          Home
        </NavLink>

        <NavLink to="/pricing" className="mx-2 my-1 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-highlight">
          Enroll
        </NavLink>

        <NavLink to="/installation" className="mx-2 my-1 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-highlight">
          Installation Guide
        </NavLink>

        <NavLink to="/contact" className="mx-2 my-1 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-highlight">
          Contact
        </NavLink>

        <NavLink to="/terms" className="mx-2 my-1 text-gray-600 text-xs sm:text-sm font-light hover:text-c2-highlight">
          Terms
        </NavLink>
      </div>
      <div className="my-2 text-center text-sm text-gray-600">
        &copy; 2024 Starlight Platforms, Inc. All rights reserved.
      </div>
    </div>
);
}
//---------------------------------COMPONENTS-----------------------------------

export default Footer;
