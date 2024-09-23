import React from "react";
import { Col, Container, Row } from "reactstrap";
import LChart from "../../../components/chart/LChart.jsx"
import FeaturedInfo from "../../../components/chart/FeatureInfor.jsx";
import CChart from "../../../components/chart/CChart.jsx";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import { Padding } from "@mui/icons-material";
const Dashboard = () => {
    const data = [
        { name: 1, cost: 4.11, impression: 100 },
        { name: 2, cost: 2.39, impression: 120 },
        { name: 3, cost: 1.37, impression: 150 },
        { name: 4, cost: 1.16, impression: 180 },
        { name: 5, cost: 2.29, impression: 200 },
        { name: 6, cost: 3, impression: 499 },
        { name: 7, cost: 0.53, impression: 50 },
        { name: 8, cost: 2.52, impression: 100 },
        { name: 9, cost: 1.79, impression: 200 },
        { name: 10, cost: 2.94, impression: 222 },
        { name: 11, cost: 4.3, impression: 210 },
        { name: 12, cost: 4.41, impression: 300 },]
    const customer_data = [
        {name: 1, volume: 12},
        {name: 2, volume: 5},
        {name: 3, volume: 120},
        {name: 4, volume: 240},
        {name: 5, volume: 1900},

    ]
    return (
        <>
        <Container>
        <Col>
            <Row>
                <FeaturedInfo></FeaturedInfo>
            </Row>
            <Row>
            <div className="revenue-update">
                <div className="revenue-update-title">
                    <h4>Tổng doanh thu</h4>
                    <select className="choose-year">
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                    
                    
                </div>
                <div className="revenue-update-graph">
                    <LChart data = {data} dataKey="cost" grid ></LChart>
                </div>
            </div>
            </Row>
            
            <Row>
                <Col>
                <div className="donut">
                    <div className="donut-title">
                        <h4>Tổng chi phí</h4>
                        <CChart></CChart>
                    </div>
                </div>
                
                </Col>
                <Col>
                <div className="review">
                    <div className="review-title">
                        <h4>Đánh giá của khách hàng</h4>

                        <BarChart width={400} height={400} data={customer_data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="volume" fill="#8884d8" />
                        </BarChart>
                        <Link className="px-5" to = {`../admin/customerreview`}>More..</Link>
                    </div>
                </div>
                </Col>
                
            </Row>
            
            </Col>
        </Container>
        
        </>
    )
}
export default Dashboard