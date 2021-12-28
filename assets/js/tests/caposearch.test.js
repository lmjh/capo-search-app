// Code to allow jest to work with jQuery
const $ = require('jquery');
global.$ = global.jQuery = $;

// Import objects and functions
const { capoChords, toggleTutorial, collectInput, enableCheckboxes, clearContent, checkMatch, writeMatch, disableInvalidSelections, capoSearch } = require("../caposearch");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

describe("capoChords object is correctly set up", () => {
    test("capoChords object exists", () => {
        expect(capoChords).toBeTruthy();
    })
    test("capoChords array should contain 12 elements", () => {
        expect(capoChords.length).toEqual(12);
    })
})

describe("toggleTutorial function works correctly", () => {
    test("should set visibility to hidden if visible", () => {
        let hideTutorial = document.getElementById("hide-tutorial");
        toggleTutorial();
        setTimeout(expect(hideTutorial.style.display).toEqual("none"), 500);
    })
    test("button inner HTML should change when clicked", () => {
        let button = document.getElementById("tutorial-toggle").innerHTML;
        toggleTutorial();
        expect(button).toEqual("Show Tutorial");
    })
})

describe("clearContent functions correctly", () => {
    test("results element should be empty", () => {
        let resultsContent = document.getElementById("results").innerHTML;
        clearContent();
        expect(resultsContent).toEqual("none");
    })
})