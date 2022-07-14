// const { Chart } = require("chart.js/dist/chart");

let input = document.getElementById("input")
let testData = []
// const myChart = [];
let counter = 0
let testLabel = [];
let numberArray = [];
const runBtn = document.getElementById("run-btn");


runBtn.addEventListener("click", (e) => {
    // testData = []; // forsøk på å fjerne data for å kunne lage ny graf over gammel
    // testLabel = [];
    collatz(input.value);
    // window.myCanvas = null
    
})



function collatz(number) {
    i = 3;
    for ( ; i <= input.value; i++){    
        
        // let i = number
        // numberArray.push(i);
        let tempNumber = i;
        console.log(i);
        console.log(number);
        let teller = counter++
        // testLabel.push(teller)
        // console.log("testlabel:", testLabel);

        if (tempNumber > 2){

            switch (tempNumber % 2) {
                case 0:
                    console.log("partall:", tempNumber);
                    tempNumber = tempNumber/2;
                    break;
                case 1:
                    console.log("oddetall:",tempNumber);
                    tempNumber = tempNumber * 3 + 1;
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
        testData.push({x: teller, y: tempNumber});
        console.log("testdata:", testData);
        // newChart()
       collatz(tempNumber); // runs function in loop while i > 1 and push new value to graph array (testData)
    }
};







input.addEventListener("keyup", (e) => {
    console.log(e.code);
    if(e.code !== "Enter") return; // guard clause to stop all others than 'enter' key
    // console.log(input.value);
    collatz(input.value)
})




