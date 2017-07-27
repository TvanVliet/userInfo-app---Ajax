// given an array of values, write a function that finds the index of where the value is located, 
//and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

var array = ['apple', 'orange', 'orange', 'pineapple']

function findIndex(array, input) {
	console.log(array.indexOf(input));
}

findIndex(array, 'orange');


// now, write a function that finds all the indexes of where the 
//value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

function allIndex(array, input) {
	var emptyArray = [];
	
	for (var i = 0; i < array.length; i++) {
		if(input == array[i]) {
			emptyArray.push(array.indexOf(input));
			delete array[i];
		};
	};
	console.log(emptyArray);
	};

allIndex(array, 'orange');