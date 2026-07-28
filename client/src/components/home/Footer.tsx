function Footer() {

  return (

    <footer className="bg-slate-950 border-t border-slate-800">


      {/* Newsletter CTA */}

      <section className="
      max-w-7xl
      mx-auto
      px-8
      py-20
      ">


        <div className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        rounded-3xl
        p-10
        md:p-16
        text-center
        ">


          <h2 className="
          text-4xl
          md:text-5xl
          font-bold
          text-white
          ">
            Ready For Your Next Adventure?
          </h2>


          <p className="
          text-blue-100
          mt-5
          text-lg
          ">
            Get AI powered travel ideas directly in your inbox.
          </p>



          <div className="
          mt-8
          flex
          flex-col
          md:flex-row
          justify-center
          gap-4
          ">


            <input
            placeholder="Enter your email"
            className="
            px-6
            py-4
            rounded-xl
            w-full
            md:w-96
            text-black
            outline-none
            "
            />


            <button className="
            bg-slate-950
            text-white
            px-8
            py-4
            rounded-xl
            font-semibold
            hover:bg-slate-800
            ">
              Subscribe
            </button>


          </div>


        </div>


      </section>





      {/* Footer Links */}


      <div className="
      max-w-7xl
      mx-auto
      px-8
      pb-10
      ">


        <div className="
        grid
        md:grid-cols-4
        gap-10
        ">



          {/* Brand */}

          <div>

            <h2 className="
            text-3xl
            font-bold
            text-white
            ">
              ✈️ Voyage
              <span className="text-blue-500">
                AI
              </span>
            </h2>


            <p className="
            text-gray-400
            mt-4
            ">
              AI powered travel planning for unforgettable journeys.
            </p>


          </div>






          {/* Product */}

          <div>

            <h3 className="
            text-white
            font-bold
            mb-4
            ">
              Product
            </h3>


            <ul className="
            text-gray-400
            space-y-3
            ">

              <li>AI Trip Planner</li>
              <li>Dashboard</li>
              <li>Destinations</li>
              <li>Pricing</li>

            </ul>


          </div>






          {/* Company */}

          <div>

            <h3 className="
            text-white
            font-bold
            mb-4
            ">
              Company
            </h3>


            <ul className="
            text-gray-400
            space-y-3
            ">

              <li>About Us</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>

            </ul>


          </div>






          {/* Social */}

          <div>

            <h3 className="
            text-white
            font-bold
            mb-4
            ">
              Follow Us
            </h3>


            <div className="
            flex
            gap-4
            text-2xl
            ">

              <span>🌐</span>
              <span>📸</span>
              <span>🐦</span>
              <span>💼</span>

            </div>


          </div>



        </div>




        <div className="
        border-t
        border-slate-800
        mt-12
        pt-8
        text-center
        text-gray-500
        ">

          © 2026 Voyage AI. All rights reserved.

        </div>



      </div>



    </footer>

  );

}


export default Footer;