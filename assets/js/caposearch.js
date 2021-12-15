/*  
    capoChords is an array of objects. Each object represents a position on the guitar neck where a capo could be placed,
    beginning with 0 (i.e. no capo, or open chords). In each object, the key is the actual chord played with the capo at that
    position, and the value is the open chord shape used, stored as a string. Each object also has a 'fret' key which stores 
    the fret position of the capo as an integer.
*/

let capoChords = [{
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

/**
 * Collects input from the user and returns selected chords as an array.
 */
function collectInput() {
    let userInput = [];
    $("input[type=checkbox]").each(function (i) {
        let val = $(this).prop("checked");
        let lab = $("label[for='" + $(this).attr('id') + "']").text();

        if (val) {
            userInput.push(lab);
        }
    });
    return userInput;
};

/**
 * Activates all checkboxes.
 */

function enableCheckboxes() {
    $("input[type=checkbox]").attr("disabled", false);
}

/**
 * Clears the content from the search results area.
 */
function clearContent() {
    $('#results').empty();
};

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
};

/**
 * Writes the given match to the DOM. 
 */
function writeMatch(userChords, position) {
    // console.log(userChords, position);
    // console.log(position.fret, true);
    $('#results').append(`<p>With the capo at <strong>fret ${position['fret']}</strong>:</p>`);
    userChords.forEach(chord => {
        $('#results').append(
            `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 ">
                <div class="chord-box mb-3 text-center">
                    <div>Use the</div>
                    <img src="assets/images/chord-diagrams/${position[chord].toLowerCase()}.svg" class="chord-diagram" alt="">
                    <div>${position[chord]}</div>
                    <div>shape to play</div>
                    <div class="chord-icon chord-icon-${chord.toLowerCase().replace('#', 's')} mx-auto m-2">${chord}</div>
                </div>
            </div>
            `)
    });
};

/**
 * Disables checkboxes for all chords that have no valid combinations with currently selected chords. 
 */

function disableInvalidSelections(validSelections) {
    $("input[type=checkbox]").each(function () {
        if (!validSelections.hasOwnProperty($("label[for='" + $(this).attr('id') + "']").text())) {
            console.log(validSelections);
            $(this).attr("disabled", true);
        };
    });
};

/**
 * Controls the flow of the application. 
 */
function capoSearch() {
    clearContent();
    enableCheckboxes();

    let userChords = collectInput();
    
    if (userChords.length == 0) {
        $('#results').append(`<p>Select some chords to start!</p>`);
    } else if (userChords.length > 9) {
        $('#results').append(`<p>Pick a maximum of 9 chords.</p>`);
    } else {
        let anyMatches = false;
        let validSelections = {}; //test

        for (position of capoChords) {
            if (checkMatch(userChords, position)) {
                anyMatches = true;
                writeMatch(userChords, position);
                Object.assign(validSelections, position); //test
            };
        };
        
        disableInvalidSelections(validSelections);

        if (anyMatches === false) {
            $('#results').append(`<p>Sorry, there are no capo positions that match all of your selections.</p>`)
        };
    };
};

$(document).ready(function () {
    $("input[type=checkbox]").on("click", capoSearch);
})