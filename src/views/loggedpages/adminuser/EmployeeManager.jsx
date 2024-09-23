import { Button } from "reactstrap";
import { FaPen } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import {
  fetchEmployees,
  addNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../../utils/fetchFromAPI";
//get from database
import "../../../styles/EmployeeManager.scss";

const EmployeeManager = () => {
  const [data, setdata] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newWage, setNewWage] = useState("");
  const [newPosition, setPosition] = useState("BS");
  const fetchData = async () => {
    try {
      const employeeData = await fetchEmployees();
      setdata(employeeData.employeeList);
    } catch (error) {
      console.error("Error fetching doctors data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Thêm nhân viên
  const onClickAddNew = async () => {
    try {
      const response = await addNewEmployee({
        id: newPosition,
        name: newName,
        email: newEmail,
        phone: newPhone,
        degree: newDegree,
        wage: newWage,
      });

      fetchData();

      // Reset the form
      setNewId("");
      setNewName("");
      setNewEmail("");
      setNewDegree("");
      setNewWage("");
      setPosition("BS");
      setIsActive(!isActive);

      //Xử lí response trả về
      if (response.success) {
        alert(response.message);
      } else if (!response.success) {
        alert(`Không thể thêm nhân viên: ${response.message}`);
      }
    } catch (error) {
      console.error("Error adding new employee:", error);
    }
  };

  const onClickAdd = () => {
    setIsActive(!isActive);
  };

  const onClickBack = () => {
    setIsActive(!isActive);
  };

  const title = [
    { Header: "ID", accessor: "id" },
    { Header: "Họ Tên", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Điện thoại", accessor: "phone" },
    { Header: "Bằng cấp", accessor: "degree" },
    { Header: "Lương", accessor: "wage" },
    { Header: "" },
    { Header: "" },
  ];
  // Sử dụng state để lưu trạng thái của đối tượng

  const onchangeNewName = (e) => {
    setNewName(e.currentTarget.value);
  };
  const onchangeNewEmail = (e) => {
    setNewEmail(e.currentTarget.value);
  };
  const onchangeNewPhone = (e) => {
    setNewPhone(e.currentTarget.value);
  };
  const onchangeNewDegree = (e) => {
    setNewDegree(e.currentTarget.value);
  };
  const onchangeNewWage = (e) => {
    setNewWage(e.currentTarget.value);
  };
  const onchangeNewPosition = (e) => {
    setPosition(e.currentTarget.value);
  };

  // chỉnh sửa
  const [editRow, setEditRow] = useState("");

  const onClickFix = (employee) => {
    setIsActive(!isActive);
    setEditRow(employee.id);
    setNewId(employee.id);
    setNewName(employee.name);
    setNewEmail(employee.email);
    setNewPhone(employee.phone);
    setNewDegree(employee.degree);
    setNewWage(employee.wage);
  };

  const onClickUpdate = async () => {
    try {
      let index = data.findIndex((d) => d.id === editRow);
      let dataCopy = [...data];
      let updatedEmployeeData = {
        id: editRow,
        name: newName,
        email: newEmail,
        phone: newPhone,
        degree: newDegree,
        wage: newWage,
      };

      console.log(dataCopy[index]);
      const response = await updateEmployee(updatedEmployeeData);

      fetchData();

      // Xử lí response trả về
      if (response.success) {
        alert(response.message);
      } else if (!response.success) {
        alert(`Không thể thay đổi thông tin nhân viên: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating the employee:", error);
    }
  };
  // xóa
  const onClickDelete = async (employee) => {
    try {
      let IDDelete = data.findIndex((d) => d === employee);
      let idNeedDeleted = data[IDDelete].id;
      let dataCopy = data.filter((d) => d !== employee);

      setdata(dataCopy);

      const response = await deleteEmployee(idNeedDeleted);

      fetchData();

      // Xử lí response trả về
      if (response.success) {
        alert(response.message);
      } else if (!response.success) {
        alert(`Không thể xóa nhân viên: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deleting the employee:", error);
    }
  };
  return (
    <>
      <div className="search-bar d-flex align-items-center">
        <div className="search-bar-input">
          <IoSearch className="icon-search" />
          <input type="text" placeholder={"Search ID"} />
        </div>

        <Button className="btn-add primary__btn" onClick={onClickAdd}>
          Thêm
        </Button>
      </div>

      {isActive && (
        <div className="wrapper">
          <div className="add-employee">
            <div className="group-from">
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={newName}
                onChange={onchangeNewName}
              />
            </div>
            <div className="group-from">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newEmail}
                onChange={onchangeNewEmail}
              />
            </div>
            <div className="group-from">
              <label>SĐT</label>
              <input
                type="phone number"
                name="phone"
                value={newPhone}
                onChange={onchangeNewPhone}
              />
            </div>
            <div className="group-form">
              <label>Vị trí</label>
              <select name="position" onClick={onchangeNewPosition}>
                <option value="BS">Bác sĩ</option>
                <option value="DS">Dược sĩ</option>
              </select>
            </div>
            <div className="group-from">
              <label>Bằng cấp</label>
              <input
                type="text"
                name="degree"
                value={newDegree}
                onChange={onchangeNewDegree}
              />
            </div>
            <div className="group-from">
              <label>Lương</label>
              <input
                type="number"
                name="wage"
                value={newWage}
                onChange={onchangeNewWage}
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

            <Button className="outline__btn btn-exit" onClick={onClickBack}>
              Thoát
            </Button>
          </div>
        </div>
      )}

      <div className="table-employee">
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
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>{d.degree}</td>
                  <td>{d.wage}</td>
                  <td>
                    <FaPen
                      onClick={(e) => onClickFix(d)}
                      className="icon-fix"
                    />
                  </td>
                  <td>
                    <AiOutlineDelete
                      onClick={(e) => onClickDelete(d)}
                      className="icon-delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default EmployeeManager;
