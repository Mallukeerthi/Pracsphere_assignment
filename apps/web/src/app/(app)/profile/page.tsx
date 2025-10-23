"use client";
import { useSession } from "next-auth/react";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading profile...</p>;
  if (!session) return <p>Please log in to view profile.</p>;

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center gap-6">
        <div className="w-24 h-24 bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold rounded-full">
          {user?.name?.[0].toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold capitalize">{user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          <p className="text-sm text-gray-400 mt-1">Member since Oct 2025</p>
        </div>
      </div>

      {/* Account info */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <User className="text-indigo-600" />
          <div>
            <h3 className="font-semibold">Full Name</h3>
            <p className="text-gray-500">{user?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-indigo-600" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="text-indigo-600" />
          <div>
            <h3 className="font-semibold">Member Since</h3>
            <p className="text-gray-500">October 2025</p>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Welcome back, {user?.name?.split(" ")[0] || "User"} 👋 — You’re part of the
          <strong> PracSphere</strong> system, where productivity meets intelligence.
          Manage your tasks, monitor progress, and achieve more effortlessly.
        </p>
      </div>
    </div>
  );
}
