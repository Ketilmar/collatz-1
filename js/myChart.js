

// random data for test
const data = [];
const data2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 200; i++) {
  prev += 5 - Math.random() * 10;
  data.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
}




const totalDuration = 3000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};




//////////////////
///// config /////

 const ctx = document.getElementById('myCanvas').getContext('2d');

 // forsøk på å få inn data fra array
//  let dataFromArray = null
//  for (dataset in testDataArray){
//     dataFromArray = dataset;
//  }

 function newChart(autoArray1){

  // console.log(autoArray1);
  // console.log(previousY);
     const myChart = new Chart(ctx, {
    // const config = {
        type: 'line',
        data: {
        datasets: 
          autoArray1
            // borderColor: Utils.CHART_COLORS.red,
            // borderColor: 'red',
            // borderWidth: 1,
            // radius: 0,
            // data: testDataArray,
            // data: dataFromArray,
        

        },
        options: {
          animation,
          interaction: {
              intersect: false
          },
          plugins: {
              legend: false
          },
          scales: {
              x: {
              type: 'linear'
              }
          }
        }
    });
}
    // console.log(myChart);
    // console.log(ctx);
    // myChart.destroy();   // with destroy() this results in endless loop. Not in this version. Then my collatz loop are able to run but no graph
    // myChart.render();
    // myChart.reset();
    // myChart.update('active');
