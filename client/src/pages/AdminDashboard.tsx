import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAdminDashboard,
} from "../api/adminApi";

interface AdminStatistics {
  totalUsers: number;
  regularUsers: number;
  adminUsers: number;
  recentlyActiveUsers: number;
  totalLogins: number;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  registeredAt?: string;
  lastLogin?: string | null;
  loginCount: number;
}

interface LoggedInUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

const formatDate = (
  date?: string | null
) => {
  if (!date) {
    return "Never";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(new Date(date));
};

const getStoredUser =
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

function AdminDashboard() {
  const navigate = useNavigate();

  const [statistics, setStatistics] =
    useState<AdminStatistics | null>(
      null
    );

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loggedInUser =
    getStoredUser();

  const loadAdminDashboard =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminDashboard();

        setStatistics(
          response.data.statistics
        );

        setUsers(
          response.data.users || []
        );
      } catch (error: any) {
        console.error(
          "ADMIN DASHBOARD ERROR:",
          error
        );

        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");
          return;
        }

        if (
          error.response?.status ===
          403
        ) {
          setError(
            "You do not have permission to access the owner dashboard."
          );

          return;
        }

        setError(
          error.response?.data
            ?.message ||
            "Failed to load owner dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadAdminDashboard();
  }, []);

  const filteredUsers =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      if (!searchValue) {
        return users;
      }

      return users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          user.email
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          user.id
            .toLowerCase()
            .includes(
              searchValue
            ) ||
          user.role
            .toLowerCase()
            .includes(
              searchValue
            )
      );
    }, [search, users]);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <div className="admin-loading-orbit">
          <span />
          <span />
          <span />
        </div>

        <p className="mt-8 text-xl text-slate-300">
          Loading owner dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-5">
        <div className="w-full max-w-xl bg-slate-900 border border-red-500/30 rounded-3xl p-10 text-center">
          <div className="text-6xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold">
            Access Restricted
          </h1>

          <p className="text-red-300 mt-5">
            {error}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
            >
              Return to Dashboard
            </button>

            <button
              type="button"
              onClick={
                handleLogout
              }
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-semibold"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-background">
        <div className="admin-orb admin-orb-one" />
        <div className="admin-orb admin-orb-two" />
        <div className="admin-grid-background" />
      </div>

      <header className="admin-header">
        <div>
          <div className="admin-owner-badge">
            <span>✦</span>
            VOYAGEAI OWNER
          </div>

          <h1>
            User Management
          </h1>

          <p>
            Welcome,{" "}
            {loggedInUser?.name ||
              "Uday"}
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
            className="admin-secondary-button"
          >
            ← User Dashboard
          </button>

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="admin-danger-button"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="admin-content">
        {/* Statistics */}
        {statistics && (
          <section className="admin-statistics">
            <article className="admin-stat-card">
              <div className="admin-stat-icon admin-blue">
                👥
              </div>

              <div>
                <p>
                  Total Users
                </p>

                <h2>
                  {
                    statistics.totalUsers
                  }
                </h2>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon admin-purple">
                👤
              </div>

              <div>
                <p>
                  Regular Users
                </p>

                <h2>
                  {
                    statistics.regularUsers
                  }
                </h2>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon admin-green">
                ⚡
              </div>

              <div>
                <p>
                  Active in 30 Days
                </p>

                <h2>
                  {
                    statistics.recentlyActiveUsers
                  }
                </h2>
              </div>
            </article>

            <article className="admin-stat-card">
              <div className="admin-stat-icon admin-orange">
                🔐
              </div>

              <div>
                <p>
                  Total Logins
                </p>

                <h2>
                  {
                    statistics.totalLogins
                  }
                </h2>
              </div>
            </article>
          </section>
        )}

        {/* User table */}
        <section className="admin-users-panel">
          <div className="admin-users-heading">
            <div>
              <h2>
                Registered Users
              </h2>

              <p>
                Showing{" "}
                {
                  filteredUsers.length
                }{" "}
                of {users.length} users
              </p>
            </div>

            <div className="admin-table-actions">
              <label className="admin-search">
                <span>⌕</span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search name, email or user ID"
                />
              </label>

              <button
                type="button"
                onClick={
                  loadAdminDashboard
                }
                className="admin-refresh-button"
              >
                ↻ Refresh
              </button>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>
                    User
                  </th>

                  <th>
                    User ID
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Registered
                  </th>

                  <th>
                    Last Login
                  </th>

                  <th>
                    Logins
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length >
                0 ? (
                  filteredUsers.map(
                    (user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-user-avatar">
                              {user.name
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {
                                  user.name
                                }
                              </strong>

                              <span>
                                {
                                  user.email
                                }
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="admin-user-id"
                            title="Click to copy user ID"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                user.id
                              );
                            }}
                          >
                            {user.id}
                          </button>
                        </td>

                        <td>
                          <span
                            className={`admin-role admin-role-${user.role}`}
                          >
                            {
                              user.role
                            }
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            user.registeredAt
                          )}
                        </td>

                        <td>
                          {formatDate(
                            user.lastLogin
                          )}
                        </td>

                        <td>
                          <span className="admin-login-count">
                            {
                              user.loginCount
                            }
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="admin-empty-state"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;