import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { fetchPatients } from "../../../utils/fetchFromAPI";
import "../../../styles/PatientListDoctor.scss";

const PatientListDoctor = () => {
  const [data, setData] = useState([]);
  const doctorUSERNAME = useParams().id;

  const fetchData = async () => {
    try {
      const patientsData = await fetchPatients(doctorUSERNAME);
      setData(patientsData.patientsList);
    } catch (error) {
      console.error("Error fetching patients data:", error);
    }
  };

  const title = [
    { Header: "STT", accessor: "patientSTT" }, 
    { Header: "Họ Tên", accessor: "patientName" },
    { Header: "Giới tính", accessor: "patientGender" },
    { Header: "Email", accessor: "patientMail" },
    { Header: "Số điện thoại", accessor: "patientPhone" },
    { Header: "" },
    { Header: "" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="search-bar d-flex align-items-center">
        <div className="search-bar-input">
          <IoSearch className="icon-search" />
          <input type="text" placeholder={"Search ID"} />
        </div>
      </div>
      <div className="table-patients">
        <table>
          <thead>
            <tr>
              {title.map((t, index) => (
                <td key={index}>{t.Header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.patientSTT}>
                <td>{d.patientSTT}</td>
                <td>{d.patientName}</td>
                <td>{d.patientGender}</td>
                <td>{d.patientMail}</td>
                <td>{d.patientPhone}</td>
                <td>
                  {/* Use an arrow function to avoid immediate invocation */}
                  <Link to={`./${d.patientSTT}`}>
                    <FaPen className="icon-fix" />
                  </Link>
                </td>
                <td>
                  <input type="checkbox" className="mark-done" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PatientListDoctor;
