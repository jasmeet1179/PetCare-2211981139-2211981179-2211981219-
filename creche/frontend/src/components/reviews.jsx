// src/ReviewBox.jsx
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import SignInContext from '../context/sigincontext/signinContext';

const ReviewBox = ({prereviews,crecheName,location}) => {

// console.log(prereviews)
  const [reviews, setReviews] = useState(prereviews);
  const [reviewText, setReviewText] = useState('');
const [change,setChange]=useState(false);

const User=useContext(SignInContext);
console.log(crecheName,location)
  useEffect(() => {
    fetch("http://localhost:3000/updatereviews",{
      method: "POST",
      body: JSON.stringify({
        username: User.User.userName,
        newreviews: reviews,
        location: location,
        crecheName: crecheName
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(data=>{
      console.log(JSON.stringify(data));
    })
  }, [reviews]);

  const handleSubmit = (e) => {
    console.log("subited")
   
    setChange(!change)
  };
  
  useEffect(() => {
    console.log(reviews)

    if (reviewText.trim()) {
      if(reviews){
      setReviews([ ...reviews, {
        "reviewerName":User.User.userName,
        "review":reviewText
    }]);
      setReviewText('');
    }
    else{
      setReviews([ {
        "reviewerName":User.User.userName,
        "review":reviewText
    }]);
      setReviewText('');
    }
  }
 
    
    console.log(reviews)
    // onReviewChange(reviews);
  },[change]);

  return (
    <div className="w-full mx-auto p-4 ">
      <div  className="mb-4">
        <textarea
          className="w-full p-2 border rounded-lg mb-2"
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          onClick={()=>{
            if(User.User.isLoggedIn){
    // preventDefault();

              handleSubmit();
            }
            else{
              alert("please login ")
            }
          }}
        >
          Submit Review
        </button>
      </div>
      <div className='flex flex-col '>
      
            { reviews && reviews.length > 0 ? (
                reviews.map((e,i)=>(
                    <div className='text-xl mr-auto text-start m-2 shadow-lg w-full'>
                        {e.reviewerName}
                        <div className=" text-base m-1">
                            {e.review}
                        </div>
                    </div>
                ))
              ): (
                <div className='text-xl mr-auto text-start m-2 shadow-lg w-full'>
                    No reviews yet.
                </div>
              )
            
            }
      </div>
    </div>
  );
};

export default ReviewBox;