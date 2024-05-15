import React from 'react';
import { Card } from 'antd';

const ItemList = ({ item }) => {
   
    const colors = {
        Dentist: '#dcecfd', 
        Nurse: '#dcecfd',    
        Pharmacist: '#dcecfd',
        'Appoinment Manager': '#dcecfd',
        'Lab Assistance': '#dcecfd',
        Receptionist:'#dcecfd',
         
        
    };

    
    const color = colors[item.role_type] || '#000000'; 

    return (
        <div>
            <Card
                title={item.name}
                bordered={false}
                style={{
                    width: 300,
                    marginBottom: 50,
                    backgroundColor: color, 
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
