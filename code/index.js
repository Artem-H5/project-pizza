import { pizzaSelectSize, pizzaSelectToppingStart, pizzaSelectToppingEnd, targetEnter, targetLeave, targetDrop, targetOver, deleteItem, catchDiscount, show, validate, table, img } from "./functions.js";
import { pizzaUser } from "./data-pizza.js"

//const [...inputs] = document.querySelectorAll("#pizza input");
/*
inputs.forEach((input)=>{
    input.addEventListener("click", ()=>{
        console.log("+")
    })
})
*/

document.querySelectorAll(".grid input")
    .forEach((input) => {
        if (input.type === "text" || input.type === "tel" || input.type === "email") {
            input.addEventListener("change", () => {

                if (input.type === "text" && validate(/^[А-я-іїґє]{2,}$/i, input.value)) {
                    selectInput(input, pizzaUser)
                } else if (input.type === "tel" && validate(/^\+380\d{9}$/, input.value)) {
                    selectInput(input, pizzaUser)
                } else if (input.type === "email" && validate(/^[a-z0-9_.]{3,}@[a-z0-9._]{2,}\.[a-z.]{2,9}$/i, input.value)) {
                    selectInput(input, pizzaUser)
                } else {
                    input.classList.add("error")
                }
            })
        } else if (input.type === "reset") {
            input.addEventListener("click", () => {
                document.querySelectorAll('.grid input').forEach(el => {
                    el.classList.remove('success');
                    el.classList.remove('error');
                })
            })
        } else if (input.type === "button") {

            input.addEventListener("click", (e) => {

                localStorage.userInfo = JSON.stringify(pizzaUser);

                e.preventDefault();
                const inputName = document.querySelector('input[type="text"]');
                const inputPhone = document.querySelector('input[type="tel"]');
                const inputEmail = document.querySelector('input[type="email"]');
                if (validate(/^[А-я-іїґє]{2,}$/i, inputName.value) && validate(/^\+380\d{9}$/, inputPhone.value) && validate(/^[a-z0-9_.]{3,}@[a-z0-9._]{2,}\.[a-z.]{2,9}$/i, inputEmail.value)) {
                    window.location.href = './thank-you';
                } else {

                    e.preventDefault();
                }
            })
        }
    })

function selectInput(input, data) {
    input.className = ""
    input.classList.add("success")
    data.userName = input.value
}


document.querySelector("#pizza")
    .addEventListener("click", pizzaSelectSize)

const ingridients = document.querySelector('.ingridients');

document.querySelector(".ingridients")
    .addEventListener("dragstart", pizzaSelectToppingStart)

ingridients.addEventListener('dragend', pizzaSelectToppingEnd)

table.addEventListener('dragenter', targetEnter)

table.addEventListener('dragleave', targetLeave)

table.addEventListener('dragover', targetOver);

table.addEventListener('drop', targetDrop);

document.querySelector('.result').addEventListener('click', deleteItem);

document.querySelector('#banner button').addEventListener('mouseover', catchDiscount);

show(pizzaUser)


