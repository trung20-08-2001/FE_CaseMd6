import React, {useEffect, useState} from "react";
import customAxios from "../services/api";

function StarNumber(props) {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        customAxios
            .get("api/feedback/getAllFeedback/" + props.houseId)
            .then((res) => {
                setFeedbacks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Tính toán số sao trung bình từ danh sách feedback
        const totalStars = feedbacks.reduce((total, feedback) => total + feedback.numberOfStars, 0);
        const averageStars = feedbacks.length > 0 ? totalStars / feedbacks.length : 0;

        // Làm tròn đến 1 chữ số thập phân
        const roundedAverageStars = parseFloat(averageStars.toFixed(1));

        setRating(roundedAverageStars);
    }, [feedbacks]);

    const [rating, setRating] = useState(0);

    const getStarColor = (index) => {
        if (rating >= index + 1) {
            return "red"; // Màu vàng cho sao đã được đánh giá
        } else {
            return "gray"; // Màu xám cho sao chưa được đánh giá
        }
    };

    return (
        <>
            <h5>{rating}/5 Star</h5>
            <div className="rating">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <polygon fill={getStarColor(0)}
                             points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <polygon fill={getStarColor(1)}
                             points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <polygon fill={getStarColor(2)}
                             points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <polygon fill={getStarColor(3)}
                             points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <polygon fill={getStarColor(4)}
                             points="8 0 9.09 4.94 14.17 5.75 10.82 9.81 11.64 14.86 8 12.5 4.36 14.86 5.18 9.81 1.83 5.75 6.91 4.94 8 0"/>
                </svg>
            </div>
        </>

    );
}

export default StarNumber;