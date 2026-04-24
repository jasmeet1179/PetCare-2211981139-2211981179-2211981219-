import React from 'react'
import './App.css'

import Home from './pages/home'
import SignIn from './pages/signin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/search'

import New from './components/biggercard'
import UserProfilepage from './pages/userprofile'

import SignInContext from './context/sigincontext/signinContext'
import SigninO from './context/sigincontext/signinState'
import OwnerHome from './pages/owner/ownerhome'
import RegisterCreche from './pages/owner/registercreche'
import IsLoggedIn from './routes/isLoggedIn'
import Booking from './pages/Booking'
import About from './pages/about';
import ContactUs from './pages/contact';
import MakePayment from './components/payment';
import LogIn from './pages/login';
import MultiPhotoUpload from './components/photoupload';
import Community from './pages/Community';
import AllCreches from './pages/AllCreches';
import CreatePost from './pages/CreatePost';
import OwnerProfile from './pages/owner/ownerprofile';

function App() {
  return (
    <>
      <SigninO>
        <Router>
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/registercreche" element={<RegisterCreche />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/images" element={<MultiPhotoUpload />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Search & Detail */}
              <Route path="/search" element={<Search />} />
              <Route path="/biggercard" element={<New />} />

              {/* All Creches */}
              <Route path="/allcreches" element={<AllCreches />} />

              {/* Community */}
              <Route path="/community" element={<Community />} />
              <Route path="/createpost" element={<IsLoggedIn><CreatePost /></IsLoggedIn>} />

              {/* Protected Routes */}
              <Route
                path="/userProfile"
                element={
                  <IsLoggedIn>
                    <UserProfilepage />
                  </IsLoggedIn>
                }
              />
              <Route
                path="/owner"
                element={
                  <IsLoggedIn>
                    <OwnerHome />
                  </IsLoggedIn>
                }
              />
              <Route
                path="/ownerprofile"
                element={
                  <IsLoggedIn>
                    <OwnerProfile />
                  </IsLoggedIn>
                }
              />
              <Route
                path="/booking"
                element={
                  <IsLoggedIn>
                    <Booking />
                  </IsLoggedIn>
                }
              />
              <Route
                path="/payment"
                element={
                  <IsLoggedIn>
                    <MakePayment />
                  </IsLoggedIn>
                }
              />
            </Routes>
          </main>
        </Router>
      </SigninO>
    </>
  )
}

export default App