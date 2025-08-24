import React from "react";
import { useState } from "react";

const Admins = () => {
  const initialAdmins = [
    { id: 1, name: "Admin One", email: "admin1@email.com" },
    { id: 2, name: "Admin Two", email: "admin2@email.com" },
  ];

  const [admins, setAdmins] = useState(initialAdmins);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Manage Admins</h2>
      {/* CRUD UI for admins */}
      <ul className="divide-y divide-indigo-100">
        {admins.map((admin) => (
          <li key={admin.id} className="py-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-indigo-700">{admin.name}</div>
              <div className="text-gray-500 text-sm">{admin.email}</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200">
                Edit
              </button>
              <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700">
        Add Admin
      </button>
    </div>
  );
};

export default Admins;
