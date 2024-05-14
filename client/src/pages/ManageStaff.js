import React, { useEffect, useState } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  AccountBookOutlined,
  DownloadOutlined 
} from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import jspdf from "jspdf";
import "jspdf-autotable";


const ManageStaff = () => {
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [salaryFormVisible, setSalaryFormVisible] = useState(false);
  const [form] = Form.useForm(); 

  useEffect(() => {
    getAllItems();
  }, []);

  //read
  const getAllItems = async () => {
    try {
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  //handle search
  const handleSearch = () => {
    const results = itemsData.filter(item =>
      item.staffid.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  
  //handle delete
  const handleDelete = async (record) => {
    try {
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Deleted Successfully");
      setPopupModal(false);
      getAllItems(); // Fetch updated data after deletion
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  //handle form submit
  const handleSubmit = async (values) => {
    if (editItem === null) {
      try {
        await axios.post("/api/items/add-item", values);
        message.success("Added Successfully");
        setPopupModal(false);
        getAllItems(); // Fetch updated data after addition
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    } else {
      try {
        await axios.post("/api/items/edit-item", { ...values, itemId: editItem._id });
        message.success("Update details Successfully");
        setPopupModal(false);
        getAllItems(); // Fetch updated data after edit
      } catch (error) {
        message.error("Something went wrong");
        console.log(error);
      }
    }
  };

  //handle edit salary
  const handleEditSalary = (record) => {
    setEditItem(record);
    setSalaryFormVisible(true);
  };

  const handleSalaryFormSubmit = async (values) => {
    try {
      // Calculate total salary
      const totalSalary = parseFloat(values.bsalary) + parseFloat(values.otsalary) + parseFloat(values.bonus);
      // Update the salary for the current item
      await axios.post("/api/items/edit-item", { salary: totalSalary, itemId: editItem._id });
      message.success("Salary updated successfully");
      setSalaryFormVisible(false);
      getAllItems(); // Fetch updated data after edit
    } catch (error) {
      message.error("Failed to update salary");
      console.log(error);
    }
  };

  const calculateTotalSalary = (values) => {
    const { bsalary, otsalary, bonus } = values;
    const totalSalary = parseFloat(bsalary || 0) + parseFloat(otsalary || 0) + parseFloat(bonus || 0);
    return totalSalary;
  };

//report
const generatePDF = () => {
  const doc = new jspdf();
  const tableData = itemsData.map(item => [item.staffid, item.name, item.email, item.role_type, item.salary]);

  doc.autoTable({
    head: [['Staff Id', 'Name', 'Email', 'Role', 'Salary']],
    body: tableData,
  });

  doc.save("staff_details.pdf");
};


  const columns = [
    
    { title: "Staff Id", dataIndex: "staffid" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role_type" },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <span>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer", marginLeft: 12 }}
            onClick={() => {
              setEditItem(record);
              setPopupModal(true);
            }}
          />
          <AccountBookOutlined
            style={{ cursor: "pointer", marginLeft: 12 }}
            onClick={() => handleEditSalary(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1 style={{background:'rgb(125,210,240)',width:'200px', borderRadius:'20px',padding:'10px'}}>Staff List</h1>
        <div className="d-flex align-items-center">
          <Input
            placeholder="Search by Staff ID"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "400px", border: "none", boxShadow: "none", borderRadius: "15px" }}
          />
          <Button type="primary" className="search-button" onClick={handleSearch} style={{ marginRight: "56px" }}>Search</Button>
          <Button type="primary" onClick={() => setPopupModal(true)}>
            Add Staff Member
          </Button>
          <Button type="primary" onClick={generatePDF} icon={<DownloadOutlined />} style={{ marginLeft: "16px" }}>
            Download Staff Details Report
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={searchResults} bordered />

      {popupModal && (
        <Modal
          title={`${editItem !== null ? 'Edit Staff Details' : 'Add New Staff Member'}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
          <Form.Item name="staffid" label="Staff Id"  rules={[{required: true,message: 'Please enter the Staff ID',},]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{required: true,message: 'Please enter the name',},
            {
              pattern: /^[a-zA-Z ]+$/g,
              message: 'Please enter a valid name'
            }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{required: true,message: 'Please enter the email',},{type: 'email',message: 'Please enter a valid email',},]}>
              <Input />
            </Form.Item>
            <Form.Item name="contact_no" label="Contact No" rules={[{required: true,message: 'Please enter the contact number',},
            {
               
                pattern: /^[0-9]{10}$/, 
                message: 'Contact number must be 10 digits' 
              
            }]}>
              <Input />
            </Form.Item>
            <Form.Item name="nic" label="NIC" rules={[{required: true,message: 'Please enter the NIC',},
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{required: true,message: 'Please enter the Address',},]}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{required: true,message: 'Please enter the gender',},]}>
              <Input />
            </Form.Item>
            <Form.Item name="dob" label="Date of Birth" rules={[{required: true,message: 'Please enter the dob',},]}>
              <Input />
            </Form.Item>
            <Form.Item name="salary" label="Salary" rules={[{required: true,message: 'Please enter the salary',},
            {
              type:'number',
              min :0,
              transform:value =>parseFloat(value),
              message: 'Salary must be a positive number'
            }]}>
              <Input />
            </Form.Item>
            <Form.Item name="role_type" label="Role" rules={[{required: true,message: 'Please select the role',},]}>
              <Select>
                <Select.Option value="Dentist">Dentist</Select.Option>
                <Select.Option value="Pharmacist">Pharmacist</Select.Option>
                <Select.Option value="Nurse">Nurse</Select.Option>
                <Select.Option value="Appoinment Manager">Appoinment Manager</Select.Option>
                <Select.Option value="Lab Assistance">Lab Assistance</Select.Option>
                <Select.Option value="Receptionist">Receptionist</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {salaryFormVisible && (
        <Modal
          title="Edit Salary"
          visible={salaryFormVisible}
          onCancel={() => setSalaryFormVisible(false)}
          footer={null}
        >
          <Form
            layout="vertical"
            form={form} // Pass the form instance
            onFinish={handleSalaryFormSubmit}
            initialValues={{ 
              staffid: editItem?.staffid,
              bsalary: editItem?.bsalary,
              otsalary: editItem?.otsalary,
              bonus: editItem?.bonus,
              salary: calculateTotalSalary(editItem) // Autofill total salary
            }}
            onValuesChange={(changedValues, allValues) => {
              if ('bsalary' in changedValues || 'otsalary' in changedValues || 'bonus' in changedValues) {
                const totalSalary = calculateTotalSalary(allValues);
                form.setFieldsValue({ salary: totalSalary });
              }
            }}
          >
            {/* Form fields */}
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ManageStaff;
