import React, { useState,useEffect } from "react";
import styled from "styled-components";
import {useDispatch , useSelector } from "react-redux";
import { UpdatePassword ,clearErrors} from "../actions/UserAction";
import { UPDATE_PASSWORD_RESET } from "../constants/UserConstant";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';


const PasswordUpdate = () => {

  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isUpdated,loading ,error} = useSelector((state) => state.updPassword );
  const { user } = useSelector((state) => state.user);


  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const id = user._id

const updatePasswordSubmit =(e)=>{

    e.preventDefault();

    const Myform = new FormData();
    Myform.set("oldPassword",oldPassword);
    Myform.set("newPassword",newpassword);
    Myform.set("confirmPassword",confirmpassword);
    Myform.set("id",id);

    Dispatch(UpdatePassword(Myform));
}  

useEffect(() => {
  if (error) {
   toast.error(error);
    Dispatch(clearErrors());
  }

  if (isUpdated) {
    toast.success("Password Updated Successfully");

     Navigate("/account");
    Dispatch({
      type: UPDATE_PASSWORD_RESET,
    });
  }
}, [Dispatch, error, Navigate ,isUpdated]);

  return (
    <Wrapper>
      <div className="new-form">
        <form onSubmit={updatePasswordSubmit}>
          <div className="text-field">
            <input
              type="text"
              placeholder=" Enter a old Password"
              className="text-main"
              onChange={(e) => setOldPassword(e.target.value)}
              value={oldPassword}
            />
             
            <input
              type="text"
              placeholder="Enter a new Password"
              className="text"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newpassword}
            />
            <input
              type="password"
              placeholder="Confirm  Password"
              className="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmpassword}
            />
          </div>
          <input type="submit" value="Submit" className="updatePasswordBtn" />
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .new-form {
    justify-content: center;
    align-items: center;
    display: flex;
    min-height: 100vh;
  }

  .text-field {
    display: grid;
    justify-content: center;
    /* border :120px solid whitesmoke; */
  }

  input {
    margin: 15px;
    font-size: 23px;
    width: 59vh;
  }

  .updatePasswordBtn {
  border: none;
  color: white;
  font: 300 0.9vmax ;
  width: 125%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  border-radius: 2px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
}

.updatePasswordBtn:hover {
  background-color: rgb(179, 66, 46);
}
`;
export default PasswordUpdate;
