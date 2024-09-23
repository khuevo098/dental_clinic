import { FaThermometerEmpty } from "react-icons/fa";

export async function submitForm(submitForm) {
  const text = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;

  try {
    const response = await fetch("http://localhost:2212/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error:", response.statusText);
      // Handle error response from the backend
      return null;
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Handle network or other errors
    return null;
  }
}

export const fetchDoctorsIDName = async () => {
  try {
    const response = await fetch("http://localhost:2212/bookingDocs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export async function createAppointment(appointmentData) {
  try {
    const response = await fetch("http://localhost:2212/createAppointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating appointment:", error.message);
    throw error;
  }
}

export const fetchEmployees = async () => {
  try {
    const response = await fetch("http://localhost:2212/getEmployees");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const addNewEmployee = async (newEmployeeData) => {
  try {
    const response = await fetch("http://localhost:2212/addNewEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating new employee:", error.message);
    throw error;
  }
};

export const fetchPatients = async (doctorID) => {
  try {
    const response = await fetch(
      `http://localhost:2212/getListPatients/${doctorID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchPatientBySTT = async (patientSTT) => {
  try {
    const response = await fetch(
      `http://localhost:2212/getPatientBySTT/${patientSTT}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const addPatient = async (patientData) => {
  try {
    const response = await fetch("http://localhost:2212/addPatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding the patient:", error.message);
    throw error;
  }
};


export const updateEmployee = async (updatedEmployeeData) => {
  try {
    const response = await fetch("http://localhost:2212/updateEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployeeData),
    });
    const data = await response.json();
    ///console.log(data);
    return data;
  } catch (error) {
    console.error("Error updating new employee:", error.message);
    throw error;
  }
};

export const deleteEmployee = async (idNeedDeleted) => {
  try {
    const response = await fetch(
      `http://localhost:2212/deleteEmployee/${idNeedDeleted}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating new employee:", error.message);
    throw error;
  }
};

export async function writeFeedback(feedbackData) {
  try {
    const response = await fetch("http://localhost:2212/writeFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error inserting feedback: ", error.message);
    throw error;
  }
}

export const fetchFeedback = async () => {
  try {
    const response = await fetch("http://localhost:2212/getListFeedback");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchDrug = async () => {
  try {
    const response = await fetch("http://localhost:2212/getListDrug");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const findDrug = async (nameOrID) => {
  if (typeof nameOrID !== "string" || nameOrID.trim() === "") {
    throw new Error("Search term must be a non-empty string.");
  }

  try {
    const url = new URL("http://localhost:2212/findDrug");
    url.searchParams.append("nameOrID", nameOrID);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Không cần phần body cho phương thức GET
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const addNewDrug = async (newDrugData) => {
  try {
    const response = await fetch("http://localhost:2212/addDrug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDrugData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error creating new drug:", error.message);
    throw error;
  }
};

export const deleteDrug = async (drugID) => {
  try {
    const response = await fetch(`http://localhost:2212/deleteDrug/${drugID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error deleting the drug:", error.message);
    throw error;
  }
};

export const updateDrug = async (updatedDrugData) => {
  try {
    const response = await fetch("http://localhost:2212/updateDrug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDrugData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error updating drug:", error.message);
    throw error;
  }
};

export const addOrUpdateMedicalHistory = async (caseInformation) => {
  try {
    const response = await fetch("http://localhost:2212/addOrUpdateMedicalHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(caseInformation),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding and updating medical history:", error.message);
    throw error;
  }
};

export const fetchMedicalHistory = async (mabn, ngaykham, doctor_username) => {
  try {
    // Tạo URL với các tham số truyền vào
    const response = await fetch(`http://localhost:2212/getMedicalHistory/${mabn}/${ngaykham}/${doctor_username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchMedicalHistoryPharmacist = async (maBN) => {
  try {
    const url = new URL("http://localhost:2212/getListMedicalHistory");
    url.searchParams.append("maBN", maBN);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchPatientDetailInformation = async (maBN) => {
  try {
    const response = await fetch(`http://localhost:2212/getPatientDetailInformation/${maBN}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}


export const fetchPatientsPharmacist = async () => {
  try {
    const response = await fetch(`http://localhost:2212/getListPatientsPharmacist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const addMedicineToPreDetail = async (drug) => {
  try {
    const response = await fetch(`http://localhost:2212/addMedicineToPreDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drug),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const fetchPrescription = async (maBN, ngayTao) => {
  try {
    const url = new URL("http://localhost:2212/getPrescription");
    url.searchParams.append("maBN", maBN);
    url.searchParams.append("ngayTao", ngayTao);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};