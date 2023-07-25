import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { AppContext } from "./AppContext";

/**
 * Interfaces to define data structure.
 * @interface
 */
interface InterfacePartnerIdentifier {
  entity_id: string;
  asym_id: string;
}
interface PartnerData {
  interface_partner_identifier: InterfacePartnerIdentifier;
  table_data: number[][];
}

/**
 * Line chart graph component.
 * @component
 */
const LineChartComponent: React.FC<{ data: PartnerData[] }> = ({ data }) => {
  const context = useContext(AppContext);

  if (!context || !context.data) {
    return null;
  }

  return (
    <>
      {data.map((item, index) => {
        const labels = item.table_data.map((item) => item[0].toString());
        const barData = item.table_data.map((item) => item[item.length - 1]);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "ASA Change",
              data: barData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(75, 192, 192, 0.8)",
                "rgba(153, 102, 255, 0.8)",
                "rgba(255, 159, 64, 0.8)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 3,
            },
          ],
        };

        const options = {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                color: "black",
                font: {
                  weight: 500,
                },
              },
              ticks: {
                color: "black",
                font: {
                  weight: 500,
                },
              },
            },
            x: {
              title: {
                color: "black",
                font: {
                  weight: 500,
                },
              },
              ticks: {
                color: "black",
                font: {
                  weight: 500,
                },
              },
            },
          },
        };

        return <Line key={index} data={chartData} options={options} />;
      })}
    </>
  );
};

export default LineChartComponent;
