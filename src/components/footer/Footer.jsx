import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

import { MdOutlineLocationOn } from "react-icons/md";
import {
    FaCaretRight, FaRegEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube
} from "react-icons/fa";

import "./footer.scss";

const quick__links = [
  {
    display: "Trang chủ",
    url: "#",
  },
  {
    display: "Về chúng tôi",
    url: "#",
  },
  {
    display: "Dịch vụ",
    url: "#",
  },
  {
    display: "Đặt lịch hẹn",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="9" sm="12" className="firstCol">
            <div className="logo d-flex align-items-center gap-3">
              <img src={logo} alt="" />
              <h1>Teyvat Clinic</h1>
            </div>

            <ul className="footer__contact-list mb-3">
              <li
                className="footer__contact-item d-flex flex-row gap-3 
                        align-items-center mb-2"
              >
                <MdOutlineLocationOn className="icon" />
                Linh Trung, Thu Duc, Ho Chi Minh City
              </li>

              <li
                className="footer__contact-item d-flex flex-row gap-3
                        align-items-center"
              >
                <FaRegEnvelope className="icon" />
                teyvat@gmail.com
              </li>
            </ul>
          </Col>
          <Col lg="3" md="5" sm="12" className="mb-5">
            <h4 className="footer__link-title">Menu</h4>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="item">
                  <FaCaretRight className="icon" />
                  <Link to={item.url}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md="4" lg ="4" className="mb-4">
              <h4 className="text-uppercase fw-bold">
                <Link to = {`/feedback`}>Đánh giá chúng tôi</Link> 
              </h4>

              <div className="form">
                <p>Nhận thêm thông tin về chúng tôi</p>
                {/* <label className="form-label" htmlFor="email">
                  Email address
                </label> */}
                <input type="email" className="form-control" placeholder="Email address"/>
                
              </div>
              <div className='footer__social'>
                <h3 className='footer__social-follow'>Theo dõi chúng tôi</h3>

                <div className='footer__social-links'>
                    <a href='/' className='footer__social-link'>
                        <FaFacebookF />
                    </a>

                    <a href='/' className='footer__social-link'>
                        <FaTwitter />
                    </a>

                    <a href='/' className='footer__social-link'>
                        <FaLinkedinIn />
                    </a>

                    <a href='/' className='footer__social-link'>
                        <FaYoutube />
                    </a>
                </div>
            
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
