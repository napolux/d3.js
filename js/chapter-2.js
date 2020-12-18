function makeDemo1() {
    // I'm using csv because I hate tsv
    d3.csv('/data/example-simple.csv').then(data => {
        d3.select('#demo1')
            .selectAll('circle') // creates an empty collection
            .data(data) // tries to associate data
            .enter() // uses data from unmatched stuff
            .append('circle')
            .attr('r', 5).attr('fill', 'red') // radius 5
            .attr('cx', d => d['x']) // center x
            .attr('cy', d => d['y']); // center y
    });
}

function makeDemo2() {
    d3.csv('/data/example-multiple.csv').then(data => {
        // scaling to sizes... (fixed, but we can think of getting these via js)
        const pxX = 600, pxY = 300;

        const chart = d3.select('#demo2');

        // scaling the 3 colums in the dataset to the size of the chart...
        var scX = d3.scaleLinear()
            .domain(d3.extent(data, d => d['x']))
            .range([0, pxX]);

        var scY1 = d3.scaleLinear()
            .domain(d3.extent(data, d => d['y1']))
            .range([pxY, 0]);

        var scY2 = d3.scaleLinear()
            .domain(d3.extent(data, d => d['y2']))
            .range([pxY, 0]);

        chart.append('g').attr('id', 'ds1')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 5).attr('fill', 'green') // radius 5
            .attr('cx', d => scX(d['x']))
            .attr('cy', d => scY1(d['y1']));

        chart.append('g').attr('id', 'ds2')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 5).attr('fill', 'blue') // radius 5
            .attr('cx', d => scX(d['x']))
            .attr('cy', d => scY2(d['y2']));

        const lineMaker = d3.line()
            .x(d => scX(d['x']))
            .y(d => scY1(d['y1']));

        d3.select('#ds1')
            .append('path')
            .attr('fill', 'none').attr('stroke', 'red')
            .attr('d', lineMaker(data));

        lineMaker.y(d => scY2(d['y2']));

        d3.select('#ds2')
            .append('path')
            .attr('fill', 'none').attr('stroke', 'cyan')
            .attr('d', lineMaker(data))
    });
}