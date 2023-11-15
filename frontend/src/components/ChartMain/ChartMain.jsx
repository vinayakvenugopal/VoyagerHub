import React from "react";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const ChartMain = ({datas}) => {

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltips: {
      position: "nearest",
      mode: "index",
      intersect: false,
      yPadding: 10,
      xPadding: 10,
      caretSize: 4,
      backgroundColor: "rgba(72, 241, 12, 1)",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "#1967d2",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 4,
    },
  },
};


// Assuming your data is an array of objects like the ones you provided
const dataPoints = datas
const labels = dataPoints.map((point) =>
  new Date(point._id.year, point._id.month - 1, point._id.day).toLocaleDateString()
);
const data = {
  labels,
  datasets: [
    {
      label: "Dataset",
      data: dataPoints.map((point) => point.totalBookingAmount),
      borderColor: "#1967d2",
      backgroundColor: "#1967d2",
      fill: false,
    },
  ],
};

  return (
    <div className="widget-content">
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartMain;
