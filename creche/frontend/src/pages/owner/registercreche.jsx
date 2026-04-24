import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInContext from "../../context/sigincontext/signinContext";
import { v4 as uuidv4 } from "uuid";
import MultiPhotoUpload from "@/components/photoupload";

const RegisterCreche = () => {
  const context = useContext(SignInContext).User;
  const navigate = useNavigate();
  // Fix: safely read editing from state (won't crash if state is null)
  const locationState = useLocation().state;
  const editing = locationState?.editing ?? false;

  const petsizepic = {
    "0-5kg": "icon_01.png",
    "5-10kg": "icon_02.png",
    "10-20kg": "icon_03.png",
    "20-40kg": "icon_04.png",
  };

  const [previnfo, setPrevinfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    displayimg: "",
    certificate: [],
    location: "",
    shortdescription: "",
    price: "",
    rating: 0,
    ownername: "",
    allimg: [],
    fulldescription: "",
    skills: [],
    summary: "",
    noofpetswatched: "",
    petsize: [],
    pottybreaks: "",
    typeOfHome: "",
    Emergencytransport: "",
    petTypeAccepted: [],
    bookings: [],
    phoneNumber: "",
    // Fix: added email field
    email: "",
    userid: "",
    crecheid: "",
  });

  const [pageNo, setPageNo] = useState(0);

  // Fetch data when editing is true
  useEffect(() => {
    if (editing) {
      fetch(
        `http://localhost:3000/registercreche/?location=${context.location}&id=${context.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching data");
          return response.json();
        })
        .then((data) => {
          setPrevinfo(data);
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [editing, context.location, context.id]);

  const incrementPage = () => setPageNo(pageNo + 1);
  const decrementPage = () => setPageNo(pageNo - 1);

  // Fix: displayimg gets single URL string
  const handleDisplayImgChange = (url) => {
    setFormData((prev) => ({ ...prev, displayimg: url }));
  };

  // Fix: allimg should accumulate URLs as array, not overwrite with single string
  const handleCrecheImgChange = (url) => {
    const urls = Array.isArray(url) ? url : [url];
    setFormData((prev) => ({ ...prev, allimg: [...prev.allimg, ...urls] }));
  };

  const handleCertificateChange = (url) => {
    const urls = Array.isArray(url) ? url : [url];
    setFormData((prev) => ({ ...prev, certificate: [...prev.certificate, ...urls] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation — check required fields before sending
    if (!formData.location || formData.location === "") {
      alert("Please select a location on page 1.");
      setPageNo(0);
      return;
    }
    if (!formData.name || !formData.ownername) {
      alert("Please fill in your name and creche name on page 1.");
      setPageNo(0);
      return;
    }

    const crecheData = {
      ...formData,
      userid: context.id,
      username: context.userName,
      // Make sure price is a number not a string
      price: Number(formData.price) || 0,
    };

    const payload = editing === true
      ? { data: crecheData, editing: true }
      : { data: crecheData };

    fetch("http://localhost:3000/registercreche", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert(editing ? "Updated details successfully!" : "Creche registered successfully!");
          navigate("/owner");
        } else {
          response.text().then(txt => {
            alert("Error: " + txt);
          });
        }
      })
      .catch(() => {
        alert("Could not connect to server. Make sure the backend is running.");
      });
  };

  const pageTitle = ["Registration Details", "Pet Details", "Creche Details", "Upload Images"];

  return (
    <div className="bg-orange-200 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="bg-white opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg">
        {/* Page Navigation */}
        <div className="flex justify-between mb-4">
          {pageNo > 0 && (
            <button onClick={decrementPage} className="text-white bg-slate-500 rounded-md p-2">
              Prev Page
            </button>
          )}
          <h2 className="text-2xl font-semibold text-slate-800 m-auto">
            {pageTitle[pageNo]}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Page 0 — Registration Details */}
          {pageNo === 0 && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Your Name</label>
                <input type="text" placeholder="Name" onChange={handleChange} name="ownername"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.ownername} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Creche Name</label>
                <input type="text" placeholder="Creche Name" onChange={handleChange} name="name"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.name} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" placeholder="Phone Number" onChange={handleChange} name="phoneNumber"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.phoneNumber} />
              </div>

              {/* Fix: Added email field */}
              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Email</label>
                <input type="email" placeholder="Email Address" onChange={handleChange} name="email"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.email} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Choose your location</label>
                <select className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange} name="location">
                  <option value="" disabled defaultValue>Location</option>
                  <option value="Yamunanagar">Yamunanagar</option>
                  <option value="Panipat">Panipat</option>
                  <option value="Faridabad">Faridabad</option>
                  <option value="Ambala">Ambala</option>
                  <option value="Karnal">Karnal</option>
                  <option value="Rohtak">Rohtak</option>
                  <option value="Gurugram">Gurugram</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Short description about your creche</label>
                <input type="text" placeholder="Short Description" onChange={handleChange} name="shortdescription"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.shortdescription} />
              </div>

              <button type="button" className="w-full py-3 bg-red-500 text-white rounded-md shadow-md" onClick={incrementPage}>
                Next
              </button>
            </>
          )}

          {/* Page 1 — Pet Details */}
          {pageNo === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Pet Types Accepted</label>
                <div className="flex flex-wrap gap-4">
                  {["Cat", "Dog", "Rabbit", "Mouse"].map((petType) => (
                    <label key={petType} className="flex items-center space-x-2">
                      <input type="checkbox" name="petTypeAccepted" value={petType}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            petTypeAccepted: checked
                              ? [...prev.petTypeAccepted, value]
                              : prev.petTypeAccepted.filter((t) => t !== value),
                          }));
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600" />
                      <span>{petType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">No of pets watched at once</label>
                <input type="text" placeholder="e.g. 3" onChange={handleChange} name="noofpetswatched"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.noofpetswatched} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Pet Sizes Accepted</label>
                <div className="flex flex-wrap gap-4">
                  {["0-5kg", "5-10kg", "10-20kg", "20-40kg"].map((petsize) => (
                    <label key={petsize} className="flex items-center space-x-2">
                      <input type="checkbox" name="petsize" value={petsize}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            petsize: checked
                              ? [...prev.petsize, { src: petsizepic[value], weight: value }]
                              : prev.petsize.filter((t) => t.weight !== value),
                          }));
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600" />
                      <span>{petsize}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">No of potty breaks per day</label>
                <input type="text" placeholder="e.g. 4" onChange={handleChange} name="pottybreaks"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.pottybreaks} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Skills</label>
                <div className="flex flex-wrap gap-4">
                  {['Pet Sitting', 'Dog Walking', 'Pet Grooming', 'Dog Boarding', 'Puppy Care', 'Senior Pet Care'].map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input type="checkbox" name="skills" value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData((prev) => ({
                            ...prev,
                            skills: checked
                              ? [...prev.skills, value]
                              : prev.skills.filter((s) => s !== value),
                          }));
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600" />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="button" className="w-full py-3 bg-red-500 text-white rounded-md shadow-md" onClick={incrementPage}>
                Next
              </button>
            </>
          )}

          {/* Page 2 — Creche Details */}
          {pageNo === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Price per day (INR)</label>
                <input type="number" placeholder="Price" onChange={handleChange} name="price"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.price} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Type of Home</label>
                <select className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange} name="typeOfHome">
                  <option value="" disabled defaultValue>Select type</option>
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="dedicatedcreche">Dedicated Creche</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Summary</label>
                <input type="text" placeholder="Brief summary" onChange={handleChange} name="summary"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required value={formData.summary} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Emergency Transport Available?</label>
                <select className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange} name="Emergencytransport">
                  <option value="" disabled defaultValue>Choose an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Full description about your creche</label>
                <textarea placeholder="Tell pet owners about yourself and your creche..." onChange={handleChange} name="fulldescription"
                  className="w-full p-3 border border-slate-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
                  required value={formData.fulldescription} />
              </div>

              <button type="button" className="w-full py-3 bg-red-500 text-white rounded-md shadow-md" onClick={incrementPage}>
                Next
              </button>
            </>
          )}

          {/* Page 3 — Upload Images */}
          {pageNo === 3 && (
            <>
              <div className="w-full p-3 border border-slate-300 rounded-md shadow-md mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Upload Profile Pic</label>
                <MultiPhotoUpload onValueChange={handleDisplayImgChange} multiple={false} />
              </div>

              <div className="w-full p-3 border border-slate-300 rounded-md shadow-md mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Upload Creche Images</label>
                <MultiPhotoUpload onValueChange={handleCrecheImgChange} />
              </div>

              <div className="w-full p-3 border border-slate-300 rounded-md shadow-md mb-4">
                <label className="block text-lg font-medium text-slate-700 mb-1">Upload Certificate Images</label>
                <MultiPhotoUpload onValueChange={handleCertificateChange} />
              </div>

              <button type="submit" className="w-full py-3 bg-red-500 text-white rounded-md shadow-md">
                Submit Registration
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterCreche;