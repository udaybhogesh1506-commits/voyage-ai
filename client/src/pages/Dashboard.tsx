import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import StatsCards from "../components/dashboard/StatsCards";
import Analytics from "../components/dashboard/Analytics";
import AdvancedAnalytics from "../components/dashboard/AdvancedAnalytics";
import TripCard from "../components/dashboard/TripCard";

import {
  getDashboardTrips,
  deleteTrip,
  toggleFavoriteTrip,
} from "../api/dashboardApi";

interface Trip {
  _id: string;
  destination: string;
  budget: string;
  travelers: string;
  itinerary: string;
  image?: string;
  isFavorite?: boolean;
  createdAt?: string;
}

type TripFilter =
  | "all"
  | "favorites";

function Dashboard() {
  const [trips, setTrips] =
    useState<Trip[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [filter, setFilter] =
    useState<TripFilter>("all");

  const navigate = useNavigate();

  const loadTrips = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getDashboardTrips();

      setTrips(
        response.data.trips || []
      );
    } catch (error) {
      console.error(
        "DASHBOARD TRIPS ERROR:",
        error
      );

      setError(
        "Failed to load your trips."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const removeTrip = async (
    id: string
  ) => {
    const shouldDelete =
      window.confirm(
        "Are you sure you want to delete this trip?"
      );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteTrip(id);

      setTrips((currentTrips) =>
        currentTrips.filter(
          (trip) => trip._id !== id
        )
      );
    } catch (error) {
      console.error(
        "DELETE TRIP ERROR:",
        error
      );

      alert(
        "Failed to delete the trip."
      );
    }
  };

  const handleFavorite = async (
    id: string
  ) => {
    try {
      const response =
        await toggleFavoriteTrip(id);

      const updatedTrip =
        response.data.trip;

      setTrips((currentTrips) =>
        currentTrips
          .map((trip) =>
            trip._id === id
              ? updatedTrip
              : trip
          )
          .sort(
            (firstTrip, secondTrip) =>
              Number(
                secondTrip.isFavorite
              ) -
              Number(
                firstTrip.isFavorite
              )
          )
      );
    } catch (error) {
      console.error(
        "FAVORITE TRIP ERROR:",
        error
      );

      alert(
        "Failed to update the favorite trip."
      );
    }
  };

  const favoriteTrips =
    trips.filter(
      (trip) => trip.isFavorite
    );

  const displayedTrips =
    filter === "favorites"
      ? favoriteTrips
      : trips;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Good Evening, Uday 👋
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Ready for your next
              adventure?
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/trip-planner")
            }
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition self-start lg:self-auto"
          >
            + Create Trip
          </button>
        </div>

        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/40 rounded-xl p-5">
            <p className="text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={loadTrips}
              className="mt-3 text-white underline"
            >
              Try again
            </button>
          </div>
        )}

        <StatsCards />

        <Analytics />

        <AdvancedAnalytics />

        {/* AI Recommendation */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8">
          <h2 className="text-3xl font-bold">
            🤖 AI Travel Recommendation
          </h2>

          <p className="mt-4 text-lg">
            Based on your travel style,
            we recommend:
          </p>

          <h3 className="text-3xl font-bold mt-4">
            Switzerland 🇨🇭
          </h3>

          <p className="mt-3">
            Best season: December -
            February
            <br />
            Estimated budget: $1800
          </p>
        </div>

        {/* Trips heading and filters */}
        <div className="mt-12 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-bold">
              Your Trips ✈️
            </h2>

            <p className="text-gray-400 mt-2">
              {trips.length} total trip
              {trips.length === 1
                ? ""
                : "s"}{" "}
              · {favoriteTrips.length}{" "}
              favorite
              {favoriteTrips.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex self-start">
            <button
              type="button"
              onClick={() =>
                setFilter("all")
              }
              className={`px-5 py-2 rounded-lg transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              All Trips
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("favorites")
              }
              className={`px-5 py-2 rounded-lg transition ${
                filter === "favorites"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Favorites
            </button>
          </div>
        </div>

        {/* Trip cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayedTrips.length > 0 ? (
            displayedTrips.map(
              (trip) => (
                <TripCard
                  key={trip._id}
                  trip={trip}
                  onDelete={removeTrip}
                  onFavorite={
                    handleFavorite
                  }
                  onView={(id) =>
                    navigate(
                      `/trip/${id}`
                    )
                  }
                />
              )
            )
          ) : (
            <div className="col-span-full bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
              <p className="text-gray-400 text-lg">
                {filter === "favorites"
                  ? "You have not added any favorite trips yet. Click the heart on a trip to add it."
                  : "No trips created yet. Start planning your first adventure!"}
              </p>

              {filter === "all" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/trip-planner"
                    )
                  }
                  className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Create Your First Trip
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;