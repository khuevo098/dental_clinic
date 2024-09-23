import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Container } from "reactstrap";
import { FaEye } from "react-icons/fa";
import { fetchPatientBySTT, addPatient } from "../../../utils/fetchFromAPI";
import "../../../styles/PatientDetail.scss";


const PatientDetail = () => {
  const { idpatient } = useParams();
  const [patient, setPatient] = useState({});
  //Biến dùng để thay đổi dữ liệu các trường
  const [editableFields, setEditableFields] = useState({
    patientName: "",
    patientGender: "",
    patientMail: "",
    patientPhone: "",
    patientBirth: "",
    patientContraindication:"",
    patientAllergy:""
  });
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetchPatientBySTT(idpatient);
        const patientData = response?.patient?.[0] || {};
        
        setPatient(patientData);  // Fix here
  
        setEditableFields({
          patientName: patientData.patientName || "",
          patientGender: patientData.patientGender || "",
          patientMail: patientData.patientMail || "",
          patientPhone: patientData.patientPhone || "",
          patientBirth: patientData.patientBirth || "",
          patientContraindication: patientData.patientContraindication || "",
          patientAllergy: patientData.patientAllergy || "",
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
        setPatient({}); // Set an empty object in case of an error
      }
    };
  
    if (idpatient) {
      fetchPatientData();
    }
  }, [idpatient]);

  const handleInputChange = (field, value) => {
    setEditableFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      let patientID = "BN" + idpatient;
      const dataToSend = {
        patientSTT: idpatient,
        patientName: editableFields.patientName,
        patientGender: editableFields.patientGender,
        patientMail: editableFields.patientMail,
        patientPhone: editableFields.patientPhone,
        patientBirth: editableFields.patientBirth,
        patientContraindication: editableFields.patientContraindication,
        patientAllergy: editableFields.patientAllergy,
        patientID: patientID,
      };
      // Gửi dữ liệu lên server
      const response = await addPatient(dataToSend);
      
      alert(response.message);
    } catch (error) {
      // Handle any unexpected errors
      console.error("Lỗi", error.message);
    }
  };
  // table chứa lịch sửu khám
  const title_medical_history = [
    { Header: "STT" },
    { Header: "Ngày khám" },
    { Header: "Chuẩn đoán" },
    { Header: "Đơn thuốc" },
  ];

  const medial_history = [
    {
      date: "10/12/2021",
      diagnostic: "Cận thị",
    },
    {
      date: "10/12/2021",
      diagnostic: "Cận thị",
    },
    {
      date: "10/12/2021",
      diagnostic: "Cận thị",
    },
    {
      date: "10/12/2021",
      diagnostic: "Cận thị",
    },
  ];
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back one step in the history stack
  };

  const currentDate = new Date();

  // Biến đổi ngày thành chuỗi hiển thị
  const formattedDate = currentDate.toLocaleDateString();
  const idmake = formattedDate.replace(/\//g, "-");
  const patientCode = 'BN'+ idpatient
  return (
    <>
      <Container className="detail">
        <h1 className="idpatient">#{patientCode||idpatient}</h1>

        <div className="patient">
          <label>Thông tin bệnh nhân</label>
          <div className="patient-information">
            <Row>
              <Col>
                <Row>
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    value={editableFields.patientName}
                    onChange={(e) =>
                      handleInputChange("patientName", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <label>Giới tính</label>
                  <input
                    type="text"
                    value={editableFields.patientGender}
                    onChange={(e) =>
                      handleInputChange("patientGender", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <label>Email</label>
                  <input
                    type="text"
                    value={editableFields.patientMail}
                    onChange={(e) =>
                      handleInputChange("patientMail", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <label>SĐT</label>
                  <input
                    type="text"
                    value={editableFields.patientPhone}
                    onChange={(e) =>
                      handleInputChange("patientPhone", e.target.value)
                    }
                  />
                </Row>
              </Col>
              <Col>
                <Row>
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    id="Ngày"
                    value={editableFields.patientBirth}
                    onChange={(e) =>
                      handleInputChange("patientBirth", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <label>Chống chỉ định</label>
                  <input
                    type="text"
                    value={editableFields.patientContraindication}
                    onChange={(e) =>
                      handleInputChange("patientContraindication", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <label>Dị ứng</label>
                  <input
                    type="text"
                    value={editableFields.patientAllergy}
                    onChange={(e) =>
                      handleInputChange("patientAllergy", e.target.value)
                    }
                  />
                </Row>
                <Row>
                  <Button className="btn primary__btn create-prescription" onClick={handleSubmit}>
                    <Link to={`./${idmake}`}>Tạo đơn thuốc</Link>
                  </Button>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="patient-history">
            <label>Lịch sử khám</label>
            <div className="patient-history-table">
              <table>
                <thead>
                  <tr>
                    <td>STT</td>
                    <td>Ngày khám</td>
                    <td>Chuẩn đoán</td>
                    <td>Đơn thuốc</td>
                  </tr>
                </thead>
                <tbody>
                  {medial_history.map((t, index) => {
                    let id = t.date.replace(/\//g, "-");
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{t.date}</td>
                        <td>{t.diagnostic}</td>
                        <td>
                          <Link to={`./${id}`}>
                            <FaEye />
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
              <Col>
                <Button
                  className="btn primary__btn save"
                  onClick={handleSubmit}
                >
                  {" "}
                  Lưu thay đổi
                </Button>
              </Col>
              <Col>
                <Button className="btn outline__btn back " onClick={goBack}>
                  Thoát
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};
export default PatientDetail;