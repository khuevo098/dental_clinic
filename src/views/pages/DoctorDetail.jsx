import React from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import img from '../../assets/images/doctor/1.png'
const DoctorDetail = () => {
    
    const {id} = useParams();

    // call API load a doctor have id  = id 
    //const doctors = doctorsData.find(doctors => doctors.id ===id)

    //const {name} = doctors


    return(
        <>
    
        <Container>
            <Row>
                <Col>
                <img src={img} alt="" />
                </Col>
                <Col>
                <div className="infor">
                    <h4>THÔNG TIN BÁC SĨ</h4>
                    <h5><span>Họ tên: </span> </h5>
                    <h5><span>Trình độ: </span></h5>
                    <h5><span>Email: </span></h5>
                    <h5><span>Số năm kinh nghiệm: </span></h5>
                </div>

                <Row>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, optio? Soluta vero porro pariatur possimus. Eveniet libero dicta dignissimos, ullam incidunt, ipsum quibusdam tempore omnis architecto quos voluptatem nesciunt. Itaque.</p>
                </Row>
                </Col>
            </Row>
            
        </Container>
        </>
    )
}
export default DoctorDetail