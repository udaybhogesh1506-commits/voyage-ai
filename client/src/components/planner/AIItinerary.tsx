import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { createTrip } from "../../api/tripApi";
import { generateAIItinerary } from "../../api/aiApi";

function AIItinerary({ trip }: any) {
  const [itinerary, setItinerary] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const generateItinerary = async () => {
    if (
      !trip.destination ||
      !trip.budget ||
      !trip.travelers
    ) {
      alert(
        "Please enter destination, budget, and travelers first."
      );
      return;
    }

    try {
      setGenerating(true);

      const response = await generateAIItinerary({
        destination: trip.destination,
        budget: trip.budget,
        travelers: trip.travelers,
      });

      setItinerary(response.data.itinerary);
    } catch (error) {
      console.error("AI GENERATION ERROR:", error);

      alert("Failed to generate AI itinerary.");
    } finally {
      setGenerating(false);
    }
  };

  const saveTrip = async () => {
    if (!itinerary) {
      alert("Please generate an itinerary before saving.");
      return;
    }

    try {
      setSaving(true);

      await createTrip({
        destination: trip.destination,
        budget: trip.budget,
        travelers: trip.travelers,
        itinerary,
      });

      alert("✅ Trip saved successfully!");
    } catch (error) {
      console.error("SAVE TRIP ERROR:", error);

      alert("❌ Failed to save trip.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-3xl
      p-8
      "
    >
      <h2 className="text-3xl font-bold mb-6">
        🌍 AI Generated Itinerary
      </h2>

      <h3 className="text-2xl font-bold">
        {trip.destination || "Your Destination"} ✈️
      </h3>

      <p className="text-gray-400 mt-3">
        Budget: {trip.budget || "Not selected"}
        <br />
        Travelers: {trip.travelers || "0"}
      </p>

      <button
        onClick={generateItinerary}
        disabled={generating}
        className="
        w-full
        mt-8
        bg-purple-600
        hover:bg-purple-700
        disabled:bg-slate-700
        disabled:cursor-not-allowed
        py-3
        rounded-xl
        font-bold
        transition
        "
      >
        {generating
          ? "🤖 Generating itinerary..."
          : "✨ Generate AI Itinerary"}
      </button>

      <div className="mt-8">
        {itinerary ? (
          <div
            className="
            bg-slate-800
            border
            border-slate-700
            p-6
            rounded-2xl
            text-gray-200
            leading-8
            "
          >
            <ReactMarkdown>
              {itinerary}
            </ReactMarkdown>
          </div>
        ) : (
          <div
            className="
            bg-slate-800
            border
            border-slate-700
            p-6
            rounded-2xl
            text-gray-400
            text-center
            "
          >
            Your AI itinerary will appear here.
          </div>
        )}
      </div>

      <button
        onClick={saveTrip}
        disabled={!itinerary || saving}
        className="
        w-full
        mt-8
        bg-blue-600
        hover:bg-blue-700
        disabled:bg-slate-700
        disabled:cursor-not-allowed
        py-3
        rounded-xl
        font-bold
        transition
        "
      >
        {saving
          ? "Saving trip..."
          : "💾 Save Trip"}
      </button>
    </div>
  );
}

export default AIItinerary;