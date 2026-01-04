import React, { useState } from "react";
import { 
  UserPlus, 
  Pencil, 
  Trash2, 
  Shield, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle
} from "lucide-react";

const Admins = () => {
  const initialAdmins = [

    { 
      id: 1, 
      name: "Admin One", 
      email: "admin2@email.com", 
      avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
 { 
      id: 2, 
      name: "Admin Two", 
      email: "admin2@email.com", 
      avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
    }, { 
      id: 3, 
      name: "Admin Two", 
      email: "admin2@email.com", 
      avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
   
   
  ];

  const [admins, setAdmins] = useState(initialAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || admin.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roles = ["all", "Super Admin", "Admin", "Moderator"];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };


  const stats = {
    total: admins.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Admin Management
              </h1>
            </div>
            <p className="text-gray-600">Manage administrators and their permissions</p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <UserPlus className="h-5 w-5" />
            <span className="font-semibold">Add New Admin</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 flex justify-center  ">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100 w-[80%]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Admins</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-full"></div>
            </div>
          </div>


        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search admins by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all"
              />
            </div>

            {/* Filter */}
            
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Table Header */}
          <div className=" flex justify-around  p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <div className="col-span-5 font-semibold text-gray-700">Admin</div>
             <div className="col-span-2 font-semibold text-gray-700 text-right">Actions</div>
          </div>

          {/* Admin Rows */}
          <div className="divide-y divide-gray-100">
            {filteredAdmins.map((admin) => (
              <div key={admin.id} className="flex justify-around p-6 hover:bg-gray-50 transition-colors">
                {/* Admin Info */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className={`${admin.avatarColor} h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold shadow-md`}>
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{admin.name}</h3>
                      {admin.role === "Super Admin" && (
                        <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                          Super
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{admin.email}</p>
                 </div>
                </div>

         

               

                {/* Actions */}
                <div className="col-span-4 flex items-end justify-end gap-2">
                  <button
                    className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors group"
                    title="Edit"
                  >
                    <Pencil className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors group"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAdmins.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No admins found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRole("all");
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Showing {filteredAdmins.length} of {admins.length} administrators</p>
        </div>

        {/* Add Admin Modal (Simple Version) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Add New Admin</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all"
                    placeholder="Enter admin name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all">
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Admins;