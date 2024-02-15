import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar'


const Header = () => {
  return (
    <MainHeader>
        <NavLink to="/">
          <img src="/images/mm.png" alt="my logo" />
        </NavLink>
        <Navbar/>
    </MainHeader>
  )
}

export default Header

  
const MainHeader = styled.header` 
 height: 10rem;
 background-color:${({theme})=>theme.colors.mycolor};
 display:flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
.logo{
 height: 2rem;
 
}

`;