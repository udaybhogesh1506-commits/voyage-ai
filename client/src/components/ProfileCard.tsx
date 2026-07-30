import {
  useState,
} from "react";

import {
  updateUserProfile,
} from "../api/userApi";

interface LoggedInUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
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

function ProfileCard() {
  const storedUser =
    getLoggedInUser();

  const [user, setUser] =
    useState<LoggedInUser>(
      storedUser || {}
    );

  const [isEditing, setIsEditing] =
    useState(false);

  const [name, setName] =
    useState(
      storedUser?.name || ""
    );

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<
      "success" | "error" | ""
    >("");

  const [imageError, setImageError] =
    useState(false);

  const isOwner =
    user.role === "admin" ||
    user.email ===
      "udaybhogesh17@gmail.com";

  const userName =
    user.name ||
    "VoyageAI Traveler";

  const userEmail =
    user.email ||
    "No email available";

  const firstLetter =
    userName
      .charAt(0)
      .toUpperCase();

  const showOwnerPhoto =
    isOwner && !imageError;

  const handleEdit = () => {
    setName(userName);
    setMessage("");
    setMessageType("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(userName);
    setMessage("");
    setMessageType("");
    setIsEditing(false);
  };

  const handleSave = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const updatedName =
      name.trim();

    if (
      updatedName.length < 2
    ) {
      setMessage(
        "Name must contain at least 2 characters."
      );

      setMessageType("error");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const response =
        await updateUserProfile(
          updatedName
        );

      const updatedUser =
        response.data.user;

      const localUser = {
        ...user,
        ...updatedUser,
      };

      setUser(localUser);

      localStorage.setItem(
        "user",
        JSON.stringify(
          localUser
        )
      );

      setName(updatedUser.name);
      setMessage(
        "Profile updated successfully!"
      );
      setMessageType("success");
      setIsEditing(false);
    } catch (error: any) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      setMessage(
        error.response?.data
          ?.message ||
          "Failed to update profile."
      );

      setMessageType("error");
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
      <div
        className="
        flex
        flex-col
        sm:flex-row
        items-center
        sm:items-start
        gap-6
        text-center
        sm:text-left
        "
      >
        {showOwnerPhoto ? (
          <img
            src="/images/uday-bhogesh.jpeg"
            alt={userName}
            onError={() =>
              setImageError(true)
            }
            className="
            w-28
            h-28
            rounded-full
            object-cover
            border-4
            border-blue-500
            shadow-lg
            shadow-blue-500/20
            "
          />
        ) : (
          <div
            className="
            w-28
            h-28
            rounded-full
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-blue-600
            to-purple-600
            border-4
            border-blue-400
            text-white
            text-5xl
            font-bold
            shadow-lg
            shadow-blue-500/20
            "
          >
            {firstLetter}
          </div>
        )}

        <div className="flex-1">
          <div
            className="
            flex
            flex-wrap
            items-center
            justify-center
            sm:justify-start
            gap-3
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              {userName}
            </h2>

            {isOwner && (
              <span
                className="
                bg-purple-500/15
                border
                border-purple-500/30
                text-purple-300
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
                "
              >
                👑 Owner
              </span>
            )}
          </div>

          <p
            className="
            text-gray-400
            mt-2
            "
          >
            {isOwner
              ? "Founder & Full-Stack Developer"
              : "Travel Explorer 🌎"}
          </p>

          <p
            className="
            text-gray-400
            mt-1
            "
          >
            {userEmail}
          </p>

          {user.id && (
            <p
              className="
              text-gray-500
              text-sm
              mt-2
              break-all
              "
            >
              User ID: {user.id}
            </p>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`mt-6 p-4 rounded-xl border ${
            messageType ===
            "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {!isEditing ? (
        <button
          type="button"
          onClick={handleEdit}
          className="
          mt-8
          bg-blue-600
          hover:bg-blue-700
          px-6
          py-3
          rounded-xl
          font-semibold
          transition
          "
        >
          Edit Profile
        </button>
      ) : (
        <form
          onSubmit={handleSave}
          className="
          mt-8
          bg-slate-950/60
          border
          border-slate-800
          rounded-2xl
          p-6
          "
        >
          <label
            htmlFor="profile-name"
            className="
            block
            text-sm
            font-semibold
            text-gray-300
            mb-2
            "
          >
            Full Name
          </label>

          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            minLength={2}
            maxLength={60}
            required
            autoFocus
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            focus:border-blue-500
            outline-none
            rounded-xl
            px-4
            py-3
            text-white
            "
          />

          <p className="text-gray-500 text-sm mt-2">
            Your updated name will
            appear on your profile and
            dashboard greeting.
          </p>

          <div
            className="
            flex
            flex-wrap
            gap-3
            mt-5
            "
          >
            <button
              type="submit"
              disabled={saving}
              className="
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-60
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              "
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={
                handleCancel
              }
              disabled={saving}
              className="
              bg-slate-700
              hover:bg-slate-600
              disabled:opacity-60
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              "
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfileCard;