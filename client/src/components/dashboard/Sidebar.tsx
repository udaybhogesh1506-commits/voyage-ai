import {
  NavLink,
  useNavigate,
} from "react-router-dom";

interface LoggedInUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface SidebarItem {
  label: string;
  icon: string;
  path: string;
  end?: boolean;
}

const getLoggedInUser =
  (): LoggedInUser | null => {
    try {
      const savedUser =
        localStorage.getItem(
          "user"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  };

function Sidebar() {
  const navigate = useNavigate();

  const loggedInUser =
    getLoggedInUser();

  const isAdmin =
    loggedInUser?.role === "admin";

  const sidebarItems: SidebarItem[] =
    [
      {
        label: "Dashboard",
        icon: "🏠",
        path: "/dashboard",
        end: true,
      },

      {
        label: "My Trips",
        icon: "🌍",
        path: "/my-trips",
        end: true,
      },

      {
        label: "Create Trip",
        icon: "➕",
        path: "/trip-planner",
        end: true,
      },

      {
        label: "Explore",
        icon: "🧭",
        path: "/",
        end: true,
      },

      {
        label: "Profile",
        icon: "👤",
        path: "/profile",
        end: true,
      },

      {
        label: "Settings",
        icon: "⚙️",
        path: "/settings",
        end: true,
      },
    ];

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <aside
      className="
      hidden
      md:flex
      w-72
      min-h-screen
      bg-slate-950
      border-r
      border-slate-800
      p-8
      flex-col
      sticky
      top-0
      h-screen
      "
    >
      <button
        type="button"
        onClick={() =>
          navigate("/")
        }
        className="
        text-3xl
        font-bold
        text-white
        mb-12
        text-left
        cursor-pointer
        "
      >
        ✈️ Voyage
        <span className="text-blue-500">
          AI
        </span>
      </button>

      <nav
        className="
        flex-1
        space-y-3
        "
      >
        {sidebarItems.map(
          (item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({
                isActive,
              }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                font-medium
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }
                `
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>
          )
        )}

        {isAdmin && (
          <NavLink
            to="/admin"
            end
            className={({
              isActive,
            }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              font-semibold
              transition
              ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                  : "text-purple-300 hover:bg-purple-500/15 hover:text-purple-200"
              }
              `
            }
          >
            <span className="text-xl">
              👑
            </span>

            <span>
              Owner Dashboard
            </span>
          </NavLink>
        )}
      </nav>

      <div
        className="
        pt-6
        border-t
        border-slate-800
        "
      >
        <div className="mb-4">
          <p className="text-white font-semibold truncate">
            {loggedInUser?.name ||
              "Traveler"}
          </p>

          <p className="text-gray-500 text-sm truncate">
            {loggedInUser?.email ||
              ""}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-500/10
          hover:bg-red-500/20
          border
          border-red-500/20
          text-red-400
          px-4
          py-3
          rounded-xl
          font-semibold
          transition
          "
        >
          🚪 Log Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;