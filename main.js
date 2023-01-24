const newQuoteButton = document.querySelector('#js-new-quote');
let quotesBlock = document.querySelector('.quotes');
const spinner = document.querySelector('#js-spinner');

newQuoteButton.addEventListener('click', getQuote);

async function getQuote() {
    newQuoteButton.disabled = true;
    spinner.classList.remove('hidden');
    try {
        let response = await fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random');
        if(!response.ok) {
            throw Error(response.statusText);
        } else {
            let res = await response.json();
            quotesBlock.innerHTML = '';
            createEl(res.message);
        }
    } catch (err) {
        console.log('Ошибка');
        alert('Failed to fetch new quote');
    } finally {
        newQuoteButton.disabled = false;
        spinner.classList.add('hidden');
    }
}

function createEl(value) {
    let div = document.createElement('div');
    div.textContent = value;
    quotesBlock.append(div);
}

getQuote();