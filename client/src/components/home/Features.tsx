function Features() {

  const features = [
    {
      icon: "🤖",
      title: "AI Travel Planning",
      description:
        "Generate personalized travel itineraries instantly using advanced AI technology."
    },
    {
      icon: "⚡",
      title: "Instant Itineraries",
      description:
        "Get complete day-by-day travel plans without spending hours researching."
    },
    {
      icon: "💰",
      title: "Smart Budget Control",
      description:
        "Plan amazing trips that match your budget and avoid unnecessary expenses."
    },
    {
      icon: "🌍",
      title: "Personalized Adventures",
      description:
        "Discover destinations and activities based on your interests and style."
    },
    {
      icon: "📍",
      title: "Smart Recommendations",
      description:
        "Find hidden gems, attractions, restaurants, and experiences."
    },
    {
      icon: "✈️",
      title: "Travel Smarter",
      description:
        "Manage all your trips in one beautiful dashboard."
    }
  ];


  return (

    <section className="
    bg-slate-950
    py-24
    ">


      <div className="
      max-w-7xl
      mx-auto
      px-8
      ">


        <div className="
        text-center
        mb-16
        ">

          <h2 className="
          text-5xl
          font-bold
          text-white
          ">
            Why Choose Voyage AI?
          </h2>


          <p className="
          text-gray-400
          mt-5
          text-lg
          ">
            Everything you need to plan unforgettable journeys powered by AI.
          </p>


        </div>



        <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        gap-8
        ">


        {
          features.map((feature,index)=>(

            <div
            key={index}
            className="
            group
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-slate-800
            rounded-3xl
            p-8
            hover:border-blue-500
            hover:-translate-y-2
            transition
            duration-300
            shadow-xl
            "
            >


              <div className="
              text-5xl
              mb-6
              ">
                {feature.icon}
              </div>



              <h3 className="
              text-2xl
              font-bold
              text-white
              mb-4
              ">
                {feature.title}
              </h3>



              <p className="
              text-gray-400
              leading-relaxed
              ">
                {feature.description}
              </p>



            </div>

          ))
        }


        </div>


      </div>


    </section>

  );

}


export default Features;