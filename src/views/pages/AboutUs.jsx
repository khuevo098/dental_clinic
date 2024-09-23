import React from "react";
import Slider from 'react-slick'
import {device} from '../../assets/data/device'
import { doctors } from "../../assets/data/doctor";
import '../../styles/AboutUs.scss'
import { Col, Row, Container } from "reactstrap";
const AboutUs = () => {
    const settings1 = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 4000,
        cssEase: "linear"
      };
      const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 4000,
        cssEase: "linear"
      };
    return (
        <>
        <section className="AboutUs">
            <div className="blur">
            <h1 className="h1">Về chúng tôi</h1>
            <p className="p">Phòng khám mắt Teyvat tự hào có đội ngũ chuyên gia, y bác sĩ giỏi và giàu kinh nghiệm về nhãn khoa và khúc xạ nhãn khoa. Hơn thế nữa, trong những năm hoạt động, Phòng khám Mắt Teyvat đã khám và điều trị cho hàng nghìn lượt bệnh nhân, tạo dựng được niềm tin của hàng triệu người khi khám bệnh về mắt. Chính vì vậy Phòng Khám Mắt Teyvat là sự lựa chọn hàng đầu cho bạn và gia đình bạn!</p>
            </div>
        </section>
        <section className="our__doctors">
            <h2 className="h2">Đội ngũ bác sĩ</h2>
            <Container>

           
            <Slider {...settings1}>
                    {
                        doctors.map(({image, name}, index)=>{
                            return (
                                <div className='doctor-item' key={index}>
                                    
                                    <img src={image} className='doctor-item-img' alt='' />
                                    <h4 className='doctor-item-title'>{name}</h4>
          
                                </div>
                            )
                        }

                        )
                        
                    }
                </Slider>
            </Container>
        </section>
        <section className="our_devices">
            
            
            <Container>
                <Row>
            <Col lg="4" md = "12">
                <h2 className="h2">Trang thiết bị hiện đại</h2>
                <p>Phòng khám mắt Teyvat đầu tư đồng bộ về cơ sở vật chất, trang thiết bị nhập khẩu từ các thương hiệu hàng đầu thế giới như: Philips (Hà Lan/Mỹ), GE Healthcare (Mỹ), Beckman Coulter (Mỹ), Roche-Hitachi (Nhật Bản), Olympus (Nhật Bản), Nihon Kohden (Nhật Bản),... đảm bảo các tiêu chí về hiệu quả, an toàn, tiết kiệm thời gian, chính xác và thân thiện với môi trường.</p>
            </Col>
            <Col lg ="1" md ="12"></Col>
            <Col lg ="7" md ="12">
                <Slider {...settings2}>
                    {
                        device.map(({image, name, description}, index)=>{
                            return (
                                <div className='device-item' key={index}>
                                    
                                    <img src={image} className='device-item-img' alt='' />
                                    <h4 className='device-item-title'>{name}</h4>
                                    
                                    <p className='device-item-description'>{description}</p>
          
                                </div>
                            )
                        }

                        )
                        
                    }
                </Slider>
            </Col>
            </Row>
            </Container>

        </section>
        </>
    )
}
export default AboutUs


const data = [{
    img:1234,
    name: 'doctor1',
    review: 'lorem'
}];