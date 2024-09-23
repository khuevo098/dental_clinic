import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Container } from "reactstrap";
import {
  fetchMedicalHistoryPharmacist,
  fetchPatientDetailInformation,
} from "../../../utils/fetchFromAPI";
import "../../../styles/PatientDetail.scss";

const PatientDetailPharmacist = () => {
  const { idpatient } = useParams();
  const [patient, setPatient] = useState(null); // Khởi tạo state để lưu thông tin bệnh nhân
  const [medicalHistory, setMedicalHistory] = useState([]); // Thêm state để lưu trữ lịch sử điều trị

  const navigate = useNavigate();

  // get medical history from database
  // get information from database where patient's id = id patient
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const data_patient = await fetchPatientDetailInformation(idpatient); // Gọi API
        setPatient(data_patient.patientInformation); // Cập nhật state với dữ liệu trả về
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    const fetchMedicalHistoryData = async () => {
      try {
        const data_history = await fetchMedicalHistoryPharmacist(idpatient); // Gọi API lấy lịch sử điều trị
        setMedicalHistory(data_history.medicalHistories); // Cập nhật state với dữ liệu lịch sử điều trị
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };
    fetchPatientDetails();
    fetchMedicalHistoryData(); // Gọi hàm lấy lịch sử điều trị
  }, [idpatient]);

  //   const patientData = patient
  //     ? {
  //         name: patient.HOTEN_BN,
  //         gender: patient.GIOITINH,
  //         birth: patient.NGAYSINH,
  //         email: patient.EMAIL_BN,
  //         phone: patient.SDT_BN,
  //         contraindicated: "Chưa có",
  //         allergy: "Chưa có",
  //       }
  //     : null;

  const patientData = {
    name: patient?.[0].HOTEN_BN,
    gender: patient?.[0].GIOITINH,
    birth: patient?.[0].NGAYSINH,
    email: patient?.[0].EMAIL_BN,
    phone: patient?.[0].SDT_BN,
    contraindicated: patient?.[0].CHONGCHIDINH,
    allergy: patient?.[0].DIUNG,
  };

  // table chứa lịch sử khám
  const title_medical_history = [
    { Header: "STT" },
    { Header: "Ngày khám" },
    { Header: "Chẩn đoán" },
    { Header: "Trạng thái thanh toán" },
    { Header: "Đơn thuốc" },
  ];

  //const medical_history = medicalHistory;

  const goBack = () => {
    navigate(-1); // Go back one step in the history stack
  };
  const currentDate = new Date();

  // Biến đổi ngày thành chuỗi hiển thị
  const formattedDate = currentDate.toLocaleDateString();
  //const idmake = formattedDate.replace(/\//g, "-");
  return (
    <>
      {patientData ? (
        <Container className="detail">
          <h1 className="idpatient">#{idpatient}</h1>

          <div className="patient">
            <label>Thông tin bệnh nhân</label>
            <div className="patient-information">
              <Row className="patient-information-detail">
                <Col>
                  <Row className="patient-information-detail-group">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      value={patientData.name}
                      readOnly
                    ></input>
                  </Row>
                  <Row className="patient-information-detail-group">
                    <label>Giới tính</label>
                    <input
                      type="text"
                      value={patientData.gender}
                      readOnly
                    ></input>
                  </Row>
                  <Row className="patient-information-detail-group">
                    <label>Email</label>
                    <input
                      type="text"
                      value={patientData.email}
                      readOnly
                    ></input>
                  </Row>
                  <Row className="patient-information-detail-group">
                    <label>SĐT</label>
                    <input
                      type="text"
                      value={patientData.phone}
                      readOnly
                    ></input>
                  </Row>
                </Col>
                <Col>
                  <Row className="patient-information-detail-group">
                    <label>Ngày sinh</label>
                    <input
                      type="text"
                      value={patientData.birth}
                      readOnly
                    ></input>
                  </Row>
                  <Row className="patient-information-detail-group">
                    <label>Chống chỉ định</label>
                    <input
                      type="text"
                      value={patientData.contraindicated}
                      readOnly
                      // disabled={patient.contraindicated !== ''}
                    ></input>
                  </Row>
                  <Row className="patient-information-detail-group">
                    <label>Dị ứng</label>
                    <input
                      type="text"
                      value={patientData.allergy}
                      readOnly
                    ></input>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="patient-history">
              <label>Lịch sử khám</label>
              <div className="patient-history-table">
                <table>
                  <thead>
                    {title_medical_history.map((t, index) => {
                      return <td key={index}>{t.Header}</td>;
                    })}
                  </thead>
                  <tbody>
                    {medicalHistory.map((record, index) => {
                      let id = record.NGAYDIEUTRI
                        ? record.NGAYDIEUTRI.replace(/\//g, "-")
                        : "không xác định";
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{record.NGAYDIEUTRI}</td>
                          <td>{record.CHANDOAN}</td>
                          <td>{record.TRANGTHAITHANHTOAN}</td>
                          <td>
                            <Link
                              to={`./${id}`}
                              state={{
                                medicalHistory: record,
                                patientName: patientData.name,
                              }}
                            >
                              Xem đơn thuốc
                            </Link>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="button">
              <Row>
                <Button className="btn outline__btn back " onClick={goBack}>
                  Thoát
                </Button>
              </Row>
            </div>
          </div>
        </Container>
      ) : (
        <div>Loading...</div> // Hiển thị thông báo tải hoặc spinner
      )}
    </>
  );
};
export default PatientDetailPharmacist;