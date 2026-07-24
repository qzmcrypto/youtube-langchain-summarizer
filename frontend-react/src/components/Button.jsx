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
      bg-gradient-to-r
      from-violet-500
      to-indigo-500
      text-white

      shadow-lg
      shadow-violet-900/40

      hover:from-violet-400
      hover:to-indigo-400
    `,

    secondary: `
      bg-white/5
      text-white

      border
      border-white/15

      hover:bg-white/10
      hover:border-white/25
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