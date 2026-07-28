import { motion } from "framer-motion";


function Hero() {


  return (

    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      justify-center
      overflow-hidden
      bg-slate-950
      px-8
      "
    >


      {/* Background Glow */}

      <div
        className="
        absolute
        w-[500px]
        h-[500px]
        bg-blue-600
        opacity-20
        blur-[120px]
        rounded-full
        top-20
        left-20
        "
      />


      <div
        className="
        absolute
        w-[400px]
        h-[400px]
        bg-purple-600
        opacity-20
        blur-[120px]
        rounded-full
        bottom-10
        right-20
        "
      />





      <div
      className="
      max-w-7xl
      mx-auto
      grid
      lg:grid-cols-2
      gap-12
      items-center
      "
      >




        {/* Left Content */}


        <motion.div

        initial={{
          opacity:0,
          x:-50
        }}

        animate={{
          opacity:1,
          x:0
        }}

        transition={{
          duration:0.8
        }}

        >


          <div
          className="
          inline-flex
          bg-blue-500/10
          border
          border-blue-500/30
          text-blue-400
          px-5
          py-2
          rounded-full
          mb-6
          "
          >

            🤖 AI Powered Travel Planner

          </div>




          <h1
          className="
          text-6xl
          md:text-7xl
          font-extrabold
          text-white
          leading-tight
          "
          >

            Plan Your

            <span className="text-blue-500">
              {" "}Dream Trip
            </span>

            <br/>

            With AI


          </h1>





          <p
          className="
          mt-6
          text-xl
          text-gray-400
          max-w-xl
          "
          >

            Create personalized travel itineraries,
            discover amazing destinations,
            and manage your trips smarter with
            artificial intelligence.

          </p>





          <div
          className="
          mt-10
          flex
          gap-5
          flex-wrap
          "
          >


            <button
            className="
            bg-blue-600
            hover:bg-blue-700
            px-8
            py-4
            rounded-xl
            text-white
            font-semibold
            text-lg
            "
            >

              Start Planning ✈️

            </button>




            <button
            className="
            border
            border-slate-600
            hover:border-blue-500
            px-8
            py-4
            rounded-xl
            text-white
            font-semibold
            text-lg
            "
            >

              Explore Trips

            </button>


          </div>





          <div
          className="
          flex
          gap-10
          mt-12
          "
          >

            <div>

              <h3 className="
              text-3xl
              font-bold
              text-white
              ">
                50K+
              </h3>

              <p className="text-gray-400">
                Travelers
              </p>

            </div>



            <div>

              <h3 className="
              text-3xl
              font-bold
              text-white
              ">
                150+
              </h3>

              <p className="text-gray-400">
                Destinations
              </p>

            </div>



            <div>

              <h3 className="
              text-3xl
              font-bold
              text-white
              ">
                4.9⭐
              </h3>

              <p className="text-gray-400">
                Rating
              </p>

            </div>


          </div>



        </motion.div>







        {/* Right AI Card */}



        <motion.div


        initial={{
          opacity:0,
          scale:0.8
        }}


        animate={{
          opacity:1,
          scale:1
        }}


        transition={{
          duration:0.8
        }}


        className="
        relative
        "
        >



          <div
          className="
          bg-slate-900/70
          backdrop-blur-xl
          border
          border-slate-800
          rounded-3xl
          p-8
          shadow-2xl
          "
          >



            <h2
            className="
            text-white
            text-2xl
            font-bold
            "
            >

              ✈️ Paris Adventure

            </h2>



            <p className="
            text-gray-400
            mt-2
            ">
              AI Generated 5 Day Plan
            </p>




            <div className="
            mt-8
            space-y-4
            ">


              <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-white
              ">
                📍 Eiffel Tower
              </div>


              <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-white
              ">
                🍽 French Cuisine Experience
              </div>


              <div className="
              bg-slate-800
              rounded-xl
              p-4
              text-white
              ">
                🏛 Louvre Museum
              </div>


            </div>





            <button
            className="
            mt-8
            w-full
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            py-4
            rounded-xl
            text-white
            font-bold
            "
            >

              Generate My Trip 🚀

            </button>



          </div>



        </motion.div>



      </div>



    </section>

  );

}


export default Hero;