import {
  useState,
} from "react";

import Sidebar from "../components/dashboard/Sidebar";

interface SettingsState {
  emailNotifications: boolean;
  tripReminders: boolean;
  aiRecommendations: boolean;
  darkMode: boolean;
  profileVisibility: boolean;
}

function Settings() {
  const [settings, setSettings] =
    useState<SettingsState>({
      emailNotifications: true,
      tripReminders: true,
      aiRecommendations: true,
      darkMode: true,
      profileVisibility: false,
    });

  const updateSetting = (
    setting:
      keyof SettingsState
  ) => {
    setSettings(
      (currentSettings) => ({
        ...currentSettings,

        [setting]:
          !currentSettings[
            setting
          ],
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-blue-400 font-semibold mb-3">
              PERSONALIZE VOYAGEAI
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Settings ⚙️
            </h1>

            <p className="text-slate-400 mt-4 text-lg">
              Manage your account,
              notifications and travel
              experience.
            </p>
          </div>

          <div className="space-y-7">
            <SettingsGroup
              title="Notifications"
              description="Choose which updates you want to receive."
            >
              <SettingToggle
                title="Email Notifications"
                description="Receive important account and trip updates by email."
                enabled={
                  settings.emailNotifications
                }
                onToggle={() =>
                  updateSetting(
                    "emailNotifications"
                  )
                }
              />

              <SettingToggle
                title="Trip Reminders"
                description="Get reminders about your upcoming saved trips."
                enabled={
                  settings.tripReminders
                }
                onToggle={() =>
                  updateSetting(
                    "tripReminders"
                  )
                }
              />
            </SettingsGroup>

            <SettingsGroup
              title="AI Experience"
              description="Control how VoyageAI personalizes your experience."
            >
              <SettingToggle
                title="AI Recommendations"
                description="Allow VoyageAI to recommend destinations and activities."
                enabled={
                  settings.aiRecommendations
                }
                onToggle={() =>
                  updateSetting(
                    "aiRecommendations"
                  )
                }
              />
            </SettingsGroup>

            <SettingsGroup
              title="Appearance and Privacy"
              description="Manage visual and privacy preferences."
            >
              <SettingToggle
                title="Dark Mode"
                description="Use the VoyageAI dark interface."
                enabled={
                  settings.darkMode
                }
                onToggle={() =>
                  updateSetting(
                    "darkMode"
                  )
                }
              />

              <SettingToggle
                title="Public Profile"
                description="Allow other users to view your travel profile."
                enabled={
                  settings.profileVisibility
                }
                onToggle={() =>
                  updateSetting(
                    "profileVisibility"
                  )
                }
              />
            </SettingsGroup>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem(
                  "voyageSettings",
                  JSON.stringify(
                    settings
                  )
                );

                alert(
                  "Settings saved successfully!"
                );
              }}
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
            >
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SettingsGroupProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsGroup({
  title,
  description,
  children,
}: SettingsGroupProps) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
      <div className="p-7 border-b border-slate-800">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-slate-400 mt-2">
          {description}
        </p>
      </div>

      <div className="divide-y divide-slate-800">
        {children}
      </div>
    </section>
  );
}

interface SettingToggleProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function SettingToggle({
  title,
  description,
  enabled,
  onToggle,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between gap-6 p-7">
      <div>
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-slate-400 mt-1">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className={`relative flex-shrink-0 w-14 h-8 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
            enabled
              ? "translate-x-7"
              : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;