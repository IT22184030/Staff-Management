import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from 'antd';
import ItemList from "../components/ItemList";
 
const HomePage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Dentists');
    const categories = [
        {
            name :'Dentist'
            
        },
        {
            name :'Nurse'
        },
        {
            name :'Pharmacist'
        },
        {
            name :'Appoinment Manager'
        },
        {
            name :'Lab Assistance'
        },
        {
            name :'Receptionist'
        }

    ]
    //useEffect
    useEffect(() => {
        const getAllItems = async () => {
            try {
                const { data } = await axios.get("/api/items/get-item");
                setItemsData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllItems();
    }, []);

    return (
        <DefaultLayout>
            <div className="d-flex">
                {categories.map((role_type) => (
                    <div key={role_type.name} 
                    className = {`d-flex category ${
                        selectedCategory === role_type.name && "category-active"
                        }`}
                        onClick={() => setSelectedCategory(role_type.name)}
                        >
                        <h4>{role_type.name}</h4>
                    </div>
                ))}
            </div>
            <Row gutter={[16, 16]}> {/* Added gutter for spacing */}
                {itemsData
                .filter((i) => i.role_type === selectedCategory)
                .map(item => (
                    <Col xs={24} lg={6} md={12} sm={24} key={item.id}> {/* Added key prop */}
                        <ItemList key={item.id} item={item} />
                    </Col>
                ))}
            </Row>
        </DefaultLayout>
    );
};

export default HomePage;
