import { pizzaUser, pizzaBD } from "./data-pizza.js";

const table = document.querySelector(".table")
const img = document.querySelector('.table img')
const imgMessage = document.createElement('div');

const pizzaSelectSize = (e) => {
    if (e.target.tagName === "INPUT" && e.target.checked) {
        pizzaUser.size = pizzaBD.size.find(el => el.name === e.target.id);
    }
    show(pizzaUser)
}

const pizzaSelectToppingStart = (e) => {
    e.target.classList.add('animated');
    e.target.style.border = '3px solid brown';
    e.target.style.borderRadius = '10px';
    e.target.style.boxSizing = 'border-box';
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('Text', e.target.src)
    e.dataTransfer.setData('TextId', e.target.id)
    // console.log(e.target.id);
    // switch (e.target.id) {
    //     case "sauceClassic": pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === e.target.id);
    //         break;
    //     case "sauceBBQ": pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === e.target.id);
    //         break;
    //     case "sauceRikotta": pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === e.target.id);
    //         break;
    //     case "moc1": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    //     case "moc2": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    //     case "moc3": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    //     case "telya": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    //     case "vetch1": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    //     case "vetch2": pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === e.target.id));
    //         break;
    // }
    // show(pizzaUser);
    // if (e.target.tagName === "IMG") {
    //     table.insertAdjacentHTML("beforeend", `<img src="${e.target.src}">`)
    // }
}

const pizzaSelectToppingEnd = (e) => {
    e.target.style.border = '';
    e.target.classList.remove('animated');
}

const targetEnter = (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.border = '3px solid red';
        e.target.style.borderRadius = '10px';
        e.target.style.filter = 'brightness(80%)';
    }
}

const targetLeave = (e) => {
    e.target.style.border = '';
    e.target.style.filter = 'brightness(100%)';
}

const targetOver = (e) => {
    if (e.preventDefault) e.preventDefault();
    return false;
}

const targetDrop = (e) => {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    e.target.style.border = '';
    e.target.style.filter = 'brightness(100%)';
    const src = e.dataTransfer.getData('Text');
    const id = e.dataTransfer.getData('TextId');

    imgMessage.textContent = '';

    if (document.querySelector('.table img#sauceClassic') || document.querySelector('.table img#sauceBBQ') || document.querySelector('.table img#sauceRikotta')) {
        // console.log(0)
        if (id === 'sauceClassic' || id === 'sauceBBQ' || id === 'sauceRikotta') {
            if (e.target.tagName === 'IMG') {
                imgMessage.style.position = 'relative'
                imgMessage.style.top = '-160px'
                imgMessage.style.color = 'red'
                imgMessage.textContent = 'Ви можете вибрати тільки один соус';
                table.prepend(imgMessage)
                // e.target.insertAdjacentHTML("afterend", `<span>Ви можете вибрати тільки один соус</span>`)
            }
            // console.log(1)
            return;
        }
    }

    switch (id) {
        case 'sauceClassic': pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === id);
            break;
        case 'sauceBBQ': pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === id);
            break;
        case 'sauceRikotta': pizzaUser.sauce = pizzaBD.sauce.find(el => el.name === id);
            break;
        case 'moc1': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
        case 'moc2': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
        case 'moc3': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
        case 'telya': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
        case 'vetch1': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
        case 'vetch2': pizzaUser.topping.push(pizzaBD.topping.find(el => el.name === id));
            break;
    }

    if (e.target.tagName === 'IMG') {
        e.target.insertAdjacentHTML("afterend", `<img src="${src}" id='${id}'>`)
    }
    show(pizzaUser, id);

    return false;
}

