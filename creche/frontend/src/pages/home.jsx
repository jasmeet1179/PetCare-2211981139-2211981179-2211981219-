import React from 'react'
import '../App.css'
import Nav from '../components/navbar'
import Top from '../components/1st'
import Second from '../components/2nd'
import Third from '../components/3rd'
import Footer from '../components/footer'

import { useState } from 'react'

function App(){
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    console.log("jelo");
    
    setSelectedDate(date);
  };




  return (
    
    <>
<div className='-m-7'>
  
<Nav/>

<Top/>
<Third/>

        <Second/>
       <Footer/> 
       
       </div>
                     

    </>
  )
}


export default App

















// import React from 'react';
// import { Link } from 'react-router-dom';

// const App = () => {
//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default App;

// let [e,setE]=useState("");

//     function find(param) {
//         const params=useParams();
// const [queryParams]=useSearchParams();
// let q=queryParams.get(param)
//         return q;
//     }
//     let a=find('id');
//     let location=find('location')
// console.log("ais:"+a+"lo is"+location)

//     useEffect(() => {
    
    
//                     fetch(`http://localhost:3000/biggercard?id=${a}&location=${location}`).then(response =>{ 
//                         // console.log("This is response",response)
//                         return response.json();
//                     }
//                     )
//                     .then(data=>{
//                         // setE(data);
//                         console.log("This is data",data)
//                         setE(data);
//                 }) 
//             },[]);




//     const SampleNextArrow = (props) => {
//         const { className, style, onClick } = props;
//         return (
//             <div
//                 className={className}
//                 style={{ ...style, backgroundColor: 'black' }} // Change color here
//                 onClick={onClick}
//             />
//         )
//     }
  

//     // const e = {
//     //     name: "Lexi day care",
//     //     displayimg: "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg",
//     //     certificate: [
//     //         "https://content.petbacker.com/images/cms/icons/credentials/id.png",
//     //         "https://content.petbacker.com/images/cms/icons/credentials/id.png",
//     //         "https://content.petbacker.com/images/cms/icons/credentials/id.png"
//     //     ],
//     //     location: "Chandigarh",
//     //     shortdescription: "Love to handle your furry pets. Number of pets",
//     //     price: 500,
//     //     rating: 3,
//     //     ownername: "sumegha",
//     //     allimg: [
//     //         "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg",
//     //         "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg",
//     //         "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg",
//     //         "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg",
//     //         "https://assets.petbacker.com/user-images/320/u_2c08f572e6.60bd2c6f08346.jpg"
//     //     ]
//     //     ,
//     //     fulldescription:"I m gursimran , i have 1 golden retreiver and had a shih tzu .. I love him like my own family memberI’m a pet lover  I love dogs instantly and I would pamper it and always have it by my side I enjoy spending time with dogs as they are so adorable :)I own golden retriever now and i had shihtzuu 2 years backYour pet can roam anywhere even on bed and couchI love dogs"
//     //     ,
//     //     skills: ["Dog Walking", "Pet Sitting", "Pet Grooming", "Pet Training", "Dog Boarding"] ,
//     //     summary:"I m gursimran , i have 1 golden retreiver and had a shih tzu .. I love him like my own" ,
//     //     noofpetswatched:"4",
//     //     petsize:[{src:"icon_01.png",weight:"0-5kg"},{src:"icon_02.png",weight:"5-10kg"},{src:"icon_03.png",weight:"10-20kg"},{src:"icon_04.png",weight:"20-40kg"},{src:"icon_05.png",weight:"40kg+"}]
//     //    ,
//     //     pottybreaks:"3",
//     //     typeOfHome:"Apartment",
//     //     EmergencyTransport:"Yes" ,
//     //     petTypeAccepted:["Dogs", "Cats", "Birds", "Fish", "Reptiles"],
//     //     price:500
//     // };

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SampleNextArrow />,
//         adaptiveHeight: true // Enable adaptive height
//     };