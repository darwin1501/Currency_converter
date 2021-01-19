//API source https://exchangeratesapi.io

// global data;

//json
let currency;

//new selected currency value
let currencyMultiplier = 0;

const getBaseCurrency = (()=>{
    const baseCurrencyName = document.getElementById('baseCurrencyName').value;
    const baseCurrencyTxt = document.getElementById('baseCurrencyTxt');

    setNewCurrency(baseCurrencyName);
    
    baseCurrencyTxt.innerHTML = `1 ${baseCurrencyName} equals`;
})

const getNewCurrency = (()=>{
    const newCurrencyName = document.getElementById('newCurrencyName').value;
    const findCurrency =  new RegExp(newCurrencyName,'ig');
    const currencyMultiplierTxt = document.getElementById('currencyMultiplierTxt');
    //search Currency Name(key) on currency(json);
    for (let key in currency.rates) {
        if (currency.rates.hasOwnProperty(key)) {
            if (findCurrency.test(key)) {
                currencyMultiplier = currency.rates[key]
                break;
            }
        }
    }
    currencyMultiplierTxt.innerHTML = `${currencyMultiplier.toFixed(2)} ${newCurrencyName}`;
    convertToNewCurrency();
})

const convertToNewCurrency = (()=>{
    //get the value of baseCurrency Input
    const baseCurrencyInput = document.getElementById('baseCurrencyInput').value;
    const newCurrencyName = document.getElementById('newCurrencyName').value;
    const currencyMultiplierTxt = document.getElementById('currencyMultiplierTxt');
    //convert to new currency
    const newCurrency = currencyMultiplier * baseCurrencyInput;
    //display 
    const newCurrencyInput = document.getElementById('newCurrencyInput').value = newCurrency.toFixed(2);
    //display
    currencyMultiplierTxt.innerHTML = `${currencyMultiplier.toFixed(2)} ${newCurrencyName}`;
})

const changeConvertedCurrencyValue = (()=>{
    //get the value of baseCurrency Input
    const newCurrencyInput = document.getElementById('newCurrencyInput').value;
    //convert to new currency
    const baseCurrency = newCurrencyInput / currencyMultiplier;
    //display result at newCurrencyInput
    document.getElementById('baseCurrencyInput').value = baseCurrency.toFixed(2);
})
// event listeners
document.getElementById('baseCurrencyName').addEventListener('change', getBaseCurrency);
document.getElementById('newCurrencyName').addEventListener('change', getNewCurrency);
document.getElementById('baseCurrencyInput').addEventListener('input', convertToNewCurrency);
document.getElementById('newCurrencyInput').addEventListener('input', changeConvertedCurrencyValue);

async function setNewCurrency(currencyName) {
    let response = await fetch(`https://api.exchangeratesapi.io/latest?base=${currencyName}`);

    if (response.status === 200) {
        // update currency in json
        currency = await response.json();
        //update currency multiplier
        const newCurrencyName = document.getElementById('newCurrencyName').value;
        const findCurrency =  new RegExp(newCurrencyName,'ig');
         //search Currency Name(key) on currency(json);
        for (let key in currency.rates) {
            if (currency.rates.hasOwnProperty(key)) {
                if (findCurrency.test(key)) {
                    currencyMultiplier = currency.rates[key]
                    break;
                }
            }
        }
        convertToNewCurrency();
    }
}

async function getCurrency() {
    let response = await fetch('https://api.exchangeratesapi.io/latest');
    //elements
    const baseCurrencySelection = document.getElementById('baseCurrencyName');
    const newCurrencySelection = document.getElementById('newCurrencyName');

    if (response.status === 200) {
        //set json
        currency = await response.json();
    
       //populate data
    for(let value in currency.rates){
        const optionTemplate = `<option value=${value}>${value}</option>`;
        baseCurrencySelection.insertAdjacentHTML('beforeend', optionTemplate);
        newCurrencySelection.insertAdjacentHTML('beforeend', optionTemplate);
    }
    //select random data
    const index = Math.floor(Math.random() * 5);
    baseCurrencySelection.selectedIndex = index;
    newCurrencySelection.selectedIndex = index;
    convertToNewCurrency();
    }
}
getCurrency();
