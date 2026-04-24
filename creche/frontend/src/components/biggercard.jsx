import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams } from "react-router-dom";
import ReviewBox from './reviews';
import { useContext } from 'react';
import SignInContext from '../context/sigincontext/signinContext';
import Nav from './navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function New() {

const user = useContext(SignInContext);
const [e, setE] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [queryParams] = useSearchParams();
const navigate = useNavigate();
const a = queryParams.get('id');
const location = queryParams.get('location');

// ── Lightbox state ──────────────────────────────────────────────
const [lightboxImg, setLightboxImg] = useState(null); // null = closed

const openLightbox = (imgSrc) => setLightboxImg(imgSrc);
const closeLightbox = () => setLightboxImg(null);

// Close on Escape key
useEffect(() => {
    const handleKey = (ev) => { if (ev.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
}, []);
// ────────────────────────────────────────────────────────────────

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/biggercard?id=${a}&location=${location}`);
            if (!response.ok) throw new Error('Network response was not ok');
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
        <div className={className} style={{ ...style, backgroundColor: 'black' }} onClick={onClick} />
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
    adaptiveHeight: true
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!e) return <div>No data found.</div>;

    return (
        <>
        {/* ── Lightbox Overlay ─────────────────────────────────────── */}
        {lightboxImg && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                onClick={closeLightbox}
            >
                {/* Close button */}
                <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-6 text-white text-5xl font-light leading-none hover:text-gray-300"
                >
                    ×
                </button>

                {/* Image — click on image itself won't close */}
                <img
                    src={lightboxImg}
                    alt="Full size"
                    className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
                    onClick={(ev) => ev.stopPropagation()}
                />
            </div>
        )}
        {/* ────────────────────────────────────────────────────────── */}

        <div className='grid grid-cols-4 gap-4'>

            {/* left grid */}
            <div className="col-span-3 p-4">

            <div className='mb-2 -mt-10 w-full'>
             <Nav/>
             </div>

                {/* top name */}
                <div className="flex">
                    {/* Display image — also clickable */}
                    <img
                        src={e.displayimg}
                        className="h-24 w-24 rounded-full cursor-pointer hover:opacity-80 transition"
                        alt="Display"
                        onClick={() => openLightbox(e.displayimg)}
                        title="Click to view"
                    />
                    <div className="ml-12">
                        <div className="text-4xl">{e.name}</div>
                        <div className="flex">
                            <p className="p-2">by {e.ownername}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((star, index) => (
                                    <span key={index} className={index < e.rating ? "text-yellow-500 text-3xl" : "text-gray-300 text-3xl"}>★</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="p-8 ml-auto text-3xl text-purple-500 font-serif">At INR {e.price}/day</div>
                </div>
                <hr className='m-4'/>

                {/* location */}
                <div className="flex m-4">
                    <div className=""><img className="h-10" src="dot.svg" alt="" /></div>
                    <div className="p-2">{e.location}</div>
                </div>
                <hr className='m-4'/>

                {/* photos */}
                <div>
                    <p className="text-lg font-semibold text-gray-500 mb-2 ml-1">📷 Photos <span className="text-sm font-normal">(click to enlarge)</span></p>
                    <Slider {...settings}>
                        {(e.allimg && e.allimg.length > 0 ? e.allimg : []).map((imga, index) => (
                            <div key={index} className="px-1">
                                <img
                                    src={imga}
                                    alt={`Slide ${index}`}
                                    className="h-60 w-full object-cover rounded-lg cursor-pointer hover:opacity-85 hover:scale-105 transition-all duration-200"
                                    onClick={() => openLightbox(imga)}
                                    title="Click to view full size"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <hr className='m-4'/>

                {/* description */}
                <div className="flex flex-col m-10 shadow-lg p-3">
                <div className='text-2xl flex flex-start m-2 text-blue-700 font-bold'>About the creche owner</div>
                    <div className='flex flex-start'>{e.fulldescription}</div>
                </div>
                <hr className='m-4'/>

                {/* accepted Pet Types */}
                <div className='m-10 shadow-lg p-3'>
                <div className='flex flex-start flex-col'>
                  <p className='text-2xl text-blue-700 font-bold'>Accepted pet Types</p>  
                </div>
                <div className="flex w-full">
                    <ul className="flex flex-wrap justify-between w-full p-4 rounded-lg">
                        {e.petTypeAccepted.map((item, index) => (
                            <li key={index} className="flex items-center text-lg text-gray-800 mb-2 w-1/2">
                                <span className="mr-2">•</span>{item}
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
                <hr className='m-4'/>

                {/* skills */}
                <div className='m-10 shadow-lg p-3'>
                <div className='flex flex-start flex-col'>
                  <p className='text-2xl text-blue-700 font-bold'>Skills</p>  
                </div>
                <div className="flex w-full">
                    <ul className="flex flex-wrap justify-between w-full p-4 rounded-lg">
                        {e.skills.map((item, index) => (
                            <li key={index} className="flex items-center text-lg text-gray-800 mb-2 w-1/2">
                                <span className="mr-2">•</span>{item}
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
                <hr className='m-4'/>

                {/* About Creche */}
                <div className='flex m-10 flex-col items-start shadow p-3'> 
                    <div className="text-2xl text-blue-700 font-bold">About {e.name}</div>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">Summary</div>
                        <div className="mt-3">{e.summary}</div>
                    </div>
                    <hr className='m-4'/>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">Number of pets that will be watched at one time.</div>
                        <div className="mt-3">{e.noofpetswatched}</div>
                    </div>
                    <hr className='m-4'/>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">Accepted Pet size</div>
                        <div className="mt-3 flex justify-evenly w-full">
                            {e.petsize.map((p, i) => (
                                <div key={i} className='p-5 pt-0 items-center'>
                                    <img src={p.src} alt="" className='h-10 w-10 m-2'/>
                                    <p>{p.weight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr/>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">The number of potty breaks</div>
                        <div className="mt-3">{e.pottybreaks}</div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">Type of home I stay in</div>
                        <div className="mt-3">{e.typeOfHome}</div>
                    </div>
                    <div className='flex flex-col items-start'>
                        <div className="text-xl mt-10 font-semibold">Emergency Transport</div>
                        <div className="mt-3">{e.EmergencyTransport}</div>
                    </div>
                </div>
                <hr className='m-4'/>

                {/* Reviews */}
                <div className='m-10 border rounded-lg'>
                    <div className='text-2xl flex flex-start m-2 text-blue-700 font-bold'>Reviews</div>
                    <div className='flex flex-start align-start m-auto'>
                        <ReviewBox prereviews={e.reviews} crecheName={e.name} location={location} />
                    </div>
                </div>
                <hr/>

            </div>

            {/* right grid */}
            <div className="fixed right-4 bg-white border shadow-lg h-full top-0 overflow-y-auto">
                <div className='border'>
                    <div className='bg-slate-200 h-14 text-3xl text-center'>Services and Rates</div>
                    
                    {/* Book Now */}
                    <div className="items-center mt-4">
                        <div className='flex'>
                            <img src="bookicon.png" alt="" className='h-14 p-2'/>
                            <div className="p-3 text-2xl text-gray-400">Make a reservation</div>
                        </div>
                        <div className="text-l text-gray-400">Book a place for your pet now</div>
                        <Link
                            to={user.User.isLoggedIn ? "/booking" : "/"}
                            onClick={(ev) => {
                                if (!user.User.isLoggedIn) {
                                    ev.preventDefault();
                                    alert("Please sign in");
                                    navigate("/");
                                }
                            }}
                            state={{ id: e.crecheid, location: location, price: e.price, name: e.name }}
                        >
                            <button className="bg-purple-500 text-white text-2xl m-4 p-2">Book now</button>
                        </Link>
                    </div>
                    <hr className='m-4'/>

                    {/* Talk and Greet */}
                    <div className="items-center">
                        <div className='flex'>
                            <img src="talk andgreet.png" alt="" className='h-16'/>
                            <div className="p-4 text-2xl text-gray-400">Talk and Greet</div>
                        </div>
                        <div className="text-l text-gray-400">Get to know each other first</div>
                        {e.phoneNumber ? (
                            <a href={`tel:${e.phoneNumber}`} className="bg-purple-500 text-white text-xl m-4 p-2 block text-center rounded">
                                📞 {e.phoneNumber}
                            </a>
                        ) : (
                            <button className="bg-purple-500 text-white text-2xl m-4 p-2">
                                <Link to="/contact">Contact now</Link>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default New;