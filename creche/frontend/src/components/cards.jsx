import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Cards = ({ location }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        // Don't fetch if no location selected
        if (!location || location === "Select your location" || location === "") {
            setData([]);
            return;
        }

        setLoading(true);
        setNotFound(false);

        fetch(`http://localhost:3000/searchlocation/${location}`)
            .then(response => {
                if (!response.ok) {
                    setNotFound(true);
                    setData([]);
                    return null;
                }
                return response.json();
            })
            .then(result => {
                if (result && Array.isArray(result)) {
                    setData(result);
                } else {
                    setData([]);
                }
                setLoading(false);
            })
            .catch(() => {
                setData([]);
                setLoading(false);
            });
    }, [location]);

    // Nothing selected yet
    if (!location || location === "") {
        return (
            <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">📍</div>
                <p className="text-xl">Select a location to find creches near you</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-400">
                <p className="text-xl">Searching creches in {location}...</p>
            </div>
        );
    }

    if (notFound || data.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">🐾</div>
                <p className="text-xl">No creches found in <strong>{location}</strong></p>
                <p className="text-sm mt-2">Try searching in a different location</p>
            </div>
        );
    }

    return (
        <>
            {data.map((e, i) => (
                <div key={i} className="grid items-center p-3">
                    <Link to={`/biggercard?id=${e.crecheid}&location=${location}`}>
                        <div className="container flex h-48 bg-gray-100 w-5/6 mx-auto my-auto rounded-xl shadow-lg hover:shadow-xl transition">
                            {/* Display image */}
                            <div className="image-wrapper">
                                <img src={e.displayimg} alt="" className="h-full w-56 rounded-md p-1 object-cover" />
                            </div>
                            {/* Content */}
                            <div className="displaycontent ml-10 flex-col flex-shrink-0">
                                {/* Certificates */}
                                <div className="flex h-10 container">
                                    {(e.certificate || []).map((cert, i) => (
                                        <div key={i}>
                                            <img src={cert} alt="certificate" className="h-full p-1" />
                                        </div>
                                    ))}
                                </div>
                                {/* Name */}
                                <div className="text-blue-400 text-2xl font-bold flex justify-start">
                                    {e.name}
                                </div>
                                {/* Location */}
                                <div className="items-start flex justify-start text-l font-bold text-red-500">
                                    {e.location}
                                </div>
                                {/* Short description */}
                                <div className="text-gray-500">
                                    {e.shortdescription}
                                </div>
                                {/* Price */}
                                <div className="flex justify-start text-red-600 text-xl">
                                    ₹{e.price} /day
                                </div>
                            </div>
                            {/* Stars */}
                            <div className="ml-auto mr-20">
                                <div className="flex items-center pb-12">
                                    {[...Array(5)].map((star, index) => (
                                        <span key={index} className={index < e.rating ? "text-yellow-500 text-3xl" : "text-gray-300 text-3xl"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default Cards;