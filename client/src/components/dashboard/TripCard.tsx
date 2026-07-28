import {
  motion,
} from "framer-motion";

import {
  FaCalendar,
  FaUsers,
  FaMoneyBill,
  FaCloudSun,
  FaHeart,
} from "react-icons/fa";

interface Props {
  trip: {
    _id: string;
    destination: string;
    budget: string;
    travelers: string;
    image?: string;
    isFavorite?: boolean;
    createdAt?: string;
  };

  onDelete: (
    id: string
  ) => void;

  onView: (
    id: string
  ) => void;

  onFavorite: (
    id: string
  ) => void;
}

function TripCard({
  trip,
  onDelete,
  onView,
  onFavorite,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl"
    >
      {/* Image */}
      <div className="h-48 relative">
        <img
          src={
            trip.image ||
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          }
          alt={trip.destination}
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() =>
            onFavorite(trip._id)
          }
          className={`absolute top-4 left-4 w-11 h-11 rounded-full flex items-center justify-center border transition ${
            trip.isFavorite
              ? "bg-red-600 border-red-500 text-white"
              : "bg-slate-950/80 border-slate-600 text-gray-300 hover:text-red-400 hover:border-red-400"
          }`}
          title={
            trip.isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <FaHeart />
        </button>

        <div className="absolute top-4 right-4 bg-blue-600 px-4 py-2 rounded-full text-white flex items-center gap-2">
          <FaCloudSun />
          28°C
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-2xl font-bold text-white">
            🌍 {trip.destination}
          </h2>

          {trip.isFavorite && (
            <span className="bg-red-500/15 text-red-300 border border-red-500/30 rounded-full px-3 py-1 text-xs">
              Favorite
            </span>
          )}
        </div>

        <div className="mt-5 space-y-3 text-gray-400">
          <p className="flex items-center gap-3">
            <FaCalendar />

            {trip.createdAt
              ? new Date(
                  trip.createdAt
                ).toLocaleDateString()
              : "Saved trip"}
          </p>

          <p className="flex items-center gap-3">
            <FaUsers />

            {trip.travelers || 2}{" "}
            Travelers
          </p>

          <p className="flex items-center gap-3">
            <FaMoneyBill />

            {trip.budget}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() =>
              onView(trip._id)
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-semibold transition"
          >
            View
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(trip._id)
            }
            className="px-5 bg-red-600 hover:bg-red-700 rounded-xl text-white transition"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TripCard;