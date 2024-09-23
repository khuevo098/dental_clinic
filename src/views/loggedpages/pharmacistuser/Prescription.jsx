import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchPrescription } from "../../../utils/fetchFromAPI";

import "../../../styles/Prescription.scss";
const PrescriptionPharmacist = () => {
  const id = useParams();
  const doctor_id = "from database";
  const patient_id = id.idpatient;
  const date = id.idpres;
  const [prescriptionData, setPrescriptionData] = useState([]); // Cập nhật để sử dụng state

  const location = useLocation();
  const { medicalHistory, patientName } = location.state || {}; // Lấy đối tượng patient từ state

  const navigate = useNavigate();

  //console.log(doctor_id, patient_id, date);
  console.log(
    medicalHistory.TENBACSI,
    medicalHistory.TRIEUCHUNG,
    medicalHistory.CHANDOAN
  );
  const convertDateFormat = (dateString) => {
    // Phân tách chuỗi theo dấu gạch ngang
    const parts = dateString.split("-");

    // Đảo vị trí các phần tử và nối lại
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const data = await fetchPrescription(
          patient_id,
          convertDateFormat(date)
        );
        setPrescriptionData(data.prescriptionData); // Cập nhật state với dữ liệu đơn thuốc
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptionData();
  }, [patient_id, date]);

  const goBack = () => {
    navigate(-1); // Go back one step in the history stack
  };
  return (
    <>
      <Container className="detail">
        <h2>{date}</h2>
        <Row>
          <div className="form">
            <div className="form-doctorname">
              <label>Bác sĩ khám</label>
              <input type="text" value={medicalHistory.TENBACSI} />
            </div>
            <div className="group-form">
              <label>Triệu chứng</label>
              <input type="text" value={medicalHistory.TRIEUCHUNG} />
            </div>
            <div className="group-form">
              <label>Chẩn đoán</label>
              <input type="text" value={medicalHistory.CHANDOAN} />
            </div>
          </div>
        </Row>

        <h3>Danh sách thuốc</h3>
        <div className="table">
          <Row>
            {prescriptionData.map((field, index) => (
              <div key={index} className="input-pair">
                <label>Tên thuốc</label>
                <input
                  type="text"
                  className="name-medicince"
                  value={field.TENTHUOC}
                  readOnly
                />
                <label>Số lượng</label>
                <input
                  type="number"
                  className="quantity"
                  value={field.SOLUONG}
                  readOnly
                />
              </div>
            ))}
          </Row>
        </div>
        <div className="button">
          <Row>
            <Col>
              <Button className="btn primary__btn save">
                <Link
                  to="./invoice"
                  state={{ prescriptionData: prescriptionData, patientName: patientName }}
                >
                  Thanh toán
                </Link>
              </Button>
            </Col>
            <Col>
              <Button className="btn outline__btn back " onClick={goBack}>
                Thoát
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
export default PrescriptionPharmacist;