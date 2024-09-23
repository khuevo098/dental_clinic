import React from "react";
import { Row, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "../../../styles/Invoice.scss";
const Invoice = () => {
  const id = useParams();
  console.log(id);
  const doctor_id = "from database";
  const patient_id = id.idpatient;
  const date = id.idpres;
  const currentDate = new Date();

  const location = useLocation();
  const { prescriptionData, patientName } = location.state || {}; // Lấy đối tượng patient từ state


  
  // console.log(prescriptionData);
  // const data = [
  //   {
  //     name: "para",
  //     quantity: 2,
  //     price: 1000,
  //   },
  //   {
  //     name: "ahihi",
  //     quantity: 3,
  //     price: 2000,
  //   },
  //   {
  //     name: "para1",
  //     quantity: 2,
  //     price: 1000,
  //   },
  //   {
  //     name: "ahihi2",
  //     quantity: 3,
  //     price: 2000,
  //   },
  // ];
  const [inputFields] = useState(prescriptionData); // Danh sách trường nhập


  const sum = prescriptionData.reduce((total, item) => {
    return total + (item.SOLUONG * item.GIABAN);
  }, 100000); 

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back one step in the history stack
  };
  return (
    <>
      <h1 className="hoadon">Hóa đơn</h1>
      <div className="detail">
        <Row className="form">
          <div className="group-form">
            <label>Họ tên</label>
            <input value={patientName} readOnly></input>
          </div>

          <div className="group-form">
            <label>Chi phí khám</label>
            <input value={"100000"} readOnly />
          </div>
        </Row>
        <div>
          <h3>Đơn thuốc</h3>
          <div className="table">
            <Row>
              {inputFields.map((field, index) => (
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

                  <label>Thành tiền</label>
                  <input
                    type="number"
                    className="price"
                    value={field.GIABAN}
                    readOnly
                  />
                </div>
              ))}
            </Row>
          </div>
          <h3>Tổng tiền: {sum} VND</h3>
        </div>

        <Button className="outline__btn back" onClick={goBack}>
          Thoát
        </Button>
      </div>
    </>
  );
};
export default Invoice;