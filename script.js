let sample_text_Element = document.getElementById("sample-text");

let input_text = document.getElementById("user-text");

let content = "In today's rapidly changing world, where technological advancements occur at lightning speed,it is essential to continuously learn new skills to stay competitive. The digital age has transformed almost every aspect of human life, from the way we communicate to how we work, and even how we socialize. To thrive";
let limit = 32;

//making a sentence outof content
function getSentenceWithLimit(content, limit) {
    let words = content.split(' '); // Split the content into words
    let sentence = ""; 
    let currentLength = 0;

    for (let word of words) {
        if (currentLength + word.length > limit) {
            break; // Stop if adding the next word exceeds the limit
        }
        if (sentence.length > 0) {
            sentence += " "; // Add space between words
            currentLength++; // Count the space
        }
        sentence += word;
        currentLength += word.length;

        if (currentLength === limit) {
            break; // Stop if exactly at limit
        }
    }

    return sentence;
}

let sample_text = getSentenceWithLimit(content,limit);
console.log(sample_text);
console.log(sample_text.length);

//converting string into span
function initSampleText() {
    sample_text_Element.innerHTML = sample_text.split('')
    .map(char => char === ' ' ? `<span class="space">␣</span>` : `<span>${char}</span>`)
    .join('');
}

initSampleText(); 
input_text.addEventListener("input", validation);

let index = 0;
let spanElements = sample_text_Element.querySelectorAll('span');

// Function to handle input and backspace logic
function validation(event) {
    let inputTyped = input_text.value;

    // Handle backspace
    if (event.inputType === "deleteContentBackward" && index > 0) {
        // Remove the 'correct' or 'incorrect' class from the previous character
        index--; // Move the index back
        spanElements[index].classList.remove('correct');
        spanElements[index].classList.remove('incorrect');
        console.log("Backspace: Index", index);
    }
    // Handle correct input
    else if (sample_text[index] === input_text.value[index]) {
        console.log("match");
        spanElements[index].classList.add('correct');
        index++; // Move to the next character
        console.log("Correct: Index", index);
    }
    // Handle incorrect input
    else {
        console.log("not match");
        spanElements[index].classList.add('incorrect');
        index++; // Move to the next character
        console.log("Incorrect: Index", index);
    }
}
