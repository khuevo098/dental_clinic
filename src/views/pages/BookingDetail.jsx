import React from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "reactstrap";
import { createAppointment } from "../../utils/fetchFromAPI";
import "../../styles/BookingDetail.scss";

const BookingDetail = () => {
  const { id } = useParams();
  const idDoctor = id.split(" ", 2)[0];
  console.log(idDoctor);
  const firstSpaceIndex = id.indexOf(" ");

  const nameDoctor = id.slice(firstSpaceIndex + 1);

  const handleConfirm = async () => {
    const requiredFields = [
      "Họ_tên",
      "Địa_chỉ",
      "Số_điện_thoại",
      "Email",
      "Ngày",
    ];

    for (const field of requiredFields) {
      const element = document.getElementById(field);
      if (!element) {
        alert(`Element with ID '${field}' not found.`);
        return;
      }

      const value = element.value.trim();
      if (!value) {
        alert(`Vui lòng điền đầy đủ thông tin cho ${field.replace("_", " ")}.`);
        return;
      }

      const phoneNumberRegex = /^\d{10}$/;
      if (
        !phoneNumberRegex.test(document.getElementById("Số_điện_thoại").value)
      ) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 số.");
        return;
      }

      if (field === "Email" && !element.checkValidity()) {
        alert(
          "Email không hợp lệ. Vui lòng nhập địa chỉ email đúng định dạng."
        );
        return;
      }
    }
    try {
      // Lấy giá trị từ các trường input
      const fullname = document.getElementById("Họ_tên").value;
      const gender = document.getElementById("Giới_tính").value;
      const address = document.getElementById("Địa_chỉ").value;
      const phoneNumber = document.getElementById("Số_điện_thoại").value;
      const email = document.getElementById("Email").value;
      const date = document.getElementById("Ngày").value;
      const period = document.getElementById("Buổi").value;
      const type = document.getElementById("Dịch_vụ").value;
      const doctor = document.getElementById("Tên_bác_sĩ").value;

      // Tạo đối tượng appointmentData từ dữ liệu thu thập được
      const appointmentData = {
        name: fullname,
        gender: gender,
        address: address,
        phonenumber: phoneNumber,
        email: email,
        period: period,
        type: type,
        doctor: doctor,
        date: date,
        id: idDoctor,
      };

      // Gọi hàm gửi dữ liệu lịch hẹn lên server (thay thế bằng hàm thực tế)
      const response = await createAppointment(appointmentData);

      // Check the response for success or error
      if (response.success) {
        // Handle success (e.g., show a success message)
        alert(response.message);
      } else if (!response.success) {
        // Handle error (e.g., show an error message)
        alert(`Không thể đặt lịch hẹn: ${response.message}`);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Lỗi", error.message);
    }
  };

  return (
    <>
      <div className="booking-form">
        <Form>
          <h1>ĐẶT LỊCH KHÁM VỚI CHÚNG TÔI</h1>

          <div className="form-group">
            <label htmlFor="fullname">Họ Tên</label>
            <input type="text" placeholder="Nhập họ tên" required id="Họ_tên" />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select id="Giới_tính" required>
              <option value="Nam"> Nam</option>
              <option value="Nữ"> Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="text">Địa chỉ</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              required
              id="Địa_chỉ"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              placeholder="0123456789"
              required
              id="Số_điện_thoại"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              id="Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Thời gian dự kiến</label>
            <div className="form-group-time">
              <select id="Buổi" required>
                <option value="Sáng"> Sáng</option>
                <option value="Chiều"> Chiều</option>
              </select>

              <input type="date" id="Ngày" required></input>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="services">Dịch vụ khám</label>
            <select id="Dịch_vụ" required>
              <option value="Khám tổng quát">Khám tổng quát</option>
              <option value="Khám chuyên sâu">Khám chuyên sâu</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctorname">Tên bác sĩ</label>
            <input
              type="text"
              readOnly
              required
              id="Tên_bác_sĩ"
              value={nameDoctor}
            />
          </div>
          <Button onClick={handleConfirm} className="form-btn primary__btn">
            Xác nhận
          </Button>
        </Form>
      </div>
    </>
  );
};
export default BookingDetail;
