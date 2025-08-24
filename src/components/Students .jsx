import React from "react";
import { useState } from "react";

const Students = () => {
  const initialStudents = [
    { id: 1, name: "Student One", email: "student1@email.com" },
    { id: 2, name: "Student Two", email: "student2@email.com" },
  ];
  const [students, setStudents] = useState(initialStudents);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        Manage Students
      </h2>
      {/* CRUD UI for students */}
      <ul className="divide-y divide-indigo-100">
        {students.map((student) => (
          <li
            key={student.id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold text-indigo-700">
                {student.name}
              </div>
              <div className="text-gray-500 text-sm">{student.email}</div>
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
        Add Student
      </button>
    </div>
  );
};

export default Students;
