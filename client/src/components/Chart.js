import React, { Component } from 'react';
import Chart from 'chart.js';
import { Pie } from 'react-chartjs-2';

export default (props) => {
    const labels = props.options.map(option => option.title);
    const data = props.options.map(option => option.votes);

    //need to randomly generate colors for each option
    const chartData = {
        labels: labels,
        datasets:[{
            label: 'Vote Breakdown',
            data: data,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#F40000",
                "#34F000",
                "#FFFFFF"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#000000",
                "#FFFFFF",
                "#FFAE23"
            ]
        }]
    }

    const chartOptions = {
        maintainAspectRatio: false,
        elements: {
            arc: {
                borderColor: "#000000"
            }
        }
    }

    return (
        <div className="vote-chart">
            <Pie data={chartData} 
            options={chartOptions} 
            width={300} 
            height={200}/>
        </div>
    );
} 

