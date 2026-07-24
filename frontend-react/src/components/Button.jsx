import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {

  const variants = {
    primary: `
      bg-indigo-600
      text-white

      shadow-lg
      shadow-indigo-200/60

      hover:bg-indigo-700
      hover:shadow-indigo-300
    `,

    secondary: `
      bg-white/70
      text-slate-700

      border
      border-white/60

      hover:bg-white
      hover:border-indigo-100
    `,
  };


  return (
    <motion.button
      type={type}

      whileHover={{
        scale: 1.04,
      }}

      whileTap={{
        scale: 0.97,
      }}

      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        px-7
        py-3.5

        rounded-2xl

        font-medium
        text-sm

        transition-all
        duration-300

        backdrop-blur-xl

        ${variants[variant]}

        ${className}
      `}

      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;