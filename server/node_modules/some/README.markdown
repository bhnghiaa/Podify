# Some
A JavaScript library that adds **some** helper functions to strings and arrays for fun and profit.
Built on top of my very cool [reservoir library](http://github.com/imbcmdth/reservoir).

## Installation

### Node.js

For *Node.js*, use `npm`:

````console
npm install some
````

..then `require` Some:

````javascript
var Some = require('some');
````

### In the browser, traditional

For the *browser*, add the following to your pages:

````html
<script src="reservoir/reservoir.js"></script>
<script src="some.js"></script>
````

### In the browser, using AMD (require.js)

...Or using AMD in the browser:

````javascript
require(["some"], function(Some) {
	// ...
});
````

## Usage

`Some` is an object that contains two *decorator functions*: `Array` and `String`. The purpose of the decorator functions is to add some new methods to an existing `Array` or `String`.

### Basic

We can use these functions to decorate a single string or array object:

````javascript
var myString = Some.String("A simple wish in the wind is like a bird on the dish.");

var myArray = Some.Array([1, 2, 3, 4, 5 ,6, 7, 8, 9, 10]);
````

Now, using those objects we can use some of the new functions:

````javascript
// replace 3 occurances of the letter "i" followed by at least two letters
// with the letter "a"
var newString = myString.replaceSome(/i(\w{2,})/g, 3, "a$1");

newString => "A simple wash in the wind is like a bard on the dash."

// Calculate the average value of 3 randomly chosen values
var average = myArray.reduceSome(3, function(prev, curr, i) {
	var diff = curr - prev;
	return prev + diff / (i + 1);
});

average => 4.333333333333333
````

### Advanced Usage

If you want to use these decorations with *all* strings and arrays within your script they can be applied to the `String.prototype` and `Array.prototype` objects:

````javascript
Some.String(String.prototype);
Some.Array(Array.prototype);
````

## Decorations

There are two decorators included within Some object:

* [Some.String](https://github.com/imbcmdth/some#somestringstringtodecorate)
    * [String#replaceSome](https://github.com/imbcmdth/some#stringreplacesomeregexpsubstr-numtoreplace-newsubstrfunction)
* [Some.Array](https://github.com/imbcmdth/some#somearrayarraytodecorate)
    * [Array#sliceSome](https://github.com/imbcmdth/some#arrayslicesomenumtoreturn-begin-end)
    * [Array#filterSome](https://github.com/imbcmdth/some#arrayfiltersomenumtoevaluate-callback-thisarg)
    * [Array#forSome](https://github.com/imbcmdth/some#arrayforsomenumtoevaluate-callback-thisarg)
    * [Array#everySome](https://github.com/imbcmdth/some#arrayeverysomenumtoevaluate-callback-thisarg)
    * [Array#someSome](https://github.com/imbcmdth/some#arraysomesomenumtoevaluate-callback-thisarg)
    * [Array#reduceSome](https://github.com/imbcmdth/some#arrayreducesomenumtoevaluate-callback-initialvalue)
    * [Array#reduceRightSome](https://github.com/imbcmdth/some#arrayreducerightsomenumtoevaluate-callback-initialvalue)
    * [Array#mapSome](https://github.com/imbcmdth/some#arraymapsomenumtoevaluate-callback-thisarg)
    * [Array#mapSomeSparse](https://github.com/imbcmdth/some#arraymapsomesparsenumtoevaluate-callback-thisarg)

### Some.String(`[stringToDecorate]`)

##### Returns

`stringToDecorate` if provided otherwise a new empty `String` with the following function added to it:

* [String#replaceSome](https://github.com/imbcmdth/some#stringreplacesomeregexpsubstr-numtoreplace-newsubstrfunction)

#### String#replaceSome(`regexp|substr, numToReplace, newSubStr|function`)

Replaces `numToReplace` number of `regexp|substr` matches with `newSubStr|function`.

##### Parameters

`regexp` A RegExp object. The match is replaced by the return value of parameter #2.

`substr` A String that is to be replaced by newSubStr.

`numToReplace` A Number. Maximum number of replacements to make.

`newSubStr` The String that replaces the substring received from parameter #1. A number of special replacement patterns are supported; see the "Specifying a string as a parameter" section below.

`function` A function to be invoked to create the new substring (to put in place of the substring received from parameter #1). The arguments supplied to this function are described in the "Specifying a function as a parameter" section below. 

##### Returns

The new `String` that is the result of performing the requested number of replacements.

### Some.Array(`[arrayToDecorate]`)

##### Returns

`arrayToDecorate` if provided otherwise a new empty `Array` with the following functions added to it:

* [Array#sliceSome](https://github.com/imbcmdth/some#arrayslicesomenumtoreturn-begin-end)
* [Array#filterSome](https://github.com/imbcmdth/some#arrayfiltersomenumtoevaluate-callback-thisarg)
* [Array#forSome](https://github.com/imbcmdth/some#arrayforsomenumtoevaluate-callback-thisarg)
* [Array#everySome](https://github.com/imbcmdth/some#arrayeverysomenumtoevaluate-callback-thisarg)
* [Array#someSome](https://github.com/imbcmdth/some#arraysomesomenumtoevaluate-callback-thisarg)
* [Array#reduceSome](https://github.com/imbcmdth/some#arrayreducesomenumtoevaluate-callback-initialvalue)
* [Array#reduceRightSome](https://github.com/imbcmdth/some#arrayreducerightsomenumtoevaluate-callback-initialvalue)
* [Array#mapSome](https://github.com/imbcmdth/some#arraymapsomenumtoevaluate-callback-thisarg)
* [Array#mapSomeSparse](https://github.com/imbcmdth/some#arraymapsomesparsenumtoevaluate-callback-thisarg)

#### Array#sliceSome(`numToReturn[, begin][, end]`)

Returns a one-level deep copy of a portion of an array.

##### Parameters

`numToReturn` Number of array elements to randomly select for the new `Array`.

`begin` Zero-based index at which to begin extraction. As a negative index, `begin` indicates an offset from the end of the sequence. `sliceSome(number, -2)` extracts up to `numToReturn` elements starting from the second-to-last element in the sequence. If `begin` is omitted, `sliceSome` extracts from the beginning of the sequence.

`end` Zero-based index at which to end extraction. `sliceSome` extracts up to but not including `end`. `slice(number, 1, 4)` extracts up to `numToReturn` elements starting from the second element through the fourth element (elements indexed 1, 2, and 3). As a negative index, `end` indicates an offset from the end of the sequence. `sliceSome(number, 2,-1)` extracts up to `numToReturn` elements from the third element through the second-to-last element in the sequence. If `end` is omitted, `sliceSome` extracts to the end of the sequence. 

##### Returns

A new `Array` containing a random sample of `numToReturn` elements from `begin` to `end`.

#### Array#filterSome(`numToEvaluate, callback[, thisArg]`)

Creates a new array with all elements that pass the test implemented by the provided function.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function to test each element of the array.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

A new `Array` containing the values returned from `callback`.

#### Array#forSome(`numToEvaluate, callback[, thisArg]`)

Executes a provided `callback` once per chosen array element.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function to execute for each element.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

Nothing.

#### Array#everySome(`numToEvaluate, callback[, thisArg]`)

Tests whether the chosen elements in the array pass the test implemented by the provided function.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function to test for each element.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

A boolean. True if all chosen elements of the array passed the test in `callback`. Otherwise, false.

#### Array#someSome(`numToEvaluate, callback[, thisArg]`)

Tests whether some element in the array passes the test implemented by the provided function.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function to test for each element.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

A boolean. True if any of the chosen elements of the array passed the test in `callback`. Otherwise, false.

#### Array#reduceSome(`numToEvaluate, callback[, initialValue]`)

Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.

##### Parameters

`callback` Function to execute on each value in the array, taking four arguments:

> `previousValue` The value previously returned in the last invocation of the callback, or initialValue, if supplied. (See below.)
>
> `currentValue` The current element being processed in the array.
>
> `index` The index of the current element being processed in the array.
>
> `array` The array reduce was called upon.

`initialValue` Object to use as the first argument to the first call of the callback. 


#### Array#reduceRightSome(`numToEvaluate, callback[, initialValue]`)

Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.

##### Parameters

`callback` Function to execute on each value in the array, taking four arguments:

> `previousValue` The value previously returned in the last invocation of the callback, or initialValue, if supplied. (See below.)
>
> `currentValue` The current element being processed in the array.
>
> `index` The index of the current element being processed in the array.
>
> `array` The array reduce was called upon.

`initialValue` Object to use as the first argument to the first call of the callback. 

#### Array#mapSome(`numToEvaluate, callback[, thisArg]`)

Creates a new array with the results of calling a provided function on every element in this array.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function that produces an element of the new Array from an element of the current one.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

A new `Array` containing the values returned from `callback`.

#### Array#mapSomeSparse(`numToEvaluate, callback[, thisArg]`)

Creates a new array with the results of calling a provided function on every element in this array.

**Note** The returned array will have the same length as the original array. All elements except for the chosen subset of elements returned will be undefined.

##### Parameters

`numToEvaluate` Number of array elements to randomly select for the `callback`.

`callback` Function that produces an element of the new Array from an element of the current one.

`thisArg` Object to use as `this` when executing `callback`. 

##### Returns

A new `Array` containing the values returned from `callback`.