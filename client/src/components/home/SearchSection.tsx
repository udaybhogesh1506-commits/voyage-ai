import { useState } from "react";

function SearchSection() {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const handleSearch = () => {
    console.log({
      destination,
      date,
      travelers,
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid gap-4 md:grid-cols-4 bg-slate-900 p-6 rounded-2xl">

        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-slate-800 p-3 rounded-lg outline-none"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-slate-800 p-3 rounded-lg outline-none"
        />

        <input
          type="number"
          min={1}
          value={travelers}
          onChange={(e) => setTravelers(Number(e.target.value))}
          className="bg-slate-800 p-3 rounded-lg outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Search Trip
        </button>

      </div>
    </section>
  );
}

export default SearchSection;