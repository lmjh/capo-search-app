/**
 * @jest-environment jsdom
 */

// Code to allow jest to work with jQuery
const $ = require('jquery');
global.$ = global.jQuery = $;

// Import objects and functions
const {
    capoChords,
    toggleTutorial,
    collectInput,
    enableCheckboxes,
    clearContent,
    checkMatch,
    writeMatch,
    disableInvalidSelections,
    capoSearch,
    testChange
} = require("../caposearch");

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
    test("capoChordsshould contain correct data", () => {
        expect(capoChords).toEqual([{
            'fret': 0,
            'A': 'A',
            'Am': 'Am',
            'C': 'C',
            'D': 'D',
            'Dm': 'Dm',
            'E': 'E',
            'Em': 'Em',
            'F': 'F',
            'G': 'G'
        }, {
            'fret': 1,
            'A#': 'A',
            'A#m': 'Am',
            'C#': 'C',
            'D#': 'D',
            'D#m': 'Dm',
            'F': 'E',
            'Fm': 'Em',
            'F#': 'F',
            'G#': 'G'
        }, {
            'fret': 2,
            'B': 'A',
            'Bm': 'Am',
            'D': 'C',
            'E': 'D',
            'Em': 'Dm',
            'F#': 'E',
            'F#m': 'Em',
            'G': 'F',
            'A': 'G'
        }, {
            'fret': 3,
            'C': 'A',
            'Cm': 'Am',
            'D#': 'C',
            'F': 'D',
            'Fm': 'Dm',
            'G': 'E',
            'Gm': 'Em',
            'G#': 'F',
            'A#': 'G'
        }, {
            'fret': 4,
            'C#': 'A',
            'C#m': 'Am',
            'E': 'C',
            'F#': 'D',
            'F#m': 'Dm',
            'G#': 'E',
            'G#m': 'Em',
            'A': 'F',
            'B': 'G'
        }, {
            'fret': 5,
            'D': 'A',
            'Dm': 'Am',
            'F': 'C',
            'G': 'D',
            'Gm': 'Dm',
            'A': 'E',
            'Am': 'Em',
            'A#': 'F',
            'C': 'G'
        }, {
            'fret': 6,
            'D#': 'A',
            'D#m': 'Am',
            'F#': 'C',
            'G#': 'D',
            'G#m': 'Dm',
            'A#': 'E',
            'A#m': 'Em',
            'B': 'F',
            'C#': 'G'
        }, {
            'fret': 7,
            'E': 'A',
            'Em': 'Am',
            'G': 'C',
            'A': 'D',
            'Am': 'Dm',
            'B': 'E',
            'Bm': 'Em',
            'C': 'F',
            'D': 'G'
        }, {
            'fret': 8,
            'F': 'A',
            'Fm': 'Am',
            'G#': 'C',
            'A#': 'D',
            'A#m': 'Dm',
            'C': 'E',
            'Cm': 'Em',
            'C#': 'F',
            'D#': 'G'
        }, {
            'fret': 9,
            'F#': 'A',
            'F#m': 'Am',
            'A': 'C',
            'B': 'D',
            'Bm': 'Dm',
            'C#': 'E',
            'C#m': 'Em',
            'D': 'F',
            'E': 'G'
        }, {
            'fret': 10,
            'G': 'A',
            'Gm': 'Am',
            'A#': 'C',
            'C': 'D',
            'Cm': 'Dm',
            'D': 'E',
            'Dm': 'Em',
            'D#': 'F',
            'F': 'G'
        }, {
            'fret': 11,
            'G#': 'A',
            'G#m': 'Am',
            'B': 'C',
            'C#': 'D',
            'C#m': 'Dm',
            'D#': 'E',
            'D#m': 'Em',
            'E': 'F',
            'F#': 'G'
        }])
    })
})

describe("toggleTutorial function works correctly", () => {
    // test("should set visibility to hidden if visible", () => {
    //     toggleTutorial();
    //     let hideTutorial = document.getElementById("hide-tutorial");
    //     setTimeout(expect(hideTutorial.style.display).toEqual("none"), 500);
    // })
    test("button inner HTML should initially show Hide Tutorial", () => {
        let button = document.getElementById("tutorial-toggle").innerHTML;
        expect(button).toEqual("Hide Tutorial");
    })
    // test("button inner HTML should change when clicked", () => {
    //     toggleTutorial();
    //     let button = document.getElementById("tutorial-toggle").innerHTML;
    //     expect(button).toEqual("Show Tutorial");
    // })
    // test("should set visibility to hidden if visible", () => {
    //     setTimeout(expect(document.getElementById("hide-tutorial").style.display).toEqual("none"), 500);
    // })
})

describe("collectInput functions correctly", () => {
    beforeEach(() => {
        let boxes = document.getElementsByClassName("btn-check");
        for (let box of boxes) {
            box.checked = false;
        }
    })
    test("should return an empty array if no boxes are checked", () => {
        expect(collectInput()).toEqual([]);
    })
    test("should return an array containing the string A if first box checked", () => {
        document.getElementById("btn-a").checked = true;
        expect(collectInput()).toEqual(["A"]);
    })
    test("should return an array containing A, B and C if first, second and third boxes checked", () => {
        document.getElementById("btn-a").checked = true;
        document.getElementById("btn-b").checked = true;
        document.getElementById("btn-c").checked = true;
        expect(collectInput()).toEqual(["A", "B", "C"]);
    })
})

describe("enableCheckboxes functions correctly", () => {
    test("every checkbox should be enabled after calling function", () => {
        let boxes = document.getElementsByClassName("btn-check");
        let enabled = [];

        //disable all checkboxes, then call the function to enable all.
        for (let box of boxes) {
            box.disabled = true;
        }
        enableCheckboxes();
        for (let box of boxes) {
            enabled.push(box.disabled);
        }
        expect(enabled).toEqual(expect.not.arrayContaining([ true ]));
    })
})

describe("clearContent functions correctly", () => {
    test("results element should be empty after calling function", () => {
        document.getElementById("results").innerHTML = "Test Content";
        clearContent();
        expect(document.getElementById("results").innerHTML).toEqual("");
    })
})

describe("checkMatch functions correctly", () => {
    test("should return true for a matching combination", () => {
        let position = capoChords[2];
        let userChords = [ 'B', 'Em', 'F#']
        expect(checkMatch(userChords, position)).toEqual(true);
    })
    test("should return false for a non-matching combination", () => {
        let position = capoChords[3];
        let userChords = [ 'B', 'Em', 'F#']
        expect(checkMatch(userChords, position)).toEqual(false);
    })
    test("should return true for a matching combination", () => {
        let position = capoChords[3];
        let userChords = [ 'C', 'F', 'G'];
        expect(checkMatch(userChords, position)).toEqual(true);
    })
    test("should return false for a non-matching combination", () => {
        let position = capoChords[2];
        let userChords = [ 'C', 'F', 'G'];
        expect(checkMatch(userChords, position)).toEqual(false);
    })
    test("should return true if all chords at a fret are selected", () => {
        let position = capoChords[1];
        let userChords = [ 'A#', 'A#m', 'C#', 'D#', 'D#m', 'F', 'Fm', 'F#', 'G#' ];
        expect(checkMatch(userChords, position)).toEqual(true);
    })
})

describe("testChange should change button text", () => {
    test("text should be Show Tutorial", async () => {
        testChange();
        let button = document.getElementById("tutorial-toggle").innerHTML;
        expect(button).toEqual("Show Tutorial");
    })
})