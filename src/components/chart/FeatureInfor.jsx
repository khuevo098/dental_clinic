import React from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material"; 
import './featureInfor.scss'
const FeaturedInfo = () => { 
  return ( 
    <div className="featured"> 
      <div className="featuredItem"> 
        <span className="featuredTitle">Lợi nhuận</span>
        <div className="featuredMoneyContainer"> 
          <span className="featuredMoney"> VND 2,415,000 </span>
          <span className="featuredMoneyRate"> 
            -11.4 <ArrowDownward className="featuredIcon negative"/> 
          </span> 
        </div> 
        <span className="featuredSub"> So với tháng trước</span>
      </div> 
      <div className="featuredItem"> 
        <span className="featuredTitle">Doanh thu</span>
        <div className="featuredMoneyContainer"> 
          <span className="featuredMoney"> VND 4,415,000</span>
          <span className="featuredMoneyRate"> 
            -1.4 <ArrowDownward className="featuredIcon negative"/> 
          </span> 
        </div> 
        <span className="featuredSub"> So với tháng trước</span>
        </div> 
        <div className="featuredItem"> 
          <span className="featuredTitle"> Chi phí</span>
          <div className="featuredMoneyContainer"> 
            <span className="featuredMoney"> VND 2,225,000 </span>
            <span className="featuredMoneyRate"> 
              +2.4 <ArrowUpward className="featuredIcon"/> 
            </span> 
          </div> 
          <span className="featuredSub"> So với tháng trước</span>
        </div> 
      </div> 
    ); 
} 
export default FeaturedInfo;