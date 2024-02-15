import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/StyleButton";



const HeroSection = () => {
 
 

  
  return (
    <Wrapper>
      <div className="container grid grid-two-column">
        <div className="section-hero-data">
          <p className="hero-top-data">THIS web page is</p>
          <h1 className="hero-heading">A online photo uploader clone</h1>
          <p className="hero-para">
            we can easily upload IMAGES with Credentials ..!
          </p>

          <Button className="btn hireme-btn" id="buttons">
            <NavLink to="/account">Upload</NavLink>
         
          </Button>
        </div>

        {/* for image  */}
        <div className="section-hero-image">
          <picture>
            <img src="./images/sky.avif" alt="hero" className="hero-img" />
          </picture>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

  .section-hero-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btn {
    max-width: 16rem;
  }

  .hero-top-data {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.helper};
  }

  .hero-heading {
    text-transform: uppercase;
    font-size: 6.4rem;
    color: ${({ theme }) => theme.colors.neon};
    text-shadow: rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 1px,
      rgb(255, 255, 255) 0px 0px 1px, rgb(0, 255, 170) 0px 0px 2px,
      rgb(0, 255, 170) 0px 0px 8px, rgb(0, 255, 170) 0px 0px 9px,
      rgb(0, 255, 170) 0px 0px 1px, rgb(0, 255, 170) 0px 0px 150px;
  }

  .hero-para {
    margin-top: 1.5rem;
    margin-bottom: 3.4rem;
    max-width: 60rem;
  }

  .section-hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  picture {
    text-align: center;
  }

  .hero-img {
    height:100%;
    width:100vh;
    filter: drop-shadow(rgb(68, 68, 221) 68px -29px 7px);
  }
 
  

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 7.2rem;
    }
    .hero-heading{
      font-size: 53.5px;
    }

    .hero-img {
       width: 98%;
    }
  }
`;

export default HeroSection;
