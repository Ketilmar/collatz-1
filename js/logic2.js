
let input = document.getElementById("input")
let collatzArray = []
let collatzArrayObj = [];
let counter = 0
let numberArray = [];
let startNumber = 0;
let highNumber = 0;
let highNumberInput = 0;
let steps = 0
const runBtn = document.getElementById("run-btn");
const runArrayBtn = document.getElementById("run-array-btn");
const numberHi = document.getElementById("number-hi");


runBtn.addEventListener("mouseup", (e) => {

    //guard clause to not repopulate array
    if (collatzArrayObj.length !== 0) return; 

    runCollatz(input.value);
});




runArrayBtn.addEventListener("mouseup", (e) => {

    let configArray = []
    let configObj = {};

    console.log("collatzArrayObj", collatzArrayObj);// This log show all arrays

    // creates the dataset object for chart.js
    for (item in collatzArrayObj){

        configArray.push(

            configObj = {
                borderColor: 'green',
                borderWidth: 1,
                radius: 0,
                data: collatzArrayObj[item],
            }
        );
    };

    // sends the new dataset to draw the graph
    newChart(configArray);
});



input.addEventListener("keyup", (e) => {

    // guard clause to stop all others than 'enter' key and not repopulate array 
    if(e.code !== "Enter" || collatzArrayObj.length !== 0) return; 

    runCollatz(input.value)
});




// get the highest number, the number it started from and how many step it took.
numberHi.addEventListener("mouseup", () => {
    console.log("Highest number came from: " + highNumberInput + ". And is: " + highNumber + ". This took " + (steps - 1) + " steps."  );

    //TEST: another way to find highest number in object
    // need to find an effective way to log out/show the data from nyTestMetode1 before use
    let tmpVar = []
    collatzArrayObj.forEach((e) => {

        // this gets the highest number in each collatz loop and the loop count at which it occurred. Stored as an object
        let nyTestMetode1 = e.reduce((previous, current) => previous.y > current.y ? previous : current);

        // this gets the start number, highest value reached, steps to highest value and total steps of each collatz loop
        console.log("Starting nr: ", e[0].y, "highest nr: ", nyTestMetode1.y, "Steps to highest nr: ", nyTestMetode1.x, "Total steps: ", (e.length - 1));

        // console.table(e);

        // this saves the values as an array
        e.forEach((e) => {
            tmpVar.push(e.y);
            
        });
        //  Object.entries(e).forEach(keyValuePair => {console.log("  ",...keyValuePair)}); // hjelper ikke meg?
    });
    // console.log(Math.max(...tmpVar)); // NOTE: this gets the highest overall number. Get error message from number 1874 up: "Uncaught RangeError: Maximum call stack size exceeded"
    // console.log(tmpVar);

});





// make array of numbers from 0 to input.value
function runCollatz(number) {

    // zero'z the counter for next collatz
    counter = 0
    
    for (i = 0 ; i <= number; i++){ 
        
        numberArray.push(i)
    }


    // console.log(numberArray);
    // sends each number from 3 to input.value, to collatz()
    for (num in numberArray){

        if ( numberArray[num] > 2){

            collatz(numberArray[num])
        
        }
    }
};




function collatz(number) {

    // put in the initial number in each loop to object
    if (collatzArray.length === 0){
        // if ( collatzArray[index].Status !== "Valid" ) {

        collatzArray.push(
            {
                x: counter++, 
                y: number
            });
    };

    
    if (number > 2){ // skipping numbers 1 and 2

        // decides if number is odd or even and does the math
        switch (number % 2) {
            case 0:
                number = number/2;
                break;
            case 1:
                number = number * 3 + 1;
                break;
        };
    } 
    else {

        // when collatz loop reach 2, the array of object is stored in this array
        collatzArrayObj.push(collatzArray)
        collatzArray = [];
        counter = 0
        

        // const ctx = document.getElementById('myCanvas').getContext('2d');
        // myChart = new Chart(ctx, {
        // // document.getElementById('myChart'),
        // config
        // });

        // draws the chart
        // newChart();
        
         return // stops the collatz loop to continue indefinitely when reach 2
    };

    // fill the array
    collatzArray.push(
        {
            x: counter++,
            y: number
        });

    // get the highest number in collatz and number that started the loop
    // PS: kanskje finne en måte å gjøre dette med math.max i en event listener hvis jeg kan få det mer effektivt og kan gjøre det på request.
    if (number > highNumber) {
        highNumber = number
        highNumberInput =  numberArray[num]; // get the starting number from numberArray[num] in runCollatz() function
        steps = counter
    };
    
 collatz(number); // runs function in loop while i > 1 and push new value to value array (collatzArray)
}; // end collatz()


