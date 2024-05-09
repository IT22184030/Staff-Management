import React, { useEffect, useState } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, message } from "antd";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  //read
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get("/api/attends/get-attend");
        setAttendanceData(response.data);
      } catch (error) {
        message.error("Failed to fetch attendance data");
        console.error(error);
      }
    };

    fetchAttendanceData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}.${minutes}.${seconds}`;
  };

  //handle delete
  const handleDelete = async (record) => {
    try {
      await axios.delete(`/api/attends/delete-attend/${record._id}`); // Include attendId in the URL
      setAttendanceData((prevData) =>
        prevData.filter((attend) => attend._id !== record._id)
      );
      message.success("Attendance record deleted successfully");
    } catch (error) {
      message.error("Failed to delete attendance record");
      console.error(error);
    }
  };
  

  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffid",
      key: "staffid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time", 
      render: (time) => <span>{formatTime(time)}</span>,
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <span>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <h1 style={{background:'rgb(125,210,240)',width:'460px', borderRadius:'20px',padding:'10px'}}>Staff Attendance Record</h1>
      <Table columns={columns} dataSource={attendanceData} />
    </DefaultLayout>
  );
};

export default Attendance;