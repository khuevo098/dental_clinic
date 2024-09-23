import React from "react";
import { Card, Col, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './doctorCard.scss'
const DoctorCard = ({doctor}) => {
    const { hashtag, name, img, specialty} = doctor;
    const data = hashtag +' '+ name
    return (
    <>
    <div className="doctor-card">
        <Card>
            <Row>
                <Col lg="3" sm="12">
                    <img src={img} className='doctor-card-img' alt='' />
                </Col>
                <Col lg='9' sm='12'>
                <h1 className="doctor-card-name">
                    <Link to={`/doctor/${hashtag}`}>{name}</Link>
                </h1>
                <h2 className="doctor-card-specialty ">{specialty}</h2>
                <ul className="list-group list-group-horizontal-sm">
                    <li className="list-group-item active">Đặt lịch khám</li>
                    <li className="list-group-item">Dành cho người lơn</li>
                    <li className="list-group-item">Dành cho trẻ em</li>
                </ul>
                </Col>

            </Row>
            <Row >
                <h4>Chi phí trong khoảng 30.000 ~ 150.000</h4>
            </Row>
            <Row>
                <Col lg = '8' sm='12'>
                <h4 className="doctor-card-detail">
                    <Link to={`/doctor/${hashtag}`}>Thông tin chi tiết</Link>
                </h4>
                </Col>
                <Col lg ='4' sm ='12'>
                    <Button className="btn primary__btn">
                        <Link to={`/booking/${data}`}>Đặt lịch ngay</Link>
                    </Button>
                </Col>
                
            </Row>
        </Card>
    </div>

    </>
    );
};
export default DoctorCard