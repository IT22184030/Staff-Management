import React from 'react';
import { Card } from 'antd';

const ItemList = ({ item }) => {
    // Define colors based on the item's role_type or any other property
    const colors = {
        Dentist: '#dcecfd', 
        Nurse: '#dcecfd',    
        Pharmacist: '#dcecfd',
        'Appoinment Manager': '#dcecfd',
        'Lab Assistance': '#dcecfd',
        Receptionist:'#dcecfd',
         
        
    };

    // Get the color for the current role_type
    const color = colors[item.role_type] || '#000000'; 

    return (
        <div>
            <Card
                title={item.name}
                bordered={false}
                style={{
                    width: 300,
                    marginBottom: 50,
                    backgroundColor: color, // Apply background color dynamically
                }}
            >
                <p>{item.staffid}</p>
                <p>{item.role_type}</p>
                <p>{item.contact_no}</p>
            </Card>
        </div>
    );
};

export default ItemList;
