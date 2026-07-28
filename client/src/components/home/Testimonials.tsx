function Testimonials() {

  const reviews = [
    {
      name: "Rahul Sharma",
      location: "India 🇮🇳",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Voyage AI planned my entire Europe trip in minutes. The itinerary was perfect!",
      rating: 5,
    },

    {
      name: "Emily Johnson",
      location: "USA 🇺🇸",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "The AI recommendations were amazing. I discovered places I never knew about.",
      rating: 5,
    },

    {
      name: "Arjun Patel",
      location: "Dubai 🇦🇪",
      image:
        "https://randomuser.me/api/portraits/men/75.jpg",
      review:
        "Budget planning and trip management made my vacation stress free.",
      rating: 4,
    },
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
            Loved By Travelers Worldwide
          </h2>


          <p className="
          text-gray-400
          mt-5
          text-lg
          ">
            Join thousands of travelers creating unforgettable journeys with AI.
          </p>


        </div>



        <div className="
        grid
        md:grid-cols-3
        gap-8
        ">


        {
          reviews.map((user,index)=>(


            <div
            key={index}
            className="
            bg-slate-900/80
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
              flex
              items-center
              gap-4
              mb-6
              ">


                <img
                src={user.image}
                className="
                w-16
                h-16
                rounded-full
                "
                />


                <div>

                  <h3 className="
                  text-white
                  font-bold
                  text-lg
                  ">
                    {user.name}
                  </h3>


                  <p className="
                  text-gray-400
                  ">
                    {user.location}
                  </p>


                </div>


              </div>



              <div className="text-yellow-400 mb-4">

                {"⭐".repeat(user.rating)}

              </div>



              <p className="
              text-gray-300
              leading-relaxed
              ">
                "{user.review}"
              </p>


            </div>


          ))
        }


        </div>



        <div className="
        mt-16
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        rounded-3xl
        p-10
        text-center
        ">


          <h3 className="
          text-4xl
          font-bold
          text-white
          ">
            50,000+ Travelers Trust Voyage AI
          </h3>


          <p className="
          text-blue-100
          mt-4
          text-lg
          ">
            Start planning your next adventure today.
          </p>


        </div>



      </div>


    </section>

  );

}


export default Testimonials;