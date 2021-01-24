import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

export default class D3Chart {
  constructor(element) {
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", 800)
      .attr("height", 500);

    this.init();
  }

  async init() {
    const data = await d3.json(url);
    console.log(data);

    const rects = this.svg.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 100)
      .attr("y", 0)
      .attr("width", 50)
      .attr("height", (d) => (d.height - 230) * 10)
      .attr("fill", "grey");
  }
}
