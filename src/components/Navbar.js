import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="flex px-4 h-16 justify-between items-center border-b-2 border-gray-300 bg-white">
      <div className="flex items-center">
        <NavLink to="/" className="text-white font-bold text-xl">
          <img src="/logo.png" alt="Logo" className="mr-2" />
        </NavLink>
      </div>
      <div className="h-full flex items-center">
        {isAuthenticated ? (
          <>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive
                  ? "text-[#6941C6] font-medium mr-4 border-b-2 border-b-[#6941C6] h-full flex items-center"
                  : "text-[#71717A] font-medium mr-4 h-full flex items-center"
              }
            >
              Tarefas
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-[#6941C6] font-medium border-b-2 border-b-[#6941C6] h-full flex items-center"
                  : "text-[#71717A] font-medium h-full flex items-center"
              }
            >
              Categorias
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#6941C6] font-medium mr-4 border-b-2 border-[#6941C6] h-full flex items-center"
                  : "text-[#71717A] font-medium mr-4 h-full flex items-center"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-[#6941C6] font-medium border-b-2 border-[#6941C6] h-full flex items-center"
                  : "text-[#71717A] font-medium h-full flex items-center"
              }
            >
              Cadastro
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
