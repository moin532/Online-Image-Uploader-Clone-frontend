import React, { useEffect } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { Button } from "../styles/StyleButton";
import { Fragment } from "react";
import Slidebar from "./Slidebar";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { AdminDeleteUser, AdminUSer,clearErrors } from "../actions/UserAction";
import { ADMIN_DELETE_USER_RESET } from "../constants/UserConstant";


const AdminUser = () => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { users,error } = useSelector(
        (state) => state.user
      );

    const {isDeleted, error:dltuser} = useSelector((state)=>state.dltuser);

    
   useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch(clearErrors());
      };

    if(dltuser){
      toast.error(dltuser);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Image Deleted Succesfully");
      Navigate("/admin/dashboard");
      dispatch({ type: ADMIN_DELETE_USER_RESET });
    }
    
    dispatch(AdminUSer());
   }, [dltuser,dispatch,isDeleted,error,toast,Navigate]);

   const deleteUserHandler = (id)=>{
    dispatch(AdminDeleteUser(id));
   }
    
  const columns = [
    { name: "id", selector: (row) => row.id, sortable: true },

    { name: "name", selector: (row) => row.name, sortable: true },
    { name: "created", selector: (row) => row.created, sortable: true },

    { name: "email", selector: (row) => row.email, sortable: true },

    {
      name: "Delete Button",
      button: true,
      cell: (params) => (
        <Button
          onClick={() => deleteUserHandler(params.id, "id")}
        >
          <MdDeleteSweep />
        </Button>
      ),
    },

  ];


  const data = []

  users &&
    users.forEach((img) => {
      data.push({
        id: img._id,
        name: img.name,
        created: img.createdAt,
         email: img.email,
      });
    });
  return (
   <Wrapper>
 <Fragment>
        <div className="dashboard">
          <Slidebar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL ADMIN IMAGES</h1>
            <DataTable
              columns={columns}
              data={data}
              highlightOnHover
              pointerOnHover
              pagination
            />
          </div>
        </div>
      </Fragment>
   </Wrapper>
  )
}

const Wrapper = styled.section`
  .productListContainer {
    margin-left: 36vh;
    margin-top: -102vh;
    width: 80%;
    box-sizing: border-box;
    background-color: rgb(255 255 255);
    border-left: 1px solid black;
    flex-direction: column;
    height: 100vh;
  }

  #productListHeading {
    font: 400 2rem "Roboto";
    padding: 0.5vmax;
    box-sizing: border-box;
    color: black;
    transition: all 0.5s;
    margin: 2rem;
    text-align: center;
  }

  .productListTable {
    background-color: lightyellow;
    border: none !important;
  }

  .productListTable div {
    font: 300 1vmax "Roboto";
    color: rgba(0, 0, 0, 0.678);
    border: none !important;
  }

  .productListTable a,
  .productListTable button {
    color: rgba(0, 0, 0, 0.527);
    transition: all 0.5s;
  }

  .productListTable a:hover {
    color: tomato;
  }

  .productListTable button:hover {
    color: rgb(236, 30, 30);
  }

  .MuiDataGrid-columnHeader div {
    color: black;
    font-size: 25px;
  }

  @media screen and (max-width: 600px) {
    .productListTable div {
      font: 300 4vw "Roboto";
    }
  }
`;
export default AdminUser
