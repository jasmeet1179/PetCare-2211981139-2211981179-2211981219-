import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useParams, useSearchParams } from 'react-router-dom';

function New() {
    const [e, setE] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const [queryParams] = useSearchParams();

    const a = queryParams.get('id');
    const location = queryParams.get('location');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/biggercard?id=${a}&location=${location}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setE(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [a, location]);

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, backgroundColor: 'black' }} // Change color here
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleNextArrow />,
        adaptiveHeight: true // Enable adaptive height
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!e) {
        return <div>No data found.</div>;
    }

    return (
        <>
            <div className='grid grid-cols-4 gap-4'>
                {/* left grid */}
                <div className="col-span-3 p-4">
                    {/* top name */}
                    <div className="flex">
                        <img src="dd.jpg" className="h-24 w-24 rounded-full" alt="Display" />
                        <div className="ml-12">
                            <div className="text-4xl">{e.name}</div>
                            <div className="flex">
                                <p className="p-2">by {e.ownername}</p>
                                <div className="flex items-center">
                                    {[...Array(5)].map((star, index) => (
                                        <span key={index} className={index < e.rating ? "text-yellow-500 text-3xl" : "text-gray-300 text-3xl"}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-8 ml-auto text-3xl text-purple-500 font-serif">At INR {e.price}/day</div>
                    </div>
                    <hr className='m-4' />
                    {/* location */}
                    <div className="flex m-4">
                        <div><img className="h-10" src="dot.svg" alt="" /></div>
                        <div className="p-2">{e.location}</div>
                    </div>
                    <hr className='m-4' />

                    {/* photos */}
                    <div>
                        <Slider {...settings}>
                            {e.allimg.map((img, index) => (
                                <img key={index} className="p-2 h-60 w-44 m-2" src={img} alt={`Slide ${index}`} />
                            ))}
                        </Slider>
                    </div>
                    <hr className='m-4' />

                    {/* description */}
                    <div className="flex flex-col m-10 shadow-lg p-3">
                        <div className='text-2xl flex flex-start m-2 text-blue-700 font-bold'>About the creche owner</div>
                        <div className='items-start'>{e.fulldescription}</div>
                    </div>
                    <hr className='m-4' />

                    {/* accepted Pet Types */}
                    <div className='m-10 shadow-lg p-3'>
                        <div className='flex flex-start felx-col'>
                            <p className='text-2xl text-blue-700 font-bold'>Accepted pet Types</p>
                        </div>
                        <div className="flex w-full">
                            <ul className="flex flex-wrap justify-between w-full p-4 rounded-lg">
                                {e.petTypeAccepted.map((item, index) => (
                                    <li key={index} className="flex items-center text-lg text-gray-800 mb-2 w-1/2">
                                        <span className="mr-2 list-disc">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr className='m-4' />

                    {/* skills */}
                    <div className='m-10 shadow-lg p-3'>
                        <div className='flex flex-start felx-col'>
                            <p className='text-2xl text-blue-700 font-bold'>Skills</p>
                        </div>
                        <div className="flex w-full">
                            <ul className="flex flex-wrap justify-between w-full p-4 rounded-lg">
                                {e.skills.map((item, index) => (
                                    <li key={index} className="flex items-center text-lg text-gray-800 mb-2 w-1/2">
                                        <span className="mr-2 list-disc">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr className='m-4' />

                    {/* About Creche */}
                    <div className='flex m-10 flex-col items-start shadow p-3'>
                        <div className="text-2xl text-blue-700 font-bold">About {e.name}</div>
                        {/* summary */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">Summary</div>
                            <div className="mt-3">{e.summary}</div>
                        </div>
                        <hr className='m-4' />

                        {/* no of pets watched at a time */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">Number of pets that will be watched at one time.</div>
                            <div className="mt-3">{e.noofpetswatched}</div>
                        </div>
                        <hr className='m-4' />

                        {/* accepted pet size */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">Accepted Pet size</div>
                            <div className="mt-3 flex justify-evenly w-full">
                                {e.petsize.map((pet, i) => (
                                    <div key={i} className='p-5 pt-0 items-center'>
                                        <img src={pet.src} alt="" className='h-10 w-10 m-2' />
                                        <p>{pet.weight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className='m-4' />

                        {/* no of breaks in a day */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">The number of potty breaks</div>
                            <div className="mt-3">{e.pottybreaks}</div>
                        </div>

                        {/* type of home */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">Type of home I stay in</div>
                            <div className="mt-3">{e.typeOfHome}</div>
                        </div>

                        {/* emergency transport */}
                        <div className='flex flex-col items-start'>
                            <div className="text-xl mt-10 font-semibold">Emergency Transport</div>
                            <div className="mt-3">{e.EmergencyTransport}</div>
                        </div>
                    </div>
                    <hr className='m-4' />

                    </div>
                </div>
            
        </>
                            )}
                            export default New;