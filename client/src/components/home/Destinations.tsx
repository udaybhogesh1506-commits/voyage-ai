function Destinations() {
  const destinations = [
    {
      name: "Paris",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      country: "France",
      rating: "4.9",
    },
    {
      name: "Bali",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
      country: "Indonesia",
      rating: "4.8",
    },
    {
      name: "Dubai",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      country: "UAE",
      rating: "4.9",
    },
    {
      name: "Tokyo",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      country: "Japan",
      rating: "4.9",
    },
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      country: "India",
      rating: "4.7",
    },
    {
      name: "Maldives",
      image:
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
      country: "Maldives",
      rating: "5.0",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-white">
            Popular Destinations
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Discover breathtaking places recommended by AI and loved by thousands of travelers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {destinations.map((place, index) => (

            <div
              key={index}
              className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 transition duration-300 hover:-translate-y-2"
            >

              <div className="overflow-hidden">

                <img
                  src={place.image}
                  alt={place.name}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <h3 className="text-2xl font-bold text-white">
                    {place.name}
                  </h3>

                  <span className="text-yellow-400 font-semibold">
                    ⭐ {place.rating}
                  </span>

                </div>

                <p className="text-gray-400 mt-2">
                  {place.country}
                </p>

                <button
                  className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  transition
                  "
                >
                  Explore Destination
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Destinations;