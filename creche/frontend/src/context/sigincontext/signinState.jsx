import { useState } from "react";
import SignInContext from "./signinContext";

const loadSession = () => {
    try {
        const saved = localStorage.getItem('petcare_user');
        if (saved) return JSON.parse(saved);
    } catch { }
    return {
        isLoggedIn: false,
        userName: null,
        crecheOwner: false,
        email: null,
        bookingHistory: [],
        currentBooking: [],
        profilePicture: null,
        location: null,
        id: null,
        token: null,
    };
};

const SigninO = (props) => {
    const [User, setUser] = useState(loadSession);

    const signInHandler = (data, token) => {
        const userState = {
            isLoggedIn: true,
            userName: data.userName,
            email: data.email,
            bookingHistory: data.crecheOwner ? (data.bookings || []) : (data.bookingHistory || []),
            currentBooking: data.currentBooking || [],
            profilePicture: data.profilePicture,
            crecheOwner: data.crecheOwner,
            id: data.id,
            location: data.location,
            phoneNumber: data.phoneNumber,
            token: token || null,  // ← store JWT token
        };
        setUser(userState);
        localStorage.setItem('petcare_user', JSON.stringify(userState));
    };

    const signOutHandler = () => {
        const empty = {
            isLoggedIn: false,
            userName: null,
            crecheOwner: false,
            email: null,
            bookingHistory: [],
            currentBooking: [],
            profilePicture: null,
            location: null,
            id: null,
            token: null,
        };
        setUser(empty);
        localStorage.removeItem('petcare_user');
    };

    return (
        <SignInContext.Provider value={{ User, signInHandler, signOutHandler }}>
            {props.children}
        </SignInContext.Provider>
    );
};

export default SigninO;