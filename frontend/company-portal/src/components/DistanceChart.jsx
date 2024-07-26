import React from "react";
import { Bar } from "react-chartjs-2";
import { getDistance } from "geolib";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { POLYLINE_COLORS } from "../constants/global";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DistanceChart = ({ locations }) => {

  const metersToMiles = (meters) => meters / 1609.344;

  const formatDistance = (miles) => {
    if (miles >= 1000) {
      return `${(miles / 1000).toFixed(2)} thousand miles`;
    } else {
      return `${miles.toFixed(2)} miles`;
    }
  };

  const calculateDistances = (locations) => {
    return locations.flatMap((location1, i) =>
      locations.slice(i + 1).map((location2) => {
        const distanceInMeters = getDistance(
          { latitude: location1.latitude, longitude: location1.longitude },
          { latitude: location2.latitude, longitude: location2.longitude }
        );
        const distanceInMiles = metersToMiles(distanceInMeters);
        return {
          distance: distanceInMiles,
          formattedDistance: formatDistance(distanceInMiles),
          label: `${location1.name} to ${location2.name}`,
          from: location1.name,
          to: location2.name,
        };
      })
    );
  };

  const distanceData = calculateDistances(locations);
  const distances = distanceData.map((d) => d.distance);
  const labels = distanceData.map((d) => d.label);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Distance (miles)",
        data: distances,
        backgroundColor: POLYLINE_COLORS,
        borderColor: POLYLINE_COLORS,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: function (chart) {
            const data = chart?.data;
            if (data?.labels?.length && data?.datasets?.length) {
              return data?.labels?.map((label, i) => {
                const meta = chart?.getDatasetMeta(0);
                const style = meta?.controller?.getStyle(i);

                return {
                  text: label,
                  fillStyle: POLYLINE_COLORS[i],
                  strokeStyle: POLYLINE_COLORS[i],
                  lineWidth: style?.borderWidth,
                  hidden:
                    isNaN(data?.datasets[0]?.data[i]) || meta?.data[i]?.hidden,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: "Distances Between Locations (in miles)",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context?.dataIndex;
            return distanceData[dataIndex].formattedDistance;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Distance (miles)",
        },
        ticks: {
          callback: function (value) {
            return formatDistance(value);
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DistanceChart;
