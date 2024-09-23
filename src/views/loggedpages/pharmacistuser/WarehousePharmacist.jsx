import React from "react";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { FaPen } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";

import "../../../styles/WarehousePharmacist.scss";
import {
  addNewDrug,
  fetchDrug,
  findDrug,
  deleteDrug,
  updateDrug,
} from "../../../utils/fetchFromAPI";

const WarehousePharmacist = () => {
  const [data, setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newIPrice, setNewIPrice] = useState("");
  const [newOPrice, setNewOPrice] = useState("");
  const [editRow, setEditRow] = useState("");

  const fetchData = async () => {
    try {
      const drugData = await fetchDrug();
      setdata(drugData.drugList);
    } catch (error) {
      console.error("Error fetching patients data:", error);
    }
  };

  const title = [
    { Header: "ID", accessor: "id" },
    { Header: "Tên thuốc", accessor: "name" },
    { Header: "Số lượng tồn", accessor: "stock" },
    { Header: "Đơn vị tính", accessor: "unit" },
    { Header: "Giá nhập kho", accessor: "iPrice" },
    { Header: "Giá bán", accessor: "oPrice" },

    { Header: "" },
    { Header: "" },
  ];
  // Sử dụng state để lưu trạng thái của đối tượng
  const [isActive, setIsActive] = useState(false);
  const resetForm = () => {
    setNewName("");
    setNewUnit("");
    setNewStock("");
    setNewIPrice("");
    setNewOPrice("");
    setEditRow("");
  };  
  const onClickAdd = () => {
    setIsActive(!isActive);
    if (!isActive) {
      resetForm();
    }
  };

  const onClickAddNew = async () => {

    // Kiểm tra các trường đã điền đầy đủ thông tin chưa
    if (!newName || !newStock || !newUnit || !newIPrice || !newOPrice) {
      alert("Vui lòng điền đầy đủ thông tin cho tất cả các trường!");
      return;
    }

    try {
      const response = await addNewDrug({
        //id: newID,
        name: newName,
        stock: newStock,
        unit: newUnit,
        iPrice: newIPrice,
        oPrice: newOPrice,
      });

      fetchData();

      // Reset form
      setNewName("");
      setNewUnit("");
      setNewStock("");
      setNewIPrice("");
      setNewOPrice("");
      setIsActive(!isActive);

      // let dataCopy = [...data];
      // dataCopy.push({
      //   id: "MD00" + (data.length + 1),
      //   name: newName,
      //   volume: newVolume,
      //   unit: newUnit,
      //   iPrice: newIPrice,
      //   oPrice: newOPirce,
      // });
      // setdata(dataCopy);

      //Xử lí response trả về
      if (response.success) {
        alert(response.message);
      } else if (!response.success) {
        alert(`${response.message}`);
      }
    } catch (error) {
      console.error("Error adding new drug:", error);
    }
  };

  const onchangeNewName = (e) => {
    setNewName(e.currentTarget.value);
  };
  const onchangeNewVolume = (e) => {
    setNewStock(e.currentTarget.value);
  };
  const onchangeNewUnit = (e) => {
    setNewUnit(e.currentTarget.value);
  };
  const onchangeNewIPrice = (e) => {
    setNewIPrice(e.currentTarget.value);
  };
  const onchangeNewOPrice = (e) => {
    setNewOPrice(e.currentTarget.value);
  };

  // chỉnh sửa
  const onClickFix = (medicine) => {
    setIsActive(!isActive);
    setEditRow(medicine.id);
    setNewName(medicine.name);
    setNewUnit(medicine.unit);
    setNewStock(medicine.stock);
    setNewIPrice(medicine.iPrice);
    setNewOPrice(medicine.oPrice);
  };

  const onClickUpdate = async () => {
    try {
      if (!newName || !newStock || !newUnit || !newIPrice || !newOPrice) {
        alert("Không được để trống bất kỳ trường nào!");
        return;
      }

      if (newStock < 0 || newIPrice <= 0 || newOPrice <= 0) {
        alert("Giá trị của trường không hợp lệ, vui lòng kiểm tra lại!");
        return;
      }

      //let index = data.findIndex((d) => d.id === editRow);
      //let dataCopy = [...data];
      let updatedDrugData = {
        id: editRow,
        name: newName,
        stock: newStock,
        unit: newUnit,
        iPrice: newIPrice,
        oPrice: newOPrice,
      };

      const response = await updateDrug(updatedDrugData);
      fetchData();
      // setdata(dataCopy);

      setEditRow("");
      setNewName("");
      setNewUnit("");
      setNewStock("");
      setNewIPrice("");
      setNewOPrice("");
      // setIsActive(!isActive);
      if (response.success) {
        alert(response.message);
        setIsActive(!isActive);
      } else {
        alert(`Không thể thay đổi thông tin thuốc: ${response.message}`);
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    if (!searchTerm) {
      fetchData();
      setIsSearching(false);
      return;
    }

    try {
      const results = await findDrug(searchTerm);
      setdata(results.drugFound);
    } catch (error) {
      console.error("Error searching for drugs:", error);
    }
  };

  const onDeleteClick = async (drugID) => {
    const confirmDelete = window.confirm("Đồng ý xoá loại thuốc này?");
    if (confirmDelete) {
      try {
        const response = await deleteDrug(drugID);
        alert(response.message);
        fetchData();
      } catch (error) {
        console.error("Error deleting drug:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <>
      <div className="search-bar d-flex align-items-center">
        <div className="search-bar-input">
          <IoSearch className="icon-search" onClick={handleSearch} />
          <input
            type="text"
            placeholder={"Search ID"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        <Button className="btn-add primary__btn" onClick={onClickAdd}>
          Thêm
        </Button>
      </div>

      {isActive && (
        <div className="wrapper">
          <div className="add-drug">
            {/* <h4>Chỉnh sửa</h4> */}
            <div className="group-from">
              <label>Tên thuốc</label>
              <input
                type="text"
                name="name"
                value={newName}
                onChange={onchangeNewName}
              />
            </div>
            <div className="group-from">
              <label>Đơn vị tính</label>
              <input
                type="text"
                name="unit"
                value={newUnit}
                onChange={onchangeNewUnit}
              />
            </div>
            <div className="group-from">
              <label>Số lượng</label>
              <input
                type="number"
                name="stock"
                value={newStock}
                onChange={onchangeNewVolume}
              />
            </div>
            <div className="group-from">
              <label>Giá nhập</label>
              <input
                type="number"
                name="iPrice"
                value={newIPrice}
                onChange={onchangeNewIPrice}
              />
            </div>
            <div className="group-from">
              <label>Giá bán</label>
              <input
                type="number"
                name="oPrice"
                value={newOPrice}
                onChange={onchangeNewOPrice}
              />
            </div>
            {editRow ? (
              <Button
                className="primary__btn btn-add-new"
                onClick={onClickUpdate}
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                className="primary__btn btn-add-new"
                onClick={onClickAddNew}
              >
                Xác nhận
              </Button>
            )}
            <Button className="outline__btn btn-exit" onClick={onClickAdd}>
              Thoát
            </Button>
          </div>
        </div>
      )}

      <div className="table-warehouse">
        {data.length > 0 ? (
          <table>
            <thead>
              {title.map((t) => {
                return <td key={t}>{t.Header}</td>;
              })}
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.stock}</td>
                    <td>{d.unit}</td>
                    <td>{d.iPrice}</td>
                    <td>{d.oPrice}</td>
                    <td>
                      <FaPen
                        onClick={(e) => onClickFix(d)}
                        className="icon-fix"
                      />
                    </td>
                    <td>
                      <AiOutlineDelete
                        className="icon-delete"
                        onClick={(e) => onDeleteClick(d.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : isSearching ? (
          <div style={{ color: "red", textAlign: "left", fontStyle: "italic" }}>
            Không tìm thấy thuốc này!
          </div>
        ) : (
          <div style={{ color: "red", textAlign: "left", fontStyle: "italic" }}>
            Hiện không có loại thuốc nào!
          </div>
        )}
      </div>
    </>
  );
};
export default WarehousePharmacist;
