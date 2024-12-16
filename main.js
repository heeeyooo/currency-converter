const rates = {};
const usd = document.getElementById("usd");
const eur = document.getElementById("eur");
const czk = document.getElementById("czk");

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

getCurrencies();

async function getCurrencies() {
    const response = await fetch(
        "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    );
    const data = await response.json();
    // FIXME: Do i have to await data?
    const result = await data;

    console.log(result[24].cc);
    console.log(result);

    rates.USD = result[24].rate;
    rates.EUR = result[31].rate;
    rates.CZK = result[3].rate;

    usd.textContent = rates.USD.toFixed(2);
    eur.textContent = rates.EUR.toFixed(2);
    czk.textContent = rates.CZK.toFixed(2);
}

input.oninput = function () {
    result.value = (parseFloat(input.value) * rates[select.value]).toFixed(2);
    if (input.value === "") {
        result.value = "";
    }
};

select.oninput = function () {
    result.value = (parseFloat(input.value) * rates[select.value]).toFixed(2);
    if (input.value === "") {
        result.value = "";
    }
};

result.oninput = function () {
    input.value = (parseFloat(result.value) / rates[select.value]).toFixed(2);
    if (result.value === "") {
        input.value = "";
    }
};
