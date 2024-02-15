import React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import styled from 'styled-components';

const logout=()=>{
  localStorage.removeItem("userDataa");
  localStorage.clear()
  window.location.reload();
}


const UserOption = ({user}) => {
  

  const [open, setOpen] = React.useState(false);
  const Navigate = useNavigate();


  if (!user) {
    return <div>Loading...User Cannot Fetch </div>;
  }
  const actions = [

    // { icon: <BsFillPersonVcardFill />, name: 'Profile', func:profile},
    { icon: <BsFillPersonVcardFill />, name: "Profile", func: account },
    { icon: <FaCloudUploadAlt />, name: 'Upload' ,func:upload},
    { icon: <BiSolidLogOut />, name: 'Logout' ,func: logoutUser},

    
  
  ]

  if (user.role === "admin") {
    actions.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  
  function dashboard() {
    Navigate("/admin/dashboard");
 
  }

  function account() {
    Navigate("/account");
  }


  function upload() {
    Navigate("/upload");
  }
  function logoutUser() {
   logout();
   toast.success("Logout Successfully");
  }


  return (
    <Wrapper>
    <Box sx={{  position: 'absolute', bottom: 40, right: 16  ,flexGrow: 1 }}>
    <Backdrop open={open} style={{zIndex:"8"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        // icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"

            // src={user.avatar.url ? user.avatar.url : "/images/Profile.png"}
            alt="Profile"
          />
        
        }       
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.func}
          />
        ))}
      </SpeedDial>
  </Box>
  </Wrapper>
  )
}


const Wrapper = styled.section `

.speedDialIcon {
    width: 56px;
    height: 56px;
    border-radius: 100%;
    border-color: azure;

  }

  .speedDial {
    position: fixed;
    right: 3vmax;
    top: 7vmax;
    
  }


  
  @media screen and (max-width: 600px) {
  .speedDial{
     padding-top:70px;
  }

  .MuiSpeedDial-directionDown .MuiSpeedDial-actions {
    font-size: 22px;;
}
}
`;


export default UserOption
