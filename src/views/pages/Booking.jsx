import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import img1 from "../../assets/images/1.png";
import { NavLink } from "react-router-dom";
import DoctorCard from "../../components/doctorCard/doctorCard";
import "../../styles/Booking.scss";
import { fetchDoctorsIDName } from "../../utils/fetchFromAPI";
import { FaExclamationTriangle } from "react-icons/fa";
// result list query from database

const nav__item__1 = [
  {
    display: "Bất kì ngày nào",
  },
  {
    display: "Ngày mai",
  },
  {
    display: "7 Ngày kế tiếp",
  },
  {
    display: "Cuối tuần",
  },
];
const nav__item__2 = [
  {
    display: "Đầu giờ",
  },
  {
    display: "Ngoài giờ",
  },
];
const nav__item__3 = [
  {
    display: "Tư vấn trực tiếp",
  },
  {
    display: "Tư vấn từ xa",
  },
];
const Booking = () => {
  const [doctors, setDoctors] = useState([]);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsData = await fetchDoctorsIDName();
        setDoctors(doctorsData.doctorsList); // Assuming your API response has a 'doctorsList' property
        // if (doctors.length === 0) {
        //   console.log ("hihi");
        //   setIsActive(true);
        // }
      } catch (error) {
        console.error("Error fetching doctors data:", error);
        // if (doctors.length === 0) {
        //   console.log ("hihi");
        //   setIsActive(true);
        // }
      }
    };
    
    fetchData();
  }, []);
  console.log(doctors);
  
  return (
    <>
      <Container>
        <Row>
          <Col lg="9" sm="12">
            <Row>
              <Col className="section_doctor">
                <div className="search-bar d-flex align-items-center">
                  <input type="text" placeholder="Search.." />
                </div>
                <div className="doctor-list">
                {/* {isActive && <p  className = "warning"> <FaExclamationTriangle />      Không tìm thấy thông tin bác sĩ</p>} */}
                  {doctors.map((doctor_index) => (
                    <DoctorCard doctor={doctor_index} />
                  ))}
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg="3" sm="12">
            <Row>
              <div className="section_query">
                <h3>CÒN TRỐNG</h3>
                <Row>
                  {nav__item__1.map((item, index) => (
                    <li className="nav__item" key={index}>
                      {/* Khi hover vào item nào trên navbar
                                thì active màu cho item đó */}
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </Row>

                <h3>GIỜ ĐẶC BIỆT</h3>
                <Row>
                  {nav__item__2.map((item, index) => (
                    <li className="nav__item" key={index}>
                      {/* Khi hover vào item nào trên navbar
                                thì active màu cho item đó */}
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </Row>

                <h3>LOẠI HÌNH KHÁM</h3>
                <Row>
                  {nav__item__3.map((item, index) => (
                    <li className="nav__item" key={index}>
                      {/* Khi hover vào item nào trên navbar
                                thì active màu cho item đó */}
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Booking;
