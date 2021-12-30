/* jshint esversion: 8, jquery: true */

/*  
    capoChords is an array of objects. Each object represents a position on the guitar neck where a capo could be placed,
    beginning with 0 (i.e. no capo, or open chords). In each object, the key is the actual chord played with the capo at that
    position, and the value is the open chord shape used, stored as a string. Each object also has a 'fret' key which stores 
    the fret position of the capo as an integer.
*/

const capoChords = [{
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
}];

$(document).ready(function () {
    $("input[type=checkbox]").on("click", capoSearch);
    $("#tutorial-toggle").on("click", toggleTutorial);
    hideTutorialOnLoad();
    setupTooltips();
    disableTooltips()
    capoSearch();
});

/**
 * Initialises Bootstrap tooltips on chord selection buttons.
 */
function setupTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
}

/**
 * Disables all Bootstrap tooltips.
 */
function disableTooltips() {
    $('[data-toggle="tooltip"]').tooltip('disable');
}

/**
 * Toggles the visibility of the welcome/tutorial section and changes the text of the toggle button. Stores whether the tutorial
 * is hidden or not in the localStorage object.
 */
function toggleTutorial() {
    $("#hide-tutorial").toggle(300);
    let toggleButton = $("#tutorial-toggle");
    if (toggleButton.html() === "Hide Tutorial") {
        localStorage.setItem("tutorial", "false");
        toggleButton.html("Show Tutorial");
        $("#welcome").children().first().toggleClass("welcome-box");
    } else {
        localStorage.setItem("tutorial", "true");
        toggleButton.html("Hide Tutorial");
        $("#welcome").children().first().toggleClass("welcome-box");
    }
}

/**
 * Checks if the tutorial was hidden the last time the user visited the page and, if so, hides the tutorial and changes the
 * toggle button text.
 */
function hideTutorialOnLoad() {
    if (localStorage.getItem("tutorial") == "false") {
        $("#hide-tutorial").toggle();
        $("#welcome").children().first().toggleClass("welcome-box");
        $("#tutorial-toggle").text("Show Tutorial");
    }
}

/**
 * Collects input from the user and returns selected chords as an array.
 */
function collectInput() {
    let userInput = [];
    $("input[type=checkbox]").each(function () {
        let val = $(this).prop("checked");
        let lab = $("label[for='" + $(this).attr('id') + "']").text();

        if (val) {
            userInput.push(lab);
        }
    });
    return userInput;
}

/**
 * Removes the 'disabled' attribute from all chord selection checkboxes.
 */
function enableCheckboxes() {
    $("input[type=checkbox]").attr("disabled", false);
}

/**
 * Clears the content from the search results area.
 */
function clearContent() {
    $('#results').empty();
}

/**
 * Checks if the set of user requested chords has a match at the given capo position.
 */
function checkMatch(userChords, position) {
    let match = true;

    // Check each chord in the submitted array. If any don't have a match at the submitted fret, return false.
    userChords.forEach(chord => {
        if (!position.hasOwnProperty(chord)) {
            match = false;
            return match;
        }
    });

    return match;
}

/**
 * Writes the given match to the DOM. 
 */
function writeMatch(userChords, position) {
    if (position.fret === 0) {
        $('#results').append(`<p class="capo-position">With <strong>no capo</strong>:</p>
        <div class="row mb-5">
            <div class="col col-md-6 mx-auto">
                <figure class="mb-0">
                    <img src="assets/images/capo-positions/capo-0.svg" alt="Guitar neck with no capo attached.">
                <figcaption class="visually-hidden">Guitar neck with no capo attached.</figcaption>
                </figure>
            </div>
        </div>`);
    } else {
        $('#results').append(`<p class="capo-position">With the capo at <strong>fret ${position.fret}</strong>:</p>
        <div class="row mb-5">
            <div class="col col-md-6 mx-auto">
                <figure class="mb-0">
                    <img src="assets/images/capo-positions/capo-${position.fret}.svg" alt="Guitar neck with capo on fret ${position.fret}.">
                    <figcaption class="visually-hidden">Guitar neck with capo on fret ${position.fret}.</figcaption>
                </figure>
            </div>
        </div>`);
    }

    userChords.forEach(chord => {
        $('#results').append(
            `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                <div class="chord-box mb-3 text-center">
                    <div>Use the</div>
                    <figure class="mb-0">
                        <img src="assets/images/chord-diagrams/${position[chord].toLowerCase()}.svg" class="chord-diagram" alt="A diagram of the ${position[chord]} chord">
                        <figcaption class="visually-hidden">A diagram of the ${position[chord]} chord.</figcaption>    
                    </figure>
                    <div class="chord-${position[chord].toLowerCase()}">${position[chord]}</div>
                    <div>shape to play</div>
                    <div class="chord-icon chord-icon-${chord.toLowerCase().replace('#', 's')} mx-auto m-2">${chord}</div>
                </div>
            </div>
            `);
    });

    $('#results').append(`<div class="row mt-5 mb-5">
    <div class="col-4 mx-auto border-bottom"></div>
</div>`);

}

/**
 * Disables checkboxes and enables tooltips for all chord buttons that have no valid combinations with currently selected chords.
 */
function disableInvalidSelections(validSelections) {
    $("input[type=checkbox]").each(function () {
        if (!validSelections.hasOwnProperty($("label[for='" + $(this).attr('id') + "']").text())) {
            $(this).attr("disabled", true);
            $(this).parent().tooltip('enable');
        }
    });
}

/**
 * Controls the flow of the application. 
 */
function capoSearch() {
    // Clear the search results, enable all checkboxes and disable tooltips
    clearContent();
    enableCheckboxes();
    disableTooltips()

    // Collect the user's selected chords
    let userChords = collectInput();

    if (userChords.length == 0) {
        // Display this message if no chords selected
        $('#results').append(`<p>Select some chords to start!</p>
        <div class="col-4 mx-auto border-bottom"></div>`);
    } else {
        // Create an array to store all remaining valid chord selections 
        // (i.e. all chords that can be matched with currently selected chords)
        let validSelections = {};
        // Create a variable to store the number of results found
        let positionCount = 0;

        // Iterate through each object in the capoChords array
        for (let position of capoChords) {
            // Call the checkMatch function to see if the selected chords can be found at the current fretboard position
            if (checkMatch(userChords, position)) {
                // Write the current match to the DOM
                writeMatch(userChords, position);
                // Add all of the properties of the current position object to the validSelections object
                Object.assign(validSelections, position);
                positionCount++;
            }
        }

        // ternary operator used to pluralise the capo position.
        $('#results').prepend(`<p>Found ${positionCount} capo position${(positionCount > 1) ? "s" : ""}: </p>
        <div class="col-4 mx-auto border-bottom mb-3"></div>`);
        // Disable the buttons for chords that aren't compatible with already selected chords  
        disableInvalidSelections(validSelections);
    }
}


// module.exports is required to export the objects and functions to the Jest testing file.
// The if statement prevents this from logging an error in the browser console.
if (typeof module !== "undefined") module.exports = {
    capoChords,
    toggleTutorial,
    collectInput,
    enableCheckboxes,
    clearContent,
    checkMatch,
    writeMatch,
    disableInvalidSelections,
    capoSearch
};