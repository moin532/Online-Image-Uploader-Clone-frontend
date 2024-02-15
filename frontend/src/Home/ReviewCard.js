import React from 'react'

import styled from 'styled-components'


const ReviewCard = ({reviews}) => {
  return (
   <Wrapper>
   
   <div className="reviewCard">
      <img src="/images/Profile.png" alt="User" />
      <p>{reviews.name}</p>
     
      <span className="reviewCardComment">{reviews.comment}</span>
    </div>
   
   
   </Wrapper>
  )
}


const Wrapper = styled.section`
.reviewCard {
  flex: none;

  box-shadow: 0 0 5px rgba(168, 225, 207, 0.226);
  border: 1px solid rgba(251, 245, 245, 0.116);
  width: 30vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1vmax;
  padding: 3vmax;
}

.reviewCard > img {
  width: 5vmax;
}
.reviewCard > p {
  color: white;
  font: 600 0.9vmax "Roboto";
}



.reviewCardComment {
    font-size:22px;
    color:white;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    
  }
  
  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: white;
  }

  @media screen and (max-width: 600px) {
    
  .submitReview {
    font: 500 1.7vmax "Roboto";
    padding: 1.5vmax;
    width: 20vmax;
    margin: 3vmax 0;
  }

  .reviewCard > p {
    font: 600 3vw "Roboto";
  }
  .reviewCardComment {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size:20px;
    margin-top:15px;
  }
  
  .reviewCard{
    width:37%;
  }
  
  
}
`
export default ReviewCard
