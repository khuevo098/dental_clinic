import React from "react";

import { Outlet, useParams} from "react-router-dom";

import { Row, Col, Container } from "reactstrap";
import Sidebar from "../sidebar/SideBar";
import img1 from "../../assets/images/1.png"
// after check in database 
// get user from data base 

const users = 
{
    username: "",
    type: 3,
    avatar: img1

}


const Logged = () => {
    const id = useParams().id
    users.username = id;
    
    if (id.search("doctor") === 0) {
        users.type = 2;
    }
    if (id.search("admin") === 0) {
        users.type = 1;
    }
   
    {localStorage.removeItem('isAuth')}
    return(
        <>
        <Container>
            <Row>
                <Col lg = '3' sm='12'>
                    <Sidebar user={users}></Sidebar>
                </Col>
                <Col lg = '9' sm = '12'>
                    <Outlet/>
                </Col>
            </Row>
            
        </Container>
        </>
    )
} 
export default Logged