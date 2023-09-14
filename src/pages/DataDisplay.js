import React, { useEffect, useState } from 'react';
import '../assets/dataDisplay.css'; // Import CSS tùy chỉnh
import {BounceLoader} from "react-spinners"; // Import BounceLoader từ react-loading

const DataDisplay = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm mô phỏng việc tải dữ liệu (thay thế bằng logic thực tế)
    const fetchData = () => {
        setTimeout(() => {
            setData([
                // Dữ liệu mẫu ở đây
            ]);
            setLoading(false);
        }, 2000); // Mô phỏng độ trễ 2 giây
    };

    // Gọi fetchData khi thành phần được tạo (hoặc bất kỳ khi nào bạn muốn)
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="loading-container">
            {loading ? (
                <div className="loading">
                    <BounceLoader color={'#123abc'} loading={loading} />
                    <p className="loading-text">Đang tải dữ liệu...</p>
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

export default DataDisplay;
