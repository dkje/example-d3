import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
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

    // get remote data
    d3.json(url).then((data) => {
      vis.data = data;
      d3.interval(() => {
        vis.update();
      }, 1000);
    });
  }

  update() {
    const vis = this;
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
    vis.xAxisGroup.attr("transform", `translate(0,${HEIGHT})`).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.call(yAxisCall);

    // const rects = vis.svg.selectAll("rect").data(data);

    // rects
    //   .enter()
    //   .append("rect")
    //   .attr("x", (d, i) => x(d.name))
    //   .attr("y", (d) => y(d.height))
    //   .attr("width", x.bandwidth)
    //   .attr("height", (d) => HEIGHT - y(d.height)) // y range가 역순이 되었기 때문에 재 계산
    //   .attr("fill", "grey");
  }
}
