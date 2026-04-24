import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Third = () => {
  const [bestCreches, setBestCreches] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHOWCASE_LOCATIONS = ["Faridabad", "Ambala", "Panipat", "Karnal", "Gurugram", "Rohtak", "Yamunanagar"];

  useEffect(() => {
    const fetchCreches = async () => {
      const results = [];

      for (const loc of SHOWCASE_LOCATIONS) {
        try {
          const res = await fetch(`http://localhost:3000/searchlocation/${loc}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            results.push({ ...data[0], location: loc });
          }
        } catch {
          // skip failed locations
        }
        if (results.length >= 4) break;
      }

      setBestCreches(results);
      setLoading(false);
    };

    fetchCreches();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white mt-16 mb-16 px-6 text-center text-gray-400 py-10">
        Loading best creches...
      </div>
    );
  }

  if (bestCreches.length === 0) {
    return (
      <div className="w-full bg-white mt-16 mb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-8 font-title tracking-wide">
            Best Creches In Your Area
          </h2>
          <p className="text-gray-400 py-10">
            No creches registered yet. Be the first to register yours!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white mt-16 mb-16 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-orange-400 mb-8 font-title tracking-wide hover:text-yellow-400 hover:scale-105 transition-transform duration-300 ease-in-out">
          Best Creches In Your Area
        </h2>

        {/* 4 creche cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {bestCreches.slice(0, 4).map((e, i) => (
            <div
              key={i}
              className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-50"
            >
              <img
                src={e.displayimg || "defaultuserpic.png"}
                alt={e.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{e.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < e.rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>★</span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-1">📍 {e.location}</p>
                <p className="text-red-500 font-semibold mb-4">₹{e.price}/day</p>
                <Link to={`/biggercard?id=${e.crecheid}&location=${e.location}`}>
                  <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-xl transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More button */}
        <div className="flex justify-center mt-10">
          <Link to="/allcreches">
            <button className="px-10 py-3 bg-orange-400 hover:bg-orange-500 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              View More Creches →
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Third;