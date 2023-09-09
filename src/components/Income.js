import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { findRevenueOfHost } from '../services/revenueService';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Income() {
    const account = useSelector(state => state.account.account)
    const revenue = useSelector(state => state.revenue.revenue);
    const dispatch = useDispatch()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const [chartData, setChartData] = useState({
        labels,
        datasets: [
            {
                label: 'Thu nhập năm',
                data: [],
                backgroundColor: 'green',
            },
        ],
    });

    useEffect(() => {
        if (revenue.length === 0) {
            dispatch(findRevenueOfHost(account.id));
        }
    }, []);

    useEffect(() => {
        if (revenue.length > 0) {
            setChartData(prevData => ({
                ...prevData,
                // label:'Thu nhập năm '+revenue[0],
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: revenue[0].months,
                    },
                ],
            }));
        }
    }, [revenue]);

    const handleButtonClick = (index) => {
        if (revenue.length > 0 && index >= 0 && index < revenue.length) {
          setChartData(prevData => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: revenue[index].months,
              },
            ],
          }));
        }
      };
    return (
        <>
            {revenue.length > 0 ?
                <>
                    <Bar options={options} data={chartData} />
                    {revenue.map((item,index) => {
                        return (
                            <button className='btn btn-primary' onClick={() => handleButtonClick(index)} key={item.year}>{item.year}</button>
                        )
                    })}
                </>
                : <h1>Bạn chưa có doanh thu</h1>
            }
        </>
    );
}