function show(pizza, id) {
    const price = document.getElementById("price");
    const sauce = document.getElementById("sauce");
    const topping = document.getElementById("topping")

    let totalPrice = 0;
    if (pizza.size !== "") {
        totalPrice += parseFloat(pizza.size.price);
    }
    if (pizza.sauce !== "") {
        totalPrice += parseFloat(pizza.sauce.price);
    }
    if (pizza.topping.length) {
        totalPrice += pizza.topping.reduce((a, b) => a + b.price, 0)
    }

    price.innerText = totalPrice;

    if (pizza.sauce !== "") {
        sauce.innerHTML = `<span class="topping">${pizza.sauce.productName}<button class='btn_sauce'>&#10060;</button></span>`
    }

    if (Array.isArray(pizza.topping)) {
        pizza.topping.forEach(obj => {
            if (document.querySelector(`.${id}`)) {
                pizza.toppingCount[id] = pizza.topping.filter(el => el.name === id).length;
                document.querySelector(`.${id} .counter`).innerHTML = pizza.toppingCount[id];;
                // console.log('Додати 1 до кількості')
            } else if (obj.name === id) {
                // console.log('Такого класу немає')
                pizza.toppingCount[id] = pizza.topping.filter(el => el.name === id).length;
                topping.innerHTML += `<div class="topping ${obj.name}">
                <span>${obj.productName}</span>
                <button class='btn'>&#10060;</button>
                <span class='counter'>${pizza.toppingCount[id]}</span>
                </div>`;
            }
        })
        console.log(pizza)

        // topping.innerHTML = pizza.topping.map(el => `<div class="topping"><span>${el.productName}</span><span class='counter'>${}</span></div>`).join("");
    }

    pizzaUser.price = totalPrice;
    pizzaUser.data = new Date()
}

function deleteItem(e) {
    // console.log(e.target.previousElementSibling.innerText)
    console.log(pizzaUser)

    console.log(e.target.classList[0])
    if (e.target.tagName !== 'BUTTON') {
        return;
    } else if (e.target.classList[0] === 'btn') {
        if (e.target.nextElementSibling.innerText == 1) {
            // console.log('1 item')
            let index = pizzaUser.topping.findIndex(obj => obj.productName === e.target.previousElementSibling.innerText);
            pizzaUser.topping.splice(index, 1);
            e.target.closest('.topping').remove();
            delete pizzaUser.toppingCount[e.target.closest('.topping').classList[1]];
            document.querySelector(`.table #${e.target.closest('.topping').classList[1]}`).remove();
            // console.log(e.target.closest('.topping').classList[1])
        } else if (e.target.nextElementSibling.innerText > 1) {
            let index = pizzaUser.topping.findIndex(obj => obj.productName === e.target.previousElementSibling.innerText);
            pizzaUser.topping.splice(index, 1);

            pizzaUser.toppingCount[e.target.closest('.topping').classList[1]] = pizzaUser.topping
                .filter(obj => obj.productName == e.target.previousElementSibling.innerText).length;
            e.target.nextElementSibling.innerText = pizzaUser.toppingCount[e.target.closest('.topping').classList[1]];
            document.querySelector(`.table #${e.target.closest('.topping').classList[1]}`).remove();
        }
        console.log(pizzaUser)
    } else if (e.target.classList[0] === 'btn_sauce') {
        console.log(pizzaUser.sauce.name)
        document.querySelector(`.table #${pizzaUser.sauce.name}`).remove();
        pizzaUser.sauce = '';
        e.target.closest('.topping').remove();
    }
    show(pizzaUser);
}

function catchDiscount(e) {
    console.log(e.target)
    // e.target.style.position = 'absolute';
    e.target.closest('#banner').style.bottom = `${Math.round(Math.random() * 600)}px`;
    e.target.closest('#banner').style.right = `${Math.round(Math.random() * 600)}px`;
}

const validate = (pattern, value) => pattern.test(value);

export { pizzaSelectSize, pizzaSelectToppingStart, pizzaSelectToppingEnd, targetEnter, targetLeave, targetOver, targetDrop, deleteItem, catchDiscount, show, validate, table, img, }