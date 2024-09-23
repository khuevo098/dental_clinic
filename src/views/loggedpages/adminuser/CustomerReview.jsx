import React, { useEffect, useState } from "react";
import '../../../styles/CustomerReview.scss'
import { Container } from "reactstrap";

import { fetchFeedback } from "../../../utils/fetchFromAPI";

const CustomerReview = () =>{
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const feedbackData = await fetchFeedback();
            
            setData(feedbackData.feedbackList);
        } catch (error) {
            console.error("Error fetching feedback data:", error);
        }
    };

    const title = [
        {Header: "ID", accessor: 'id'},
        {Header: "Họ Tên", accessor: 'name'},
        {Header: "Điện thoại", accessor: 'phone'},
        {Header: "Mô tả", accessor: "description"},
        {Header: "Đánh giá", accessor: "estimate"}
    ];

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <>
        <Container className="customer">  
        <div className="table-customer">
            <table>
                <thead>
                    {
                        title.map(t => {
                            return (<td key={t}>{t.Header}</td>)
                        })
                    }
                </thead>
                <tbody>
                        {data.map((d) => {
                    return (
                        <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.phone}</td>
                        <td>{d.description}</td>
                        <td>{d.estimate}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        
        </div>
        </Container>
        
        </>
    )
} 
export default CustomerReview