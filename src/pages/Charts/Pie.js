import React from "react";
import { ChartsHeader, Pie as PieChart } from "../../components";

const Pie = (props) => {
  const { good, fair, satisfactory, unsatisfactory, poor } = props.data
  const pieChartData = [
    { x: "Poor", y: poor, text: poor + "%" },
    { x: "Unsatisfactory", y: unsatisfactory, text: unsatisfactory + "%" },
    { x: "Satisfactory", y: satisfactory, text: satisfactory + "%" },
    { x: "Fair", y: fair, text: fair + "%" },
    { x: "Good", y: good, text: good + "%" },
  ];
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="" title="Students Response"/>
      <div className="w-full">
        <PieChart
          id="chart-pie"
          data={pieChartData}
          legendVisiblity
          height="full"
        />
      </div>
    </div>
  )
};

export default Pie;
