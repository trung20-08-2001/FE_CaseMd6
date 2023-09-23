import React, { useEffect, useState } from 'react';
import '../assets/dataDisplay.css'; // Import CSS tùy chỉnh
import {BounceLoader} from "react-spinners"; // Import BounceLoader từ react-loading

const NoResult = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm mô phỏng việc tải dữ liệu (thay thế bằng logic thực tế)


    // Gọi fetchData khi thành phần được tạo (hoặc bất kỳ khi nào bạn muốn)
    return (
        <div className="loading-container">
            {loading ? (
                <div className="loading">
                    <p className="loading-text">
                        <img src="https://nhaphoc.ueh.edu.vn/wp-content/uploads/2022/09/Picture1.png"></img>
                        <p>There are no results please re-enter</p>
                    </p>
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
