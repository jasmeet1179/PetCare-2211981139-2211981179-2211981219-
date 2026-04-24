import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/navbar";

const LOCATIONS = ["Faridabad", "Ambala", "Panipat", "Karnal", "Gurugram", "Rohtak", "Yamunanagar"];

const AllCreches = () => {
  const [allCreches, setAllCreches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLocation, setActiveLocation] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      const results = [];
      for (const loc of LOCATIONS) {
        try {
          const res = await fetch(`http://localhost:3000/searchlocation/${loc}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data)) {
            data.forEach(c => results.push({ ...c, location: loc }));
          }
        } catch {
          // skip
        }
      }
      setAllCreches(results);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Filter by location tab and search
  const filtered = allCreches.filter(c => {
    const matchLocation = activeLocation === "All" || c.location === activeLocation;
    const matchSearch = c.name?.toLowerCase().includes(search.toLowerCase()) ||
                        c.location?.toLowerCase().includes(search.toLowerCase());
    return matchLocation && matchSearch;
  });

  return (
    <div className="min-h-screen bg-orange-50">
      <Nav />

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white py-10 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">🐾 All Creches</h1>
        <p className="text-lg opacity-90">Find the perfect home for your pet</p>

        {/* Search bar */}
        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full text-gray-800 text-sm focus:outline-none shadow-md"
          />
        </div>
      </div>

      {/* Location filter tabs */}
      <div className="flex gap-2 justify-center flex-wrap px-4 py-4 bg-white shadow-sm">
        {["All", ...LOCATIONS].map(loc => (
          <button
            key={loc}
            onClick={() => setActiveLocation(loc)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeLocation === loc
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-300 hover:border-orange-400"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Creches grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-xl">Loading all creches...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🐾</div>
            <p className="text-xl">No creches found{activeLocation !== "All" ? ` in ${activeLocation}` : ""}.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">{filtered.length} creche{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((e, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={e.displayimg || "defaultuserpic.png"}
                    alt={e.name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{e.name}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < e.rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm mb-1">📍 {e.location}</p>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{e.shortdescription}</p>
                    <p className="text-red-500 font-semibold mb-3">₹{e.price}/day</p>
                    <Link to={`/biggercard?id=${e.crecheid}&location=${e.location}`}>
                      <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-xl transition text-sm">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCreches;