interface TravelDetailsProps {
  trip: {
    destination?: string;
    budget?: string;
  };
}

function TravelDetails({
  trip,
}: TravelDetailsProps) {
  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">
      <h2 className="text-3xl font-bold mb-8">
        🌍 Travel Insights
      </h2>

      {/* Destination image */}
      <div className="rounded-2xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
          alt={
            trip.destination ||
            "Travel destination"
          }
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">
            📍 Destination
          </h3>

          <p className="text-gray-400 mt-3">
            {trip.destination ||
              "Not selected"}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">
            💰 Budget
          </h3>

          <p className="text-gray-400 mt-3">
            {trip.budget ||
              "Not specified"}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">
            ✨ Tips
          </h3>

          <p className="text-gray-400 mt-3">
            Carry important documents
            <br />
            Book tickets early
            <br />
            Try local food
          </p>
        </div>
      </div>
    </div>
  );
}

export default TravelDetails;