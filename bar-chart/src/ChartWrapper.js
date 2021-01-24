import React, { useRef, useEffect, useState } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartRef.current));
    } else {
      // chart.update();
    }
  }, [chart]);

  return <div ref={chartRef}></div>;
};

export default ChartWrapper;
