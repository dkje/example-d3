import * as d3 from "d3";

const menUrl = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const womenUrl = "https://udemy-react-d3.firebaseio.com/tallest_women.json";
const MARGIN = { TOP: 10, BOTTOM: 60, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element) {
    const vis = this;
    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    // apeend labels
    vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");

    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)");

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    Promise.all([d3.json(menUrl), d3.json(womenUrl)]).then((datasets) => {
      vis.menData = datasets[0];
      vis.womenData = datasets[1];
      vis.update("men");
    });
  }

  update(gender) {
    console.log("update:", gender);
    const vis = this;
    vis.data = gender === "men" ? vis.menData : vis.womenData;
    // vis.xLabel.text(`The world's tallest ${gender}`);
    if (!vis.data) return;

    // scale
    const max = d3.max(vis.data, (d) => d.height); // 가장 큰 키를 반환한다
    const min = d3.min(vis.data, (d) => d.height);
    const y = d3
      .scaleLinear()
      .domain([min * 0.95, max * 1.01])
      .range([HEIGHT, 0]); // 위로 갈수록 높은 값이 되도록 세팅
    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    //create Axis
    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .attr("transform", `translate(0,${HEIGHT})`)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // Data join
    const rects = vis.svg.selectAll("rect").data(vis.data);

    //Exit
    rects
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .remove();

    //Update
    rects
      .transition()
      .duration(500)
      .attr("x", (d, i) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.height));

    // Enter
    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(d.name))
      .attr("width", x.bandwidth)
      .attr("fill", "grey")
      .attr("y", HEIGHT) // 기존 style
      .transition() //y속성에만 transition 적용
      .duration(500)
      .attr("height", (d) => HEIGHT - y(d.height))
      .attr("y", (d) => y(d.height)); // animation이 적용될 높이
  }
}
