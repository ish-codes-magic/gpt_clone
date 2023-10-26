// import openai api key from .env file
// require('dotenv').config();
// read from .env file
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_KEY = ""; // replace with your api key
const submitbutton = document.querySelector('#submitButton');
const inputElement = document.querySelector('input');
const outputElement = document.querySelector('#output');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');
const historypElement = document.querySelectorAll('.history p');
const historyContainer = document.querySelector('.history');

// change the current and output text thats displayed with a click
function changeInput(text, outputdict) {
    const inputElement = document.querySelector('input');
    inputElement.value = text;
    const outputElement = document.querySelector('#output');
    outputElement.textContent = outputdict[text];
}

async function getMessage() {
    console.log('getMessage() called');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{role:"user",content:inputElement.value}],
        })
    }
    try {
        // call openai api
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
        console.log(outputElement.textContent);
        console.log(typeof(inputElement.value));
        const inputy = inputElement.value;
        const output = outputElement.textContent;
        const outputdict = {
        }
        outputdict[inputy] = output;
        console.log(outputdict);
        if (data.choices[0].message.content && inputElement.value)  {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent, outputdict));
            historyElement.append(pElement);
        }
        
        console.log(historyContainer);
    } catch (error) {
        console.log(error);
    }
}


submitbutton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);

// change the background colour of the p elemnt when clicked
historyContainer.addEventListener('click', function(event) {
    let targetElement = event.target;
    if (targetElement.tagName.toLowerCase() === 'p') {
        // Clear background color of all p elements inside .history
        let allPElements = historyContainer.querySelectorAll('p');
        allPElements.forEach(function(pElement) {
            pElement.style.backgroundColor = '#000000';
        });
        targetElement.style.backgroundColor = 'rgb(210,210,210,0.41)'; // example color after clicking

    }
});