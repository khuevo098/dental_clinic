import React,  { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";

import '../../styles/Home.scss'
import { Link } from "react-router-dom";

import image1 from "../../assets/images/1.png"

import { features } from "../../assets/data/features";
const Home = () => {
    const [mapContent, setMapContent] = useState('');

    useEffect(() => {
      const fetchUserLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
  
          const { latitude, longitude } = position.coords;
          const iframeSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
          setMapContent(`<iframe width="100%" height="300" src="${iframeSrc}"></iframe>`);
        } catch (error) {
          console.error('Error getting user location:', error);
          // Handle error as needed
        }
      };
  
      fetchUserLocation();
    }, []); // Empty dependency array means the effect runs once after the initial render
  
    return (
    <>
    {/* ==========intro - section ===================== */}
    <section className="intro">
        <Container>
            <Row>
                <Col lg = '6' md ='12'>
                    <div className="intro-content">
                        <h3>Chào mừng bạn đến với phòng khám Teyvat</h3>
                        <h1>
                            HỆ THỐNG Y TẾ ĐƯỢC TIN TƯỞNG NHẤT Ở VIỆT NAM
                        </h1>
                        <p>
                        Tính tỉ mỉ, chuẩn xác và hiệu quả trong thăm khám, điều trị. Nét ân cần, thấu cảm trong chăm sóc. Chúng tôi luôn tâm niệm làm tất cả những gì tốt nhất để chăm sóc cho sức khỏe đôi mắt của bạn và những người thân yêu.
                        </p>
                        <Button className="btn primary__btn d-flex gap-3">
                            <Link to = '/aboutus'>Về chúng tôi</Link>
                        </Button>
                
                        
                    </div>
                </Col>
                <Col lg = '1' md = '12'></Col>
                <Col lg = '5' md = '12'>
                    <div className="box__Image">
                        <img src = {image1} alt=""/>
                    </div>
                </Col>


                
            </Row>
            
        </Container>
    </section>


    {/* ============client section ============ */}

    <section className="client"> 
        <Container>
            <div className="client-subtitile">
                <h3>Điểm đến của các dịch vụ chăm sóc <br /> chất lượng cao</h3>
            </div>
            <div className='client-features'>
              {features.map(({img, title, description}, index) => {
                  return (
                      <div className='client-features-item' key={index}>
                          <img src={img} className='client-feature-item-img' alt='' />

                          <h4 className='client-features-item-title'>{title}</h4>
                          <p className='client-features-item-description'>{description}</p>

                      </div>
                  )
              })}
          </div>
        </Container>

    </section>
    <section className="contactCTA">
        <Container>
              <Row>
                <Col lg = '8' md = '12'>
                    <div className="contactCTA-infor">
                    <h3>Bạn có vấn đề về mắt ? </h3>
                    <p>hãy đến phòng khám của chúng tôi</p>
                    </div>
                </Col>
                <Col lg = '4' md = '12' >
                    <div className="booking__btn">
                        <Button className="btn secondary__btn">
                            <Link to="/booking">ĐẶT LỊCH HẸN</Link>
                            
                            </Button>
                    </div>
                </Col>
              </Row>
              
        </Container>
        
    </section>
    <section className="local">
        <div id="map" dangerouslySetInnerHTML={{ __html: mapContent }} className="map-container" />;
    </section>
    
    </>
    )
} 
export default Home