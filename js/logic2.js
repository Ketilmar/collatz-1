
let input = document.getElementById("input")
let testData = []
let testDataCounter = 0
let testDataArray = [];
// const myChart = [];
let counter = 0
let testLabel = [];
let numberArray = [];
const runBtn = document.getElementById("run-btn");
const runArrayBtn = document.getElementById("run-array-btn");


runBtn.addEventListener("click", (e) => {
    // testData = []; // forsøk på å fjerne data for å kunne lage ny graf over gammel
    // testLabel = [];
    runCollatz(input.value);
    // window.myCanvas = null
    
});


runArrayBtn.addEventListener("click", (e) => {
    // testData = []; // forsøk på å fjerne data for å kunne lage ny graf over gammel
    // testLabel = [];
    newChart();
    // window.myCanvas = null
    
});



input.addEventListener("keyup", (e) => {
    console.log(e.code);
    if(e.code !== "Enter") return; // guard clause to stop all others than 'enter' key
    // console.log(input.value);
    runCollatz(input.value)
});





i = 0;
// make array of numbers from 0 to input.value
function runCollatz(number) {
for ( ; i <= number; i++){ 
    numberArray.push(i)
    console.log(numberArray)
}


// console.log(numberArray);
// sends each number from 0 to input.value, to collatz()
for (num in numberArray){
    if ( num > 5){
        console.log("num in numberArray:", numberArray[num]);
        collatz(numberArray[num])
    
    }
}
};


function collatz(number) {
        
    // let i = number
    // numberArray.push(i);
    // let tempNumber = i;
    console.log("log 'number", number);
    // console.log(number);
    let teller = counter++
    // testLabel.push(teller)
    // console.log("testlabel:", testLabel);
    // console.log(num);

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
        // console.log(window.myCanvas);

        testDataArray.push(testData)
        console.log("testDataArray", testDataArray);
        testData = [];
        counter = 0

        // const ctx = document.getElementById('myCanvas').getContext('2d');
        // myChart = new Chart(ctx, {
        // // document.getElementById('myChart'),
        // config
        // });
            
        // PS ///
        // jeg må fylle hele arrayet før jeg sender det til newChart kanskje

        // draws the chart
        // newChart();
        
    

        // myChart.destroy();
        // myChart.render();
        // myChart.reset();
        // myChart.update();
         return "intet nummer";
    }

    
    // data = number
    testData.push({x: teller, y: number});
    console.log("testdata:", testData);
    
 collatz(number); // runs function in loop while i > 1 and push new value to graph array (testData)
};


