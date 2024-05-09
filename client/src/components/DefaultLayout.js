import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  CopyOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const App = (props) => { // Using functional component syntax, accepting props
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout style={{minHeight:'960px',background:'rgb(125,210,240)'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{background:'#023E8A',borderRadius: '15px',paddingTop:'10px', height:'950px'}}>
        <div className="demo-logo-vertical" >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkv6dg5oDHHjkj_uxHOeYf4jxlEWriGmryV9fmayjbw&s" alt="logo " style={{width:'130px', height:'130px', borderRadius:'100px', marginLeft:'36px'}}/>
        <h1 className="text-center text-light font-wight-bold mt-4">IVORY DENTAL</h1>
        </div>
        <Menu theme="dark" mode="inline"  defaultSelectedKeys={[window.location.pathname]}
        style={{padding:'16px 0',background:'#023E8A'}}
        >
  
            <Menu.Item key="/" icon={< HomeOutlined/>}>
                <Link to ="/">HomePage</Link>
            </Menu.Item>
            <Menu.Item key="/managestaff" icon={<UserOutlined />}>
                <Link to ="/managestaff">ManageStaff</Link>
            </Menu.Item>
            <Menu.Item key="/markattendence" icon={<CopyOutlined />}>
                <Link to ="/markattendence">Mark Attendance</Link>
            </Menu.Item>
            <Menu.Item key="/attendence" icon={<UnorderedListOutlined />}>
                <Link to ="/attendence">Attendance</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                <Link to ="/logout">LogOut</Link>
            </Menu.Item>
          </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight:320,
            background: 'rgb(125,210,240)',
            borderRadius: borderRadiusLG,
            backgroundImage:'url("https://arkansasfamilydental.com/wp-content/uploads/2024/01/howcases-a-close-up-view-of-clear-invisalign-trays-with-a-focus-on-their-transparent-and-custom_670e31a886141d7963b9905cef7c6a8a_2000.jpg")',
            backgroundSize:'cover',
            
          }}
        >
         {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
