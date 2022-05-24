let response = d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then((data) => {
        const dataset = data.data;
        console.log(dataset);
        let years = dataset.map((item) => {
            let quarter = "";
            let helper = item[0].substring(5, 7);
            switch (helper) {
                case "01":
                    quarter = "Q1";
                    break;
                case "04":
                    quarter = "Q2";
                    break;
                case "07":
                    quarter = "Q3";
                    break;
                case "10":
                    quarter = "Q4";
                    break;
            }
            return quarter + ' ' +  item[0].substring(0, 4);
        });
        console.log(years);
        const w = 700;
        const h = 320;
        const padding = 1;
        const width = (700-275) / 275;
        const scale = 0.01;

        const xScale = d3.scaleLinear()
            .domain([new Date("1947-01-01"), new Date("2015-07-01")])
            .range([0, w]);
        

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(d3.timeFormat("%Y"))
            .tickSize(5);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset[1])[1]])
            .range(h - 20, 0);
        
        const yAxis = d3.axisLeft()
            .scale(yScale);
        
        const visual = d3.select("#visHolder")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("width", width)
            .attr("height", (d) => {
                return d[1] * scale;
            })
            .attr("x", (d, i) => {
                return i * (width + padding)
            })
            .attr("y", (d, i) => {
                return (h-20) - d[1] * scale;
            });
        const axisB = d3.select("svg")
            .append("g")
            .call(xAxis)
            .attr('id', 'x-axis');
        
        const axisL = d3.select("svg")
            .append("g")
            .call(yAxis)
            .attr('id', 'y-axis');

})


//h-d*scale