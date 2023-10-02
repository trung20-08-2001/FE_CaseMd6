import React, { useEffect, useState } from 'react';
import '../assets/dataDisplay.css'; // Import CSS tùy chỉnh


const NoResult = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    return (
        <div className="loading-container">
            {loading ? (
                <div className="loading">
                    <p className="loading-text">
                        <img src="https://nhaphoc.ueh.edu.vn/wp-content/uploads/2022/09/Picture1.png"></img>
                    </p>
                    <p>There are no results please re-enter</p>
                </div>
               
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoResult;
