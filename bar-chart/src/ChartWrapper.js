import React, { useRef, useEffect, useState } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = ({ gender }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    if (!chart) {
      console.log("no chart");
      setChart(new D3Chart(chartRef.current));
    } else {
      console.log("is chart");
      chart.update(gender);
    }
  }, [chart, gender]);

  return <div ref={chartRef}></div>;
};

export default React.memo(ChartWrapper, () => false);
