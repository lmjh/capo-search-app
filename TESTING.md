# Testing of Capo Search App
## Code Validation

All site code was validated using the following services:

* HTML code validated with W3C [HTML Validator](https://validator.w3.org/nu/).

* CSS code validated with W3C [CSS Validator](https://jigsaw.w3.org/css-validator/).

* Javascript code validated with [JSHint](https://jshint.com/).

## Javascript Testing With Jest

All of the application's Javascript functions and objects have been tested using Jest. The tests were written after the application was largely complete and functional, rather than written alongside the application code as in a Test Driven Development process. I chose to use this approach as this was the first significant Javascript project I'd worked on and it seemed impractical to learn to write Jest tests alongside learning to write the application code.

### Jest Configuration

Testing the application with Jest proved to be somewhat difficult due to the jQuery used, which Jest is not equipped to handle by default. After a good deal of research, I managed to configure the test suite to handle jQuery with the following steps:

1. Use the node package manager to install jquery using the following command:
```
npm install jquery
```
2. Include the following code at the top of the test specification file (based on solutions to similar issues discussed in threads [here](https://stackoverflow.com/questions/38309405/how-can-i-fix-referenceerror-is-not-defined-when-using-jquery-with-mocha-js) and [here](https://stackoverflow.com/questions/41844947/reactjs-jest-jquery-is-not-defined), among others): 
```
const $ = require('jquery');
global.$ = global.jQuery = $;
```
3. Include the following code in the test specification file to disable (and then re-enable) jQuery animations that were causing tests to fail (based on the solution in [this thread](https://stackoverflow.com/questions/53732869/testing-jquery-animations-with-jest)):
```
beforeAll(() => {
    $.fx.off = true;
})
afterAll(() => {
    $.fx.off = false;
})
```

It was also necessary to setup Jest to work with Bootstrap functions, as I used Bootstrap tooltips in the application. I wasn't able to import the neessary Javascript files into Jest from a CDN as I normally would, as the test suite seemed unable to access external files, so I downloaded a copy of the Bootstrap Javascript bundle and stored it locally in a subdirectory of the test specification directory. The following code was then added to the test specification file to add bootstrap function to Jest:

```
require('./bootstrap/bootstrap.bundle.min.js');
```

### Jest Tests
  
* The test specifications file is: [caposearch.test.js](https://github.com/lmjh/capo-search-app/blob/ef2fbcf9addaa9fe3eaa25df804b7f64737b32b8/assets/js/tests/caposearch.test.js)
* The javascript file being tested is: [caposearch.js](https://github.com/lmjh/capo-search-app/blob/ef2fbcf9addaa9fe3eaa25df804b7f64737b32b8/assets/js/caposearch.js)

The test specification contains a total of 26 automated Jest tests and all pass as expected. 

![Screenshot of Jest running all tests](documentation/testing-images/jest-tests.jpg)

The tests in place cover every function and the one object included in the application's Javascript file. I have tried to test an example of every expected behaviour of each function, with a few notable exceptions:

* I have not tested Jquery or Bootstrap functions with Jest. When Jquery and Bootstrap functions are used, I have confirmed through manual testing that they are behaving as expected.
* The writeMatch function, which is responsible for writing matched chord positions to the results area of the DOM, has not been fully tested with Jest as its outputs are long and complex strings of HTML code, which would be difficult and time consuming to automatically test with Jest. I therefore used extensive manual testing to confirm that this function was correctly writing results to the DOM.
* Some parts of the capoChords function, which controls the overall flow of the application, have not been fully tested with Jest. This function is difficult to test with automated tests as it is somewhat complex and most of its functionality involves calling other functions (which have been tested individually with Jest) and passing values between functions. capoSearch's more isolatable behaviours, like its response to a zero-length input string and writing the number of results found to the DOM, have been tested with Jest, while the remaining functionality was tested manually.

### How to run Jest tests 

After cloning the project, follow the instructions on [this page](https://jestjs.io/docs/getting-started) to install Jest to your development environment. Next, follow the steps in the Jest Configuration section above to setup Jest to  work with Jquery and Bootstrap functions. Once that's done, run Jest from the command line and the program should automatically detect and process the test file.

## User Stories Testing

## Further Testing

## Noteworthy Bugs Discovered

### 1. Refreshing page left chords selected with no results showing
* If a user clicked one or more buttons and then refreshed the page, the buttons would remain selected but no results would be shown, resulting in a confusing experience.

![Screenshot of chord selection bug](documentation/bugs/refresh-bug-1.jpg)

* This was resolved by adding a call to the capoChords function in the document ready function. This means that the application checks for any selected buttons and displays appropriate results on page load.

![Screenshot of chord selection after bug fixed](documentation/bugs/refresh-bug-2.jpg)

* I considered simply deselecting all checkboxes on page load as an alternative fix, but decided that this would result in a poorer user experience, as users would lose their selected chords whenever they refreshed the page.

### 2. Tutorial box styling remained after hiding tutorial content
* When the user clicked the button to hide the tutorial content, the outline box remained in place, which resulted in a messy layout.

![Screenshot of tutorial box bug](documentation/bugs/tutorial-bug-1.jpg)

* This was resolved by adding code to the toggleTutorial function that toggled the "welcome-box" class from the relevant HTML element when the tutorial content was hidden or shown.

![Screenshot of tutorial box after bug fixed](documentation/bugs/tutorial-bug-2.jpg)

### 3. Browser console error caused by Jest export
* Jest testing requires exporting the functions and objects to be tested from the javascript file into the Jest test specification file using the module.exports method. While this works in the development environment where the tests are run, the inclusion of the code causes an error in the browser because "module" is not defined in that environment.

![Screenshot of browser console error](documentation/bugs/module-bug-1.jpg)

* This issue was resolved by adding an if statement that prevents the code from being run if 'module' is undefined, based on the solution in [this thread](https://stackoverflow.com/a/68671391).
```
if (typeof module !== "undefined") module.exports = { };
```

### 4. Jerky animation when hiding or showing tutorial section content
* The Hide/Show Tutorial toggle used a jQuery animation to smoothly transition between hidden and visible states, but the animation was jerky and uneven.

* This issue was resolved by simply replacing the jQuery toggle() function with slideToggle(), which produces in a much smoother transition animation.

## Outstanding Issues