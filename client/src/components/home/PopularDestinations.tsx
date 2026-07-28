function PopularDestinations() {

    const destinations = [

        {
            name: "Bali",
            country: "Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800"
        },

        {
            name: "Paris",
            country: "France",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
        },

        {
            name: "Maldives",
            country: "Maldives",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800"
        }

    ];

    return (

        <section className="bg-slate-950 text-white py-24">

            <div className="max-w-7xl mx-auto px-8">

                <h2 className="text-5xl font-bold text-center">
                    Popular Destinations
                </h2>

                <p className="text-gray-400 text-center mt-4 mb-14">
                    Discover the most loved places around the world.
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {destinations.map((place) => (

                        <div
                            key={place.name}
                            className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:scale-105 transition duration-300 shadow-xl"
                        >

                            <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-2xl font-bold">
                                    {place.name}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    📍 {place.country}
                                </p>

                                <button
                                    className="mt-6 bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Explore
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default PopularDestinations;