
let input = document.getElementById("input")
let testData = []
let testDataCounter = 0
let testDataArray = [];
let counter = 0
let testLabel = [];
let numberArray = [];
let highNumber = 0;
let highNumberInput = 0;
let highNumberTemp = 0;
const runBtn = document.getElementById("run-btn");
const runArrayBtn = document.getElementById("run-array-btn");
const numberHi = document.getElementById("number-hi");


runBtn.addEventListener("click", (e) => {
    if (testDataArray.length !== 0) return; //guard clause to not repopulate array

    runCollatz(input.value);
});



let autoArray1 = []
let autoArray = {};
runArrayBtn.addEventListener("click", (e) => {

    console.log("testDataArray", testDataArray);// This log show all arrays
    // creates the dataset object
    for (item in testDataArray){
        autoArray1.push(
            autoArray = {
                borderColor: 'green',
                borderWidth: 1,
                radius: 0,
                data: testDataArray[item],
            }
        );
        // console.log(autoArray);
    }

    // sends the new dataset to draw the graph
    newChart(autoArray1);
});



input.addEventListener("keyup", (e) => {
    if(e.code !== "Enter" || testDataArray.length !== 0) return; // guard clause to stop all others than 'enter' key and not repopulate array 

    runCollatz(input.value)
});


// will try to find highest number here. And maybe longest 'string'
numberHi.addEventListener("click", (e) => {
    console.log(highNumber); // writes out the highest number
    console.log("Highest number came from: " + highNumberInput + " And are: " + highNumber  );

    console.log(testDataArray);
    console.log(Math.max(...testDataArray.keys())); // test: finner høyeste key i arrayet
    let values10 = Object.keys(testDataArray[8]); // test
    console.log(values10);
    console.log(Math.max(...values10) );
});





// make array of numbers from 0 to input.value
function runCollatz(number) {
    for (i = 0 ; i <= number; i++){ 
        numberArray.push(i)
        // console.log(numberArray)
    }


    // console.log(numberArray);
    // sends each number from 6 to input.value, to collatz()
    for (num in numberArray){
        if ( numberArray[num] > 5){
            // console.log("num in numberArray:", numberArray[num]);
            // console.log(numberArray);
            collatz(numberArray[num])
        
        }
    }
};


function collatz(number) {
        
    // let i = number
    // numberArray.push(i);
    // let tempNumber = i;
    // console.log("log 'number", number);
    // console.log(number);
    let teller = counter++
    // testLabel.push(teller)
    // console.log("testlabel:", testLabel);
    // console.log(num);
    highNumberTemp = number;

    
    if (number > 2){ // skipping numbers 1 and 2

        // decides if number is odd or even and does the math
        switch (number % 2) {
            case 0:
                // console.log("partall:", number);
                number = number/2;
                break;
            case 1:
                // console.log("oddetall:",number);
                number = number * 3 + 1;
                break;
        }
    }

    else {

        testDataArray.push(testData)
        testData = [];
        counter = 0

        // const ctx = document.getElementById('myCanvas').getContext('2d');
        // myChart = new Chart(ctx, {
        // // document.getElementById('myChart'),
        // config
        // });

        // draws the chart
        // newChart();
        
    

        // myChart.destroy();
        // myChart.render();
        // myChart.reset();
        // myChart.update();
         return "intet nummer";
    };

    testData.push({x: teller, y: number});

    // get the highest number in collatz
    // PS: kanskje finne en måte å gjøre dette med math.max i en event listener hvis jeg kan få det mer effektivt og kan gjøre det på request.
    if (number > highNumber) {
        highNumber = number
        highNumberInput =  numberArray[num]; // get the starting number from numberArray[num] in runCollatz() function
    };
    
 collatz(number); // runs function in loop while i > 1 and push new value to value array (testData)
}; // end collatz()


