import React, { useEffect } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { Button } from "../styles/StyleButton";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";
import Slidebar from "./Slidebar";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams} from 'react-router-dom'
import {
  admindelte,
  clearErrors,
  getALLAdminImages,
} from "../actions/imageAction";
import { toast } from "react-toastify";
import { ADMIN_DELETE_IMAGE_RESET } from "../constants/ImageConstant";

const AdminImageList = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const Navigate = useNavigate();

  const { images, error } = useSelector((state) => state.images);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteImage
  );

  const deleteProductHandler = (id) => {
    dispatch(admindelte(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Image Deleted Succesfully");
      Navigate("/admin/dashboard");
      dispatch({ type: ADMIN_DELETE_IMAGE_RESET });
    }
    dispatch(getALLAdminImages());
  }, [dispatch,toast,Navigate,dispatch,isDeleted,error]);

  const columns = [
    { name: "id", selector: (row) => row.id, sortable: true },

    { name: "name", selector: (row) => row.name, sortable: true },
    { name: "created", selector: (row) => row.created, sortable: true },

    { name: "description", selector: (row) => row.description, sortable: true },

    {
      name: "Delete Button",
      button: true,
      cell: (params) => (
        <Button
          onClick={() => deleteProductHandler(params.id, "id")}
        >
          <MdDeleteSweep />
        </Button>
      ),
    },

    {
      name: "visit",
      selector: "visit.length",
      maxWidth: "80px",
      sortable: true,
      cell: (params) => {
        return (
          <Fragment>
            <Link to={`/image/${params.id}`}>
            <BiSolidEditAlt />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const data = [];
  images &&
    images.forEach((img) => {
      data.push({
        id: img._id,
        name: img.name,
        created: img.createdAt,
        description: img.description
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
  );
};

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
export default AdminImageList;
