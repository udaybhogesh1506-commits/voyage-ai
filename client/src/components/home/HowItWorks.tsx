function HowItWorks() {

  const steps = [
    {
      number: "01",
      icon: "🌎",
      title: "Choose Your Destination",
      description:
        "Tell us where you want to go, your budget, travel dates, and interests."
    },
    {
      number: "02",
      icon: "🤖",
      title: "AI Creates Your Journey",
      description:
        "Our AI generates a personalized itinerary with places, activities, and smart recommendations."
    },
    {
      number: "03",
      icon: "✈️",
      title: "Start Your Adventure",
      description:
        "Save your plan, manage your trip, and enjoy a stress-free travel experience."
    }
  ];


  return (

    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-8">


        <div className="text-center mb-16">

          <h2 className="
          text-5xl
          font-bold
          text-white
          ">
            How Voyage AI Works
          </h2>


          <p className="
          text-gray-400
          mt-5
          text-lg
          ">
            Plan your perfect journey in three simple steps.
          </p>

        </div>



        <div className="
        grid
        md:grid-cols-3
        gap-10
        ">


        {
          steps.map((step,index)=>(

            <div
            key={index}
            className="
            relative
            bg-slate-900/70
            border
            border-slate-800
            rounded-3xl
            p-8
            hover:border-blue-500
            hover:-translate-y-2
            transition
            duration-300
            "
            >


              <div className="
              absolute
              -top-5
              left-8
              bg-blue-600
              text-white
              w-12
              h-12
              rounded-full
              flex
              items-center
              justify-center
              font-bold
              ">
                {step.number}
              </div>



              <div className="
              text-6xl
              mt-6
              mb-6
              ">
                {step.icon}
              </div>



              <h3 className="
              text-2xl
              font-bold
              text-white
              mb-4
              ">
                {step.title}
              </h3>



              <p className="
              text-gray-400
              leading-relaxed
              ">
                {step.description}
              </p>


            </div>

          ))
        }


        </div>


      </div>

    </section>

  );

}


export default HowItWorks;