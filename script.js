const feedbackValue = document.querySelectorAll(".span-resultado")[0]
const form = document.getElementById("convertForm")
const amount = document.getElementById("amount")
const de = document.getElementById("de")
const para = document.getElementById("para")
const feedresult = document.getElementById("res")
const loading = document.querySelector(".spin")
const SubmitButton = document.getElementById("sub-btn")


const API_URL = "https://api.exchangerate-api.com/v4/latest/"

function alternLoading() {
    if (loading.style.display == "none"){
    } else {
        feedbackValue.innerHTML = `<div class="spin"></div>`
        const loading = document.querySelector(".spin")
        loading.style.display = "block"
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault()
    convertMony()
    alternLoading()
    feedbackValue.style.display = "flex"
})

async function convertMony() {
    try {
        const res = await fetch(API_URL + de.value)
        const data = await res.json()
        const converted = (amount.value * data.rates[para.value]).toFixed(2)
        setTimeout(sendValue, 1000, converted, data.rates[para.value])
    } catch (error) {
        alert("Falha no servidor...")
    }
}

function sendValue(value, cotacao) {
    alternLoading()

    feedbackValue.innerHTML = `<span>${de.value} ${amount.value} = ${para.value} ${value}</span>
    <span>A cotação é de ${cotacao}</span>`
    feedresult.innerHTML = `${para.value} ${value}`
    feedresult.style.color = "#ff0000"
}