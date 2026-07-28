import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

import { getTripById } from "../api/dashboardApi";
import {
  generateAIPackingList,
  generateAIHotels,
  generateAILocalGuide,
  generateAIBudgetEstimate,
} from "../api/aiApi";
import {
  API_BASE_URL,
} from "../config/api";
import MapView from "../components/MapView";
import CurrencyConverter from "../components/CurrencyConverter";

interface Trip {
  _id: string;
  destination: string;
  budget: string;
  travelers: string;
  itinerary: string;
  createdAt?: string;
}

interface Weather {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [weather, setWeather] =
    useState<Weather | null>(null);

  const [weatherLoading, setWeatherLoading] =
    useState(false);

  const [weatherError, setWeatherError] =
    useState("");

  const [packingList, setPackingList] =
    useState("");

  const [packingLoading, setPackingLoading] =
    useState(false);

  const [packingError, setPackingError] =
    useState("");

  const [hotelRecommendations, setHotelRecommendations] =
    useState("");

  const [hotelsLoading, setHotelsLoading] =
    useState(false);

  const [hotelsError, setHotelsError] =
    useState("");

  const [localGuide, setLocalGuide] =
    useState("");

  const [localGuideLoading, setLocalGuideLoading] =
    useState(false);

  const [localGuideError, setLocalGuideError] =
    useState("");

  const [budgetEstimate, setBudgetEstimate] =
    useState("");

  const [budgetLoading, setBudgetLoading] =
    useState(false);

  const [budgetError, setBudgetError] =
    useState("");

