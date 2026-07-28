import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";


function Navbar() {

  const [open, setOpen] = useState(false);


  return (

    <nav
    className="
    fixed
    top-0
    left-0
    w-full
    z-50
    bg-slate-950/70
    backdrop-blur-xl
    border-b
    border-slate-800
    "
    >


      <div
      className="
      max-w-7xl
      mx-auto
      px-8
      py-5
      flex
      items-center
      justify-between
      "
      >



        {/* Logo */}


        <Link
        to="/"
        className="
        text-3xl
        font-extrabold
        text-white
        "
        >

          ✈️ Voyage
          <span className="text-blue-500">
            AI
          </span>

        </Link>





        {/* Desktop Menu */}


        <div
        className="
        hidden
        md:flex
        items-center
        gap-8
        "
        >


          {
            [
              {
                name:"Home",
                path:"/"
              },
              {
                name:"Dashboard",
                path:"/dashboard"
              },
              {
                name:"Plan Trip",
                path:"/trip-planner"
              },
              {
                name:"Profile",
                path:"/profile"
              }
            ]
            .map((item)=>(


              <motion.div
              key={item.name}
              whileHover={{
                y:-3
              }}
              >

                <Link
                to={item.path}
                className="
                text-gray-300
                hover:text-blue-400
                transition
                "
                >

                  {item.name}

                </Link>


              </motion.div>


            ))
          }


        </div>






        {/* Buttons */}



        <div
        className="
        hidden
        md:flex
        gap-4
        "
        >


          <Link
          to="/login"
          className="
          px-5
          py-2
          rounded-xl
          border
          border-slate-700
          text-white
          hover:border-blue-500
          transition
          "
          >

            Login

          </Link>




          <Link
          to="/signup"
          className="
          px-5
          py-2
          rounded-xl
          bg-blue-600
          text-white
          hover:bg-blue-700
          transition
          "
          >

            Get Started

          </Link>



        </div>





        {/* Mobile Menu Button */}


        <button
        onClick={()=>setOpen(!open)}
        className="
        md:hidden
        text-white
        text-3xl
        "
        >

          ☰

        </button>



      </div>






      {/* Mobile Menu */}


      {
        open && (

          <div
          className="
          md:hidden
          bg-slate-900
          px-8
          py-6
          space-y-5
          "
          >


            <Link
            to="/"
            className="block text-white"
            >
              Home
            </Link>


            <Link
            to="/dashboard"
            className="block text-white"
            >
              Dashboard
            </Link>


            <Link
            to="/trip-planner"
            className="block text-white"
            >
              Plan Trip
            </Link>


            <Link
            to="/login"
            className="block text-blue-400"
            >
              Login
            </Link>


          </div>

        )
      }



    </nav>

  );

}


export default Navbar;