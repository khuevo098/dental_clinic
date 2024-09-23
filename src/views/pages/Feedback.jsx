import React from "react";
import { useState } from "react";
import { Button } from "reactstrap";

import { FaStar } from "react-icons/fa";

import "../../styles/Feedback.scss";
import { writeFeedback } from "../../utils/fetchFromAPI";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Feedback = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    try {
      const name = document.getElementById("Họ_tên").value;
      const phone = document.getElementById("Số_điện_thoại").value;
      const content = document.getElementById("Nội_dung").value;

      const feedbackData = {
        name: name,
        phone: phone,
        description: content,
        estimate: currentValue,
      };

      const response = await writeFeedback(feedbackData);

      if (response.success) {
        alert(response.message);
      } else if (!response.success) {
        alert(`Đã có lỗi xảy ra, vui lòng thử lại sau: ${response.message}`);
      }
    } catch (error) {
      console.error("Lỗi", error.message);
    }
  };

  return (
    <>
      <div className="feedback">
        <h2>BẠN CẢM THẤY NHƯ THẾ NÀO ?</h2>

        <div className="feedback-form">
          <div className="feedback-form-input">
            <label htmlFor="text">Họ tên</label>
            <input className="name" required id="Họ_tên" />
          </div>
          <div className="feedback-form-input">
            <label htmlFor="text">Số điện thoại</label>
            <input className="phone number" required id="Số_điện_thoại" />
          </div>
          <div className="feedback-form-input">
            <label htmlFor="text">Cảm nhận của bạn về phòng khám</label>
            <textarea className="description" required id="Nội_dung"></textarea>
          </div>
          <div className="feedback-form-input">
            <label htmlFor="text">Mức độ hài lòng</label>
            <div>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || currentValue) > index
                        ? colors.orange
                        : colors.grey
                    }
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <Button className="primary__btn send" onClick={handleSubmit}>
            Gửi
          </Button>
        </div>
      </div>
    </>
  );
};
export default Feedback;
