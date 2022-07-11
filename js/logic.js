// const { Chart } = require("chart.js/dist/chart");

let testData = []
// const myChart = [];
let counter = 0
let testLabel = [];
const runBtn = document.getElementById("run-btn");


runBtn.addEventListener("click", (e) => {
    // testData = []; // forsøk på å fjerne data for å kunne lage ny graf over gammel
    // testLabel = [];
    collatz(input.value);
    // window.myCanvas = null
    
})



function collatz(number) {
    for (i = number; i > 1;){
        console.log(i);
        let teller = counter++
        testLabel.push(teller)
        // console.log("testlabel:", testLabel);

        if (number > 2){

            switch (number % 2) {
                case 0:
                    console.log("partall:", number);
                    number = number/2;
                    break;
                case 1:
                    console.log("oddetall:",number);
                    number = number * 3 + 1;
                    break;
            }
        }

        else {
            console.log("no number");
            console.log(window.myCanvas);

            // draws the chart
            newChart()
            // myChart = new Chart(
            //     document.getElementById('myChart'),
            //     config
            //   );
            //   myChart.update();
            // return "intet nummer";
            
        }

        // data = number
        testData.push({x: teller, y: i});
        // console.log("testdata:", testData);

        collatz(number); // runs function in loop while i > 1 and push new value to graph array (testData)
        
    }

}




let input = document.getElementById("input")

input.addEventListener("keyup", (e) => {
    console.log(e.code);
    if(e.code !== "Enter") return; // guard clause to stop all others than 'enter' key
    // console.log(input.value);
    collatz(input.value)
})