  // Load trip details
  useEffect(() => {
    const loadTrip = async () => {
      try {
        if (!id) {
          setError("Trip ID is missing");
          return;
        }

        const response = await getTripById(id);

        setTrip(response.data.trip);
      } catch (error) {
        console.log(
          "TRIP DETAILS ERROR:",
          error
        );

        setError(
          "Failed to load trip details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [id]);

  // Load live weather after trip is loaded
  useEffect(() => {
    const loadWeather = async () => {
      if (!trip?.destination) {
        return;
      }

      try {
        setWeatherLoading(true);
        setWeatherError("");
        setWeather(null);

        const destination =
          encodeURIComponent(
            trip.destination
          );

        const response = await fetch(
          `${API_BASE_URL}/weather/${destination}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch weather"
          );
        }

        setWeather(data);
      } catch (error) {
        console.error(
          "WEATHER FETCH ERROR:",
          error
        );

        setWeatherError(
          "Weather information is currently unavailable."
        );
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeather();
  }, [trip?.destination]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Loading trip details...
        </h1>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-400">
          {error || "Trip not found"}
        </h1>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const itineraryDays = trip.itinerary
    ? trip.itinerary
        .split(/Day\s*\d+/i)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const generatePackingList = async () => {
    try {
      setPackingLoading(true);
      setPackingError("");

      const response =
        await generateAIPackingList({
          destination: trip.destination,
          travelers: trip.travelers,
          itinerary: trip.itinerary,
        });

      setPackingList(
        response.data.packingList
      );
    } catch (error) {
      console.error(
        "PACKING LIST ERROR:",
        error
      );

      setPackingError(
        "Failed to generate the packing list. Please try again."
      );
    } finally {
      setPackingLoading(false);
    }
  };

  const generateHotels = async () => {
    try {
      setHotelsLoading(true);
      setHotelsError("");

      const response =
        await generateAIHotels({
          destination: trip.destination,
          budget: trip.budget,
          travelers: trip.travelers,
          itinerary: trip.itinerary,
        });

      setHotelRecommendations(
        response.data.hotelRecommendations
      );
    } catch (error) {
      console.error(
        "HOTEL RECOMMENDATIONS ERROR:",
        error
      );

      setHotelsError(
        "Failed to generate hotel recommendations. Please try again."
      );
    } finally {
      setHotelsLoading(false);
    }
  };

  const generateGuide = async () => {
    try {
      setLocalGuideLoading(true);
      setLocalGuideError("");

      const response =
        await generateAILocalGuide({
          destination: trip.destination,
          budget: trip.budget,
          travelers: trip.travelers,
          itinerary: trip.itinerary,
        });

      setLocalGuide(
        response.data.localGuide
      );
    } catch (error) {
      console.error(
        "LOCAL GUIDE ERROR:",
        error
      );

      setLocalGuideError(
        "Failed to generate the local guide. Please try again."
      );
    } finally {
      setLocalGuideLoading(false);
    }
  };

  const generateBudget = async () => {
    try {
      setBudgetLoading(true);
      setBudgetError("");

      const response =
        await generateAIBudgetEstimate({
          destination: trip.destination,
          budget: trip.budget,
          travelers: trip.travelers,
          itinerary: trip.itinerary,
        });

      setBudgetEstimate(
        response.data.budgetEstimate
      );
    } catch (error) {
      console.error(
        "BUDGET ESTIMATE ERROR:",
        error
      );

      setBudgetError(
        "Failed to generate the budget estimate. Please try again."
      );
    } finally {
      setBudgetLoading(false);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const leftMargin = 20;
    const rightMargin = 20;

    const usableWidth =
      pageWidth -
      leftMargin -
      rightMargin;

    let currentY = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);

    pdf.text(
      "VoyageAI Trip Itinerary",
      pageWidth / 2,
      currentY,
      {
        align: "center",
      }
    );

    currentY += 18;

    pdf.setFontSize(16);

    pdf.text(
      `Destination: ${trip.destination}`,
      leftMargin,
      currentY
    );

    currentY += 12;

    pdf.text(
      `Budget: ${trip.budget}`,
      leftMargin,
      currentY
    );

    currentY += 12;

    pdf.text(
      `Travelers: ${trip.travelers}`,
      leftMargin,
      currentY
    );

    currentY += 18;

    pdf.setFontSize(18);

    pdf.text(
      "Day Wise Itinerary",
      leftMargin,
      currentY
    );

    currentY += 12;

    if (itineraryDays.length > 0) {
      itineraryDays.forEach(
        (day, index) => {
          const dayTitle = `Day ${
            index + 1
          }`;

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(14);

          if (
            currentY >
            pageHeight - 35
          ) {
            pdf.addPage();
            currentY = 20;
          }

          pdf.text(
            dayTitle,
            leftMargin,
            currentY
          );

          currentY += 8;

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(12);

          const lines =
            pdf.splitTextToSize(
              day,
              usableWidth
            );

          const textHeight =
            lines.length * 7;

          if (
            currentY + textHeight >
            pageHeight - 20
          ) {
            pdf.addPage();
            currentY = 20;
          }

          pdf.text(
            lines,
            leftMargin,
            currentY
          );

          currentY +=
            textHeight + 10;
        }
      );
    } else {
      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(12);

      pdf.text(
        "No itinerary available.",
        leftMargin,
        currentY
      );
    }

    const safeDestination =
      trip.destination
        .replace(
          /[^a-zA-Z0-9]/g,
          "-"
        )
        .replace(/-+/g, "-");

    pdf.save(
      `${safeDestination}-itinerary.pdf`
    );
  };

  const shareTrip = async () => {
    const shareText = `
VoyageAI Trip Plan

Destination: ${trip.destination}
Budget: ${trip.budget}
Travelers: ${trip.travelers}

Itinerary:
${trip.itinerary}
    `.trim();

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${trip.destination} Trip Plan`,
          text: shareText,
        });

        return;
      }

      await navigator.clipboard.writeText(
        shareText
      );

      alert(
        "Trip details copied to clipboard!"
      );
    } catch (error) {
      console.error(
        "SHARE ERROR:",
        error
      );

      alert(
        "Failed to share trip details."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400"
          className="w-full h-[420px] object-cover opacity-60"
          alt={trip.destination}
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              {trip.destination} ✈️
            </h1>

            <p className="mt-4 text-xl text-gray-200">
              Your personalized travel
              itinerary
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="mb-8 border border-slate-700 px-5 py-2 rounded-xl hover:border-blue-500"
        >
          ← Back to Dashboard
        </button>

        {/* Trip information */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-gray-400">
              Destination
            </h3>

            <h1 className="text-2xl font-bold mt-3">
              {trip.destination}
            </h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-gray-400">
              Budget
            </h3>

            <h1 className="text-3xl font-bold mt-3">
              {trip.budget}
            </h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-gray-400">
              Travelers
            </h3>

            <h1 className="text-3xl font-bold mt-3">
              {trip.travelers}
            </h1>
          </div>
        </div>

        {/* Live weather */}
        <div className="mt-14">
          <h2 className="text-4xl font-bold mb-8">
            Live Weather
          </h2>

          {weatherLoading && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <p className="text-gray-400 text-lg">
                Loading current weather...
              </p>
            </div>
          )}

          {weatherError &&
            !weatherLoading && (
              <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-8">
                <p className="text-red-400">
                  {weatherError}
                </p>
              </div>
            )}

          {weather &&
            !weatherLoading && (
              <div className="bg-gradient-to-br from-blue-600/30 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-7 md:p-9">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="flex items-center gap-5">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={
                        weather.description
                      }
                      className="w-24 h-24 bg-blue-500/20 rounded-full"
                    />

                    <div>
                      <p className="text-gray-300 text-lg">
                        Current weather in
                      </p>

                      <h3 className="text-3xl font-bold mt-1">
                        {weather.city}
                      </h3>

                      <p className="mt-2 text-xl capitalize text-blue-300">
                        {
                          weather.description
                        }
                      </p>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <h3 className="text-6xl font-bold">
                      {Math.round(
                        weather.temperature
                      )}
                      °C
                    </h3>

                    <p className="text-gray-300 mt-3">
                      Feels like{" "}
                      {weather.feelsLike.toFixed(
                        1
                      )}
                      °C
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mt-8">
                  <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-700">
                    <p className="text-gray-400">
                      💧 Humidity
                    </p>

                    <p className="text-2xl font-bold mt-2">
                      {weather.humidity}%
                    </p>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-700">
                    <p className="text-gray-400">
                      🌬 Wind Speed
                    </p>

                    <p className="text-2xl font-bold mt-2">
                      {weather.windSpeed.toFixed(
                        1
                      )}{" "}
                      m/s
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Itinerary */}
        <div className="mt-14">
          <h2 className="text-4xl font-bold mb-8">
            Day Wise Itinerary
          </h2>

          <div className="space-y-6">
            {itineraryDays.length >
            0 ? (
              itineraryDays.map(
                (day, index) => (
                  <div
                    key={index}
                    className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
                  >
                    <h3 className="text-2xl font-bold">
                      Day {index + 1}
                    </h3>

                    <p className="text-gray-400 mt-3 whitespace-pre-line">
                      {day}
                    </p>
                  </div>
                )
              )
            ) : (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <p className="text-gray-400">
                  No itinerary is
                  available for this trip.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Packing List */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-4xl font-bold">
                AI Packing List
              </h2>

              <p className="text-gray-400 mt-3">
                Generate a personalized
                packing list for your{" "}
                {trip.destination} trip.
              </p>
            </div>

            <button
              onClick={generatePackingList}
              disabled={packingLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
            >
              {packingLoading
                ? "Generating..."
                : packingList
                  ? "Regenerate Packing List"
                  : "Generate Packing List"}
            </button>
          </div>

          {packingError && (
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6">
              <p className="text-red-400">
                {packingError}
              </p>
            </div>
          )}

          {packingLoading && (
            <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8">
              <p className="text-purple-300 text-lg">
                VoyageAI is preparing your
                personalized packing list...
              </p>
            </div>
          )}

          {packingList &&
            !packingLoading && (
              <div className="bg-gradient-to-br from-purple-600/20 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-7 md:p-9">
                <p className="text-gray-200 whitespace-pre-line leading-8">
                  {packingList}
                </p>
              </div>
            )}

          {!packingList &&
            !packingLoading &&
            !packingError && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-gray-400">
                  Click "Generate Packing
                  List" to receive
                  recommendations based on
                  your destination and
                  itinerary.
                </p>
              </div>
            )}
        </div>

        {/* AI Hotel Recommendations */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-4xl font-bold">
                AI Hotel Recommendations
              </h2>

              <p className="text-gray-400 mt-3">
                Find accommodation options
                suited to your destination,
                budget, and group size.
              </p>
            </div>

            <button
              onClick={generateHotels}
              disabled={hotelsLoading}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-900 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
            >
              {hotelsLoading
                ? "Finding Hotels..."
                : hotelRecommendations
                  ? "Regenerate Hotels"
                  : "Find Hotels"}
            </button>
          </div>

          {hotelsError && (
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6">
              <p className="text-red-400">
                {hotelsError}
              </p>
            </div>
          )}

          {hotelsLoading && (
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8">
              <p className="text-emerald-300 text-lg">
                VoyageAI is finding suitable
                hotels for your trip...
              </p>
            </div>
          )}

          {hotelRecommendations &&
            !hotelsLoading && (
              <div className="bg-gradient-to-br from-emerald-600/20 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-7 md:p-9">
                <p className="text-gray-200 whitespace-pre-line leading-8">
                  {hotelRecommendations}
                </p>
              </div>
            )}

          {!hotelRecommendations &&
            !hotelsLoading &&
            !hotelsError && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-gray-400">
                  Click "Find Hotels" to
                  generate accommodation
                  recommendations for this
                  trip. Prices are estimates
                  and may change.
                </p>
              </div>
            )}
        </div>

        {/* AI Local Guide */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-4xl font-bold">
                AI Local Guide
              </h2>

              <p className="text-gray-400 mt-3">
                Discover restaurants,
                attractions, estimated costs,
                and helpful tips for{" "}
                {trip.destination}.
              </p>
            </div>

            <button
              onClick={generateGuide}
              disabled={localGuideLoading}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-900 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
            >
              {localGuideLoading
                ? "Creating Guide..."
                : localGuide
                  ? "Regenerate Local Guide"
                  : "Generate Local Guide"}
            </button>
          </div>

          {localGuideError && (
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6">
              <p className="text-red-400">
                {localGuideError}
              </p>
            </div>
          )}

          {localGuideLoading && (
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8">
              <p className="text-amber-300 text-lg">
                VoyageAI is preparing
                restaurants, attractions,
                and local tips...
              </p>
            </div>
          )}

          {localGuide &&
            !localGuideLoading && (
              <div className="bg-gradient-to-br from-amber-600/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-7 md:p-9">
                <p className="text-gray-200 whitespace-pre-line leading-8">
                  {localGuide}
                </p>
              </div>
            )}

          {!localGuide &&
            !localGuideLoading &&
            !localGuideError && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-gray-400">
                  Click "Generate Local
                  Guide" to discover nearby
                  food and sightseeing
                  recommendations. Prices are
                  estimates and may change.
                </p>
              </div>
            )}
        </div>

        {/* AI Budget Estimator */}
        <div className="mt-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-4xl font-bold">
                AI Budget Estimator
              </h2>

              <p className="text-gray-400 mt-3">
                Estimate accommodation, food,
                transportation, activities,
                and emergency expenses.
              </p>
            </div>

            <button
              onClick={generateBudget}
              disabled={budgetLoading}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
            >
              {budgetLoading
                ? "Calculating..."
                : budgetEstimate
                  ? "Recalculate Budget"
                  : "Estimate Budget"}
            </button>
          </div>

          {budgetError && (
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6">
              <p className="text-red-400">
                {budgetError}
              </p>
            </div>
          )}

          {budgetLoading && (
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-8">
              <p className="text-cyan-300 text-lg">
                VoyageAI is calculating your
                estimated trip expenses...
              </p>
            </div>
          )}

          {budgetEstimate &&
            !budgetLoading && (
              <div className="bg-gradient-to-br from-cyan-600/20 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-3xl p-7 md:p-9">
                <p className="text-gray-200 whitespace-pre-line leading-8">
                  {budgetEstimate}
                </p>
              </div>
            )}

          {!budgetEstimate &&
            !budgetLoading &&
            !budgetError && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-gray-400">
                  Click "Estimate Budget" for
                  an AI-generated 3-day cost
                  breakdown. All amounts are
                  estimates and may change.
                </p>
              </div>
            )}
        </div>

        <CurrencyConverter />

        {/* Map */}
        <MapView
          destination={trip.destination}
        />

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap gap-6">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 px-8 py-3 rounded-xl hover:bg-blue-700"
          >
            Download PDF
          </button>

          <button
            onClick={shareTrip}
            className="border border-slate-700 px-8 py-3 rounded-xl hover:border-blue-500"
          >
            Share Trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;