import React, { useState, useEffect } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

interface Link {
  name: string;
  link: string;
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const isInicioRoute = location.pathname === "/inicio";

  const links: Link[] = [
    { name: "Início", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    // { name: "Ocorrências", link: "/ocorrencias" },
    { name: "Correção", link: "/correcao" },
  ];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!isInicioRoute);
  }, [isInicioRoute]);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative shadow-lg w-full top-0 left-0">
      <div className="md:flex items-center justify-between bg-gray-200 shadow-xl py-2 md:px-10 px-4 rounded-b-xl z-9999999">
        {/* logo section */}
        <div className="cursor-pointer flex items-center">
          <img className="w-32 h-full" src="/assets/logo.png" alt="" />
        </div>
        {/* Menu icon */}
        <div
          onClick={handleToggle}
          className="absolute right-4 top-2 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* link items */}
        <ul
          className={`${
            open ? "block" : "hidden"
          } md:flex md:items-center md:pb-0 pb-4 absolute md:static z-999999999999 left-0 w-full md:w-auto md:pl-0 pl-2 transition-all duration-300 ease-in md:top-auto top-16 bg-gray-200 rounded-lg`}
        >
          {links.map((link, index) => (
            <li
              key={index}
              className="md:ml-4 md:my-0 my-3 font-semibold relative "
            >
              <Link
                to={link.link}
                className={`text-gray-800 hover:text-red-500 duration-300 ${
                  location.pathname === link.link ? "text-red-700" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
              {/* underline/bar below the button */}
              {location.pathname === link.link && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-700 w-full transition-all duration-300 ease-in mt-1"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
