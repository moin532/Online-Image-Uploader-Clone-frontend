import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { CgMenu, CgCloseR } from "react-icons/cg";
import { Button } from "../styles/StyleButton";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [openmenu, setopenmenu] = useState(false);

  const { isAuthenticated} = useSelector(
    (state) => state.user
  );
  
  const logout=()=>{
    localStorage.removeItem("userDataa");
    localStorage.clear()
    window.location.reload();
  }
  return (
    <div>
      <Nav>
        <div className={openmenu ? "menuIcon active" : "menuIcon"}>
          <div className="navbar">
            <ul className="navbar-lists">
              <li>
                <NavLink
                  to="/"
                  className="navbar-link home-link"
                  onClick={() => setopenmenu(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="navbar-link home-link"
                  onClick={() => setopenmenu(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/images"
                  className="navbar-link "
                  onClick={() => setopenmenu(false)}
                >
                  images
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="navbar-link "
                  onClick={() => setopenmenu(false)}
                >
                  Contact
                </NavLink>
              </li>

              {isAuthenticated? (
                <li>
                  <NavLink to="/login" onClick={() => setopenmenu(false)} >
                    <Button onClick={logout}>Log out</Button>
                  </NavLink>
                </li>
              ) : (
                // If not authenticated, show login button
                <li>
                  <NavLink to="/login" onClick={() => setopenmenu(false)}>
                    <Button>Log In</Button>
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink to="" className="navbar-link "></NavLink>
              </li>
            </ul>
            <div className="mobile-navbar-btn">
              <CgMenu
                name="menu-outline"
                className="mobile-nav-icon"
                onClick={() => setopenmenu(true)}
              />
              <CgCloseR
                name="close-outline"
                className="close-outline mobile-nav-icon"
                onClick={() => setopenmenu(false)}
              />
            </div>
          </div>
        </div>
      </Nav>
    </div>
  );
};

const Nav = styled.nav`
  .navbar-lists {
    display: flex;
    gap: 4.8rem;
    align-items: center;

    .navbar-link {
      &:link,
      &:visited {
        display: inline-block;
        text-decoration: none;
        font-size: 1.8rem;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.neon};
        transition: color 0.3s linear;
        text-shadow:
      /* 0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #0fa,
      0 0 82px #0fa,
      0 0 92px #0fa,
      0 0 102px #0fa,
      0 0 151px #0fa; */ rgb(
              0 0 0
            )
            0px 0px 10px,
          rgb(243 243 247) 0px 0px 20px, rgb(216 113 42) 0px 0px 30px;
      }
      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.helper};
      }
    }
  }
  .mobile-navbar-btn {
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: ${({ theme }) => theme.colors.black};
  }
  .mobile-nav-icon[name="close-outline"] {
    display: none;
  }
  .close-outline {
    display: none;
  }
  .cart-trolley--link {
    position: relative;

    .cart-trolley {
      position: relative;
      font-size: 3.2rem;
    }
    .cart-total--item {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 70%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }
  .user-login--name {
    text-transform: capitalize;
  }
  .user-logout,
  .user-login {
    font-size: 1.4rem;
    padding: 0.8rem 1.4rem;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .mobile-navbar-btn {
      display: inline-block;
      z-index: 9999;
      border: ${({ theme }) => theme.colors.black};

      .mobile-nav-icon {
        font-size: 4.2rem;
        color: ${({ theme }) => theme.colors.black};
      }
    }

    .active .mobile-nav-icon {
      display: none;
      font-size: 4.2rem;
      position: absolute;
      top: 30%;
      right: 10%;
      color: ${({ theme }) => theme.colors.black};
      z-index: 9999;
    }
    .active .close-outline {
      display: inline-block;
    }
    .navbar-lists {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      visibility: hidden;
      opacity: 0;
      transform: translateX(100%);
      transition: all 1s linear;
    }
    .active .navbar-lists {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
      z-index: 999;
      transform-origin: right;
      transition: all 1s linear;

      .navbar-link {
        font-size: 6.2rem;
      }
    }
    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 5.2rem;
      }

      .cart-total--item {
        width: 4.2rem;
        height: 4.2rem;
        font-size: 2rem;
      }
    }

    .user-logout,
    .user-login {
      font-size: 2rem;
      padding: 0.8rem 1.4rem;
    }
  }
`;
export default Navbar;
