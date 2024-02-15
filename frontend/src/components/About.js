import styled from 'styled-components';
import { Button } from '../styles/StyleButton'
import { NavLink } from 'react-router-dom';


const About = () => {
   
  return (
    <Wrapper>
        <div className="container">
            <div className='grid grid-two-column'>
                <div className="hero-section-data">
                    <p className="intro-data">
                        Welcome to 
                    </p>
                    <h1>MM Image -Uploader</h1>
                    <p>Hello Everyone I have a created image uploade website.
                     have deep intrest and passion towards software enginering ,i have 
                    already come up with as a advanced FULL STACK DEVOLOPER, this  website wich that i have created aim's at: " to being the best user experience to Customers through innovative software services" "to provide branded prodoucts and services of superior
                     quality and value that improve the lives of the world's consumers,
                     now and for genrations to come." Thank-you </p>
            
                 <NavLink to="/">
                    <Button>
                        upload now
                    </Button>
                 </NavLink>
            </div>
            <div className="hero-section-image">
                <figure>
                    <img src="/images/cartooon.jpg" alt="hero" className='img-style' />
                </figure>
            </div>
            </div>

        </div>


    </Wrapper>
  
  )
}
const Wrapper = styled.section`
padding: 12rem 0;

img {
  min-width: 10rem;
  height: 10rem;
}

.hero-section-data {
  p {
    margin: 2rem 0;
  }

  h1 {
    text-transform: capitalize;
    font-weight: bold;
    color:rgb(73 73 165);
  }

  .intro-data {
    margin-bottom: 0;
  }
}

.hero-section-image {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
figure {
  position: relative;

  &::after {
    content: "";
    width: 60%;
    height: 80%;
    background-color: rgb(73 73 165);
    position: absolute;
    left: 50%;
    top: -5rem;
    z-index: -1;
  }
}
.img-style {
  width: 100%;
  height: auto;
}

@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .grid {
    gap: 10rem;
  }

  figure::after {
    content: "";
    width: 50%;
    height: 100%;
    left: 0;
    top: 10%;
    background-color: rgba(81, 56, 238, 0.4);
  }
  hero-section-data,p{
    font-size:25px;
  }
}
`
export default About