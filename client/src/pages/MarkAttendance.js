import React from "react";
import { Form, Input, DatePicker, TimePicker, Button, message } from "antd";
import axios from "axios";

//handle form submit 
function MarkAttendance() {
  const handleSubmit = async (values) => {
    try {
      await axios.post("/api/attends/add-attend", values);
      message.success("Attendance marked successfully"); 
    } catch (error) {
      message.error("Failed to mark attendance");
      console.error(error);
    }
  };
 
  return (
    <div className="attendance">
      <div className="attendance-form-card">
        <h1 className="card-title">Mark Your Attendance</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Staff Id" name="staffid" rules={[{ required: true, message: "Please input Staff Id" }]}>
            <Input placeholder="Staff Id" />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{required: true,message: 'Please enter the name',},
            {
              pattern: /^[a-zA-Z ]+$/g,
              message: 'Please enter a valid name'
            }]}>
              <Input />
            </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select Date" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please select Date"}]}>
            <TimePicker format="HH:mm:ss" />
          </Form.Item>
          <Button className="primary-button at-3" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default MarkAttendance;
