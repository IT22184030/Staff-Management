import React, { useEffect, useState } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Table, Button, message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get("/api/attends/get-attend");
      setAttendanceData(response.data);
    } catch (error) {
      message.error("Failed to fetch attendance data");
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`/api/attends/delete-attend/${record._id}`);
      fetchAttendanceData();
      message.success("Attendance record deleted successfully");
    } catch (error) {
      message.error("Failed to delete attendance record");
      console.error(error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = attendanceData.map((item) => [
      item.staffid,
      item.name,
      formatDate(item.date),
      formatTime(item.time),
    ]);

    doc.autoTable({
      head: [["Staff ID", "Name", "Date", "Time"]],
      body: tableData,
    });

    doc.save("attendance_details.pdf");
  };

  const columns = [
    { title: "Staff ID", dataIndex: "staffid" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time) => <span>{formatTime(time)}</span>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(record)}
        />
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1 style={{background:'rgb(125,210,240)',width:'460px', borderRadius:'20px',padding:'10px'}}>Staff Attendance Record</h1>
        <Button
          type="primary"
          onClick={generatePDF}
          icon={<DownloadOutlined />}
          style={{ marginLeft: "16px" }}
        >
          Download Attendance Report
        </Button>
      </div>
      <Table columns={columns} dataSource={attendanceData} />
    </DefaultLayout>
  );
};

export default Attendance;
