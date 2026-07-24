import { motion } from "framer-motion";
import {
  Mic,
  Sparkles,
  FileText,
  Brain,
  Layers,
} from "lucide-react";

import Button from "../components/Button";


function Home() {

  const floatingCards = [
    {
      icon: FileText,
      title: "Summary",
      text: "Key lecture points generated",
      position: "top-10 -left-20",
    },
    {
      icon: Brain,
      title: "Insights",
      text: "Concepts understood",
      position: "bottom-10 -right-24",
    },
    {
      icon: Layers,
      title: "Flashcards",
      text: "Revision ready",
      position: "top-40 -right-28",
    },
  ];


  return (

    <div
      className="
        min-h-screen
        overflow-hidden
        relative

        bg-gradient-to-br
        from-indigo-50
        via-white
        to-purple-100
      "
    >

      {/* Animated background blobs */}

      <motion.div
        animate={{
          x:[0,40,0],
          y:[0,-30,0],
        }}
        transition={{
          duration:8,
          repeat:Infinity,
        }}
        className="
          absolute
          top-20
          left-20

          w-72
          h-72

          bg-indigo-300/30
          blur-3xl
          rounded-full
        "
      />


      <motion.div
        animate={{
          x:[0,-40,0],
          y:[0,40,0],
        }}
        transition={{
          duration:10,
          repeat:Infinity,
        }}
        className="
          absolute
          bottom-20
          right-20

          w-80
          h-80

          bg-purple-300/30
          blur-3xl
          rounded-full
        "
      />



      <section
        className="
          max-w-7xl
          mx-auto

          min-h-[85vh]

          flex
          flex-col
          items-center
          justify-center

          text-center

          px-8
        "
      >


        {/* Badge */}

        <motion.div

          initial={{
            opacity:0,
            y:-20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-white/70
            backdrop-blur

            border
            border-white

            text-sm
            text-indigo-600
          "
        >

          <Sparkles size={16}/>

          AI Powered Lecture Intelligence

        </motion.div>



        {/* Heading */}

        <motion.h1

          initial={{
            opacity:0,
            y:30
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:0.2
          }}

          className="
            mt-8

            text-5xl
            md:text-6xl

            font-semibold

            tracking-tight

            text-slate-900

            max-w-3xl
          "
        >

          From lecture
          <span className="text-indigo-600">
            {" "}to learning
          </span>


        </motion.h1>



        <motion.p

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          transition={{
            delay:0.4
          }}

          className="
            mt-5

            text-lg
            text-slate-600

            max-w-xl
          "
        >

          LectureLens AI listens, understands,
          and transforms lectures into smart notes,
          summaries and revision material.

        </motion.p>



        {/* AI Orb */}

        <div
          className="
            relative

            mt-16

            flex
            items-center
            justify-center
          "
        >


          {/* Glow */}

          <motion.div

            animate={{
              scale:[1,1.2,1],
              opacity:[0.3,0.6,0.3]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

            className="
              absolute

              w-72
              h-72

              rounded-full

              bg-indigo-400/30

              blur-3xl
            "
          />



          {/* Mic */}

          <motion.div

            animate={{
              y:[0,-15,0]
            }}

            transition={{
              duration:4,
              repeat:Infinity
            }}

            className="
              relative
              z-10

              w-40
              h-40

              rounded-full

              bg-white/80

              backdrop-blur-xl

              border
              border-white

              shadow-2xl

              flex
              items-center
              justify-center
            "
          >

            <Mic
              size={55}
              className="
                text-indigo-600
              "
            />



            {/* waves */}

            <motion.div

              animate={{
                scale:[1,1.4,1],
                opacity:[0.5,0,0.5]
              }}

              transition={{
                duration:2,
                repeat:Infinity
              }}

              className="
                absolute

                inset-0

                rounded-full

                border-2

                border-indigo-300
              "
            />


          </motion.div>



          {/* Floating cards */}

          {floatingCards.map((card,index)=>{

            const Icon = card.icon;

            return (

              <motion.div

                key={index}

                animate={{
                  y:[0,-10,0]
                }}

                transition={{
                  duration:3+index,
                  repeat:Infinity
                }}

                className={`
                  absolute

                  ${card.position}

                  hidden
                  md:block

                  w-48

                  p-4

                  rounded-2xl

                  bg-white/70

                  backdrop-blur-xl

                  border
                  border-white

                  shadow-lg

                  text-left
                `}
              >

                <Icon
                  size={20}
                  className="text-indigo-600"
                />

                <h3 className="font-semibold mt-2">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-500">
                  {card.text}
                </p>


              </motion.div>

            )

          })}


        </div>



        <div className="mt-14">

          <Button>
            Analyze Lecture
          </Button>

        </div>


      </section>


    </div>

  )

}


export default Home;