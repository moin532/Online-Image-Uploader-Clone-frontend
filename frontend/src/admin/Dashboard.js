import React ,{useEffect}from "react";
import Slidebar from "./Slidebar";
import styled from "styled-components";
import { getALLAdminImages } from "../actions/imageAction";
import { AdminUSer } from "../actions/UserAction";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {Doughnut, Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.user
  );
  
 
  const { images } = useSelector((state) => state.images);
  const { users } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getALLAdminImages());
    // dispatch(AdminUSer());
  }, [dispatch]);
  
  const imagess = images && images.length
  const lineState = {
    labels: ["Initial IMAGES", "BEFORE Earned"],
    datasets: [
      {
        label: "TOTAL IMAGES",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["#000"],   
        data: [0,imagess],
      },
    ],
  };

  const doughnutState = {
    labels: ["Initial IMAGES", "BEFORE IMAGES"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [imagess],
      },
    ],
  };



  useEffect(() => {
    
    if (user.role === "admin") {
      navigate('/admin/dashboard');
    }else{
      navigate('/');
    }

  }, [navigate,user]);
  return (
  <>
    <Wrapper>
      <div className="text">
        <h1>MM - Photouploader</h1>
      </div>
      <div className="dashboard">
        {/* <MetadaData title="Dashboard - Admin Panel" /> */}

        <Slidebar />

        <div className="dashboardContainer">
          <h2>Dashboard</h2>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹0
              </p>
            </div>
            <div className="dashboardSummaryBox2">
      
              <Link to="/admin/images">
                <p>Images</p>
                <p>{images && images.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>8</p>
              </Link>
            </div>
          </div>

       <h2>Graphs:</h2>
          <div className="graphs">
            <div className="lineChart">
              <Line data={lineState} />
              </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
     
    </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .text,
  h1 {
    margin: 51px 20px 25px 27px;
    padding-left: 138px;
    padding-bottom: -24px;
    color: #c5f094;
    justify-content: center;
    text-align: center;
    margin-bottom: -86px;
    font-family: fangsong;
    text-decoration: underline;
  }
  .dashboard {
    width: 100vw;
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
  }

  .dashboardContainer {
    border-left: 1px solid rgba(0, 0, 0, 0.13);
    /* padding: 3rem 0; */
    padding-left: 35vh;
    padding: 25rem 7px 0rem 4vh;
  }

  .dashboardContainer > h1 {
    color: rgba(0, 0, 0, 0.733);
    font: 300 2rem "Roboto";
    text-align: center;
    width: 50%;
    padding: 1.5rem;
    margin: auto;
  }

  .dashboardSummary {
    margin: 2rem 0;
  }

  .dashboardSummary > div {
    display: flex;
    justify-content: center;
  }
  .dashboardSummary > div > p {
    background-color: rgba(70, 117, 218, 0.932);
    color: white;
    font: 300 1.3rem "Roboto";
    text-align: center;
    padding: 1.5rem;
    width: 100%;
    margin: 0 2rem;
  }
  .dashboardSummaryBox2 > a {
    color: rgb(0, 0, 0);
    font: 300 2rem "Roboto";
    text-align: center;
    background-color: rgb(149 192 99);
    text-decoration: none;
    padding: 1.5rem;
    width: 10vmax;
    height: 10vmax;
    margin: 2rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .dashboardSummaryBox2 > a:first-child {
    background-color: rgb(255, 110, 110);
    color: rgb(255, 255, 255);
  }

  .dashboardSummaryBox2 > a:last-child {
    background-color: rgb(89 150 78);
    color: rgb(255, 255, 255);
  }

  .lineChart {
    background-color: antiquewhite;
    width: 80%;
    margin-top: 20px;

  }

  .doughnutChart {
    background-color: antiquewhite;
    width: 80%;
    margin-top: 20px;
    height:50vh;

  }

  @media screen and (max-width: 600px) {
    .dashboard {
      grid-template-columns: 1fr;
    }

    .dashboardContainer {
      border-left: none;
      padding-left: 0px;
    }

    .graphs {
      margin-left: 74px;
      padding-top: 30px;
      width: 32vmax;
    }

    .doughnutChart {
      margin-top: 30px;
    }

    .dashboardSummary > div > p {
      margin: 0;
    }

    .dashboardSummaryBox2 > a {
      padding: 0.5rem;
      margin: 1rem;
      font: 300 0.9rem "Roboto";
    }
  }
`;
export default Dashboard;
