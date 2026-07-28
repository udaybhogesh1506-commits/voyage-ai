function Pricing() {


  const plans = [
    {
      name: "Free Traveler",
      price: "$0",
      description: "Perfect for casual trips",
      features: [
        "Create basic trips",
        "Save destinations",
        "Explore recommendations"
      ],
      button: "Start Free"
    },


    {
      name: "Explorer Pro",
      price: "$9",
      description: "For frequent travelers",
      popular: true,
      features: [
        "Unlimited AI itineraries",
        "Smart budget planning",
        "Personalized recommendations",
        "Save unlimited trips"
      ],
      button: "Upgrade Now"
    },


    {
      name: "AI Premium",
      price: "$19",
      description: "Ultimate travel experience",
      features: [
        "Advanced AI planning",
        "Priority recommendations",
        "Travel insights",
        "Premium support"
      ],
      button: "Go Premium"
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
            Choose Your Travel Plan
          </h2>


          <p className="
          text-gray-400
          mt-5
          text-lg
          ">
            Unlock smarter travel planning with Voyage AI.
          </p>


        </div>




        <div className="
        grid
        md:grid-cols-3
        gap-8
        ">


        {
          plans.map((plan,index)=>(


            <div
            key={index}
            className={`
            relative
            rounded-3xl
            p-8
            border
            ${
              plan.popular
              ?
              "bg-blue-600 border-blue-400 scale-105"
              :
              "bg-slate-900 border-slate-800"
            }
            `}
            >


            {
              plan.popular && (

                <span className="
                absolute
                -top-4
                left-1/2
                -translate-x-1/2
                bg-white
                text-blue-600
                px-5
                py-1
                rounded-full
                font-bold
                text-sm
                ">
                  MOST POPULAR
                </span>

              )
            }




              <h3 className="
              text-3xl
              font-bold
              text-white
              ">
                {plan.name}
              </h3>



              <p className="
              text-gray-300
              mt-3
              ">
                {plan.description}
              </p>



              <h2 className="
              text-5xl
              font-bold
              text-white
              mt-8
              ">
                {plan.price}
                <span className="text-lg">
                  /month
                </span>
              </h2>




              <div className="
              mt-8
              space-y-4
              ">


              {
                plan.features.map((feature,i)=>(

                  <p
                  key={i}
                  className="
                  text-white
                  "
                  >
                    ✅ {feature}
                  </p>

                ))
              }


              </div>





              <button className="
              mt-10
              w-full
              py-3
              rounded-xl
              bg-white
              text-slate-900
              font-bold
              hover:bg-gray-200
              transition
              ">

                {plan.button}

              </button>



            </div>


          ))
        }


        </div>


      </div>


    </section>

  );

}


export default Pricing;