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
import Loading from "./Loading"



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
    const revenue = useSelector(state => state.revenue.data);
    const loading = useSelector(state => state.revenue.loading);
    const dispatch = useDispatch()
    console.log(revenue);
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
                label: 'Revenue in ',
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
                label: 'Revenue in ',
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: revenue[0].months,
                        label: 'Revenue in ' + revenue[0].year,
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
                        label: 'Revenue in ' + revenue[index].year,
                    },
                ],
            }));
        }
    };
    return (
        <>
            <div className='mt-50'>
                {loading ? <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title mb-38 mt-31 text-center">
                            <Loading />
                        </div>
                    </div>
                </div> :
                    revenue.length === 0 ?
                        <h1 className='text-center text-danger'>You don't have any revenue yet</h1>
                        :
                        <>
                            <Bar options={options} data={chartData} />
                            {revenue.map((item, index) => {
                                return (
                                    <button className='btn btn-primary' onClick={() => handleButtonClick(index)} key={item.year}>{item.year}</button>
                                )
                            })}
                        </>
                }
            </div>
        </>
    );
}