🐾 PetCare — Pet Creche Booking Platform:-
A full-stack web application that connects pet owners with pet creches across India. Users can search, compare, and book creches for their pets, while also participating in a community to report stray animals and share pet stories.

About the Project:-
PetCare bridges the:- gap between pet owners and local pet creches in Indian cities. Finding a trustworthy daycare for pets is a challenge — PetCare solves this by providing a unified platform for browsing, comparing, and booking creches, along with a vibrant community space for pet lovers to connect, report strays, and promote adoptions.

Features:-
👤 For Pet Owners:-
Register and log in securely with JWT authentication
Search creches by city/location
View detailed creche profiles — photos, skills, pet types, pricing, reviews
Book a creche with a multi-step booking form
Pay via Card, UPI, or Cash on Delivery
View and cancel bookings from user profile
Upload profile picture via Cloudinary
Participate in community posts and comments

🏠 For Creche Owners:-
Register with owner secret key (prevents unauthorized registrations)
Multi-step creche registration form (details, pet info, images)
Owner dashboard with booking history, total revenue and reviews
Edit creche details anytime
Phone number shown on creche page for direct contact

🌍 Community:-
Post stray animal sightings with photos, location and health status
Share pet adoption listings and pet stories
Filter posts by category (Stray Sighting, Adoption, Pet Story)
Comment on posts to connect with other pet lover

Tech Stack:-
Frontend:-
The frontend is built using React.js with functional components and hooks such as useState, useEffect, and useContext for state management and side effects. Vite is used as the build tool for fast development and hot module replacement. All styling is done using Tailwind CSS, a utility-first framework that allows rapid UI development without writing separate CSS files. React Router v6 handles client-side routing including protected routes that restrict access to logged-in users only. The Context API manages global user session state so any component can access the logged-in user's data without prop drilling. JWT tokens are stored in localStorage so users remain logged in even after page refresh. Cloudinary is used for direct image uploads from the browser — images are sent straight to Cloudinary's servers and the returned URL is saved in the database.

Backend:-
The backend is built on Node.js with Express.js as the REST API framework, handling all HTTP requests through structured route files. MongoDB Atlas is used as the cloud-based NoSQL database, connected through Mongoose which provides object modeling and schema validation for the three main collections — users, creches, and posts. Passwords are securely hashed using bcrypt with 10 salt rounds before storing in the database, ensuring no plain text passwords are ever saved. JWT (JSON Web Tokens) handle authentication — a token is generated on login and verified on every protected API request using a custom middleware. Multer handles file uploads on the server side before passing them to Cloudinary for cloud storage. Environment variables such as the MongoDB connection string, JWT secret, and owner secret key are managed using dotenv, keeping sensitive credentials out of the codebase.

Security:-
Passwords hashed with bcrypt (10 salt rounds) — never stored as plain text
JWT tokens expire after 7 days — stored in localStorage
Protected routes require valid JWT in Authorization: Bearer <token> header
Owner Secret Key required to register as creche owner
Environment variables in .env — never committed to git
Add .env to .gitignore before pushing to GitHub

Team
This project was developed by a team of three final year Bachelor of Engineering students from Chitkara University, Rajpura, Punjab, under the guidance of their supervisor.
Jasmeet Singh (Roll No. 2211981179) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: jasmeet1179.be22@chitkarauniversity.edu.in | 7696848807
Manjul (Roll No. 2211981219) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: manjul1219.be22@chitkarauniversity.edu.in | 7018714397
Deepanshu Bhardwaj (Roll No. 2211981139) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: deepanshu1139.be22@chitkarauniversity.edu.in | 8572843261
Dr. Ajay Kumar — Project Supervisor, Chitkara University. Contact: akumar@chitkara.edu.in
Institution: Chitkara University, Rajpura, Punjab

Team:-
This project was developed by a team of three final year Bachelor of Engineering students from Chitkara University, Rajpura, Punjab, under the guidance of their supervisor.
Dr. Ajay Kumar — Project Supervisor, Chitkara University. Contact: akumar@chitkara.edu.in
Institution: Chitkara University, Rajpura, Punjab

A> Jasmeet Singh (Roll No. 2211981179) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: jasmeet1179.be22@chitkarauniversity.edu.in | 7696848807
B> Manjul (Roll No. 2211981219) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: manjul1219.be22@chitkarauniversity.edu.in | 7018714397
C> Deepanshu Bhardwaj (Roll No. 2211981139) — Full Stack Developer. Currently in the final year of B.E. at Chitkara University. Contact: deepanshu1139.be22@chitkarauniversity.edu.in | 8572843261

Copyright
© 2026 Jasmeet Singh, Manjul, and Deepanshu Bhardwaj. All rights reserved.
This project titled "PetCare" is an original work developed as a final year project at Chitkara University, Rajpura, Punjab. The source code, design, and all associated content are the intellectual property of the authors. No part of this project may be reproduced, distributed, or used in any form without prior written permission from the authors.
This work has been submitted for copyright registration with the Copyright Office, Government of India, New Delhi.

