import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";


function Navbar() {

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Workspace",
      path: "/workspace",
    },
  ];


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        max-w-7xl 
        mx-auto 
        mt-6
        px-6
      "
    >

      <div
        className="
          flex 
          items-center 
          justify-between

          px-6
          py-4

          rounded-2xl

          bg-white/60
          backdrop-blur-xl

          border
          border-white/50

          shadow-sm
        "
      >

        {/* Logo */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            text-xl
            font-semibold
            text-slate-800
          "
        >

          <div
            className="
              p-2
              rounded-xl
              bg-indigo-100
            "
          >
            <GraduationCap
              size={22}
              className="text-indigo-600"
            />
          </div>


          <span>
            LectureLens AI
          </span>

        </Link>



        {/* Navigation */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {navItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                `
                px-4
                py-2
                rounded-xl
                text-sm
                transition-all

                ${
                  isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-slate-600 hover:bg-white/70"
                }
                `
              }
            >
              {item.name}
            </NavLink>

          ))}


          <div
            className="
              ml-3
              hidden
              md:flex
              items-center
              gap-2

              px-3
              py-2

              rounded-xl

              bg-indigo-50
              text-indigo-600

              text-sm
            "
          >

            <Sparkles size={15}/>

            AI Learning

          </div>


        </div>


      </div>

    </motion.nav>
  );
}


export default Navbar;