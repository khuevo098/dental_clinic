import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";

import { IoSearch } from "react-icons/io5";
import { fetchPatientsPharmacist } from "../../../utils/fetchFromAPI";

import "../../../styles/PatientListDoctor.scss";

const PatientListPharmacist = () => {
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      const patientsData = await fetchPatientsPharmacist();
      setdata(patientsData.patientsList);
    } catch (error) {
      console.error("Error fetching patients data:", error);
    }
  };

  const title = [
    { Header: "ID", accessor: "patientID" },
    { Header: "Họ Tên", accessor: "patientName" },
    { Header: "Giới tính", accessor: "patientGender" },
    { Header: "Ngày sinh", accessor: "patientDOB" },
    { Header: "Email", accessor: "patientMail" },
    { Header: "Số điện thoai", accessor: "patientPhone" },
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
            {title.map((t) => {
              return <td key={t}>{t.Header}</td>;
            })}
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d.patientID}>
                  <td>{d.patientID}</td>
                  <td>{d.patientName}</td>
                  <td>{d.patientGender}</td>
                  <td>{d.patientDOB}</td>
                  <td>{d.patientMail}</td>
                  <td>{d.patientPhone}</td>

                  <td>
                    <Link to={`./${d.patientID}`}>
                      <FaPen className="icon-fix" />
                    </Link>
                  </td>
                  <td>
                    <input type="checkbox" className="mark-done" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default PatientListPharmacist;
