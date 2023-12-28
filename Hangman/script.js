const word = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message =document.getElementById('success-message');
const wrong = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const info = document.getElementById('message');
const Play = document.getElementById('play-again'); 

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord()
{
    const words = 
    [
          "garden","grape","heart","finger","melon","oven","ticket","umbrella","phone","adventure","arm","bell","candle","spoon","plate","clock","table","word","chair","book","coffee","pencil",
    ];
    return words[Math.floor(Math.random()* words.length)];
}

function displayWord()
{
    word.innerHTML = `${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </div>`).join('')}
        `;

    const w = word.innerText.replace(/\n/g,'');
    if(w === selectedWord)
    {
        popup.style.display = 'flex';
        message.innerText = 'You win';
    }
}

function updateWrongLetters()
{
    wrong.innerHTML = `
    ${wrongLetters.length>0?'<h3>Wrong Letters</h3>':''}
    ${wrongLetters.map(letter => `<span>${letter}<span>`)}
    `;

    items.forEach((item,index) => 
    {
        const errorCount = wrongLetters.length;

        if(index < errorCount)
        {
            item.style.display = 'block';
        }
        else
        {
            item.style.display = 'none';
        }
    })

    if(wrongLetters.length === items.length)
    {
        popup.style.display = 'flex';
        message.innerText = 'You lost. Try again.';
    }
}

function displayInfo()
{
    info.classList.add('show');

    setTimeout(function() {
        info.classList.remove('show');
    }, 2000);
}

Play.addEventListener('click', function()
{
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';

});

window.addEventListener('keydown', function(e)
{
    if(e.keyCode >= 65 && e.keyCode <= 90)
    {
        const letter = e.key;
        if(selectedWord.includes(letter))
        {
            if(!correctLetters.includes(letter))
            {
                correctLetters.push(letter);
                displayWord();
            }
            else
            {
                displayInfo();
                
            }
        }
        else
        {
            if(!wrongLetters.includes(letter))
            {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else
            {
                displayInfo();
            }
        }
    }
});

displayWord()