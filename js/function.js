const box1 = document.getElementById('box-1');
const box2 = document.getElementById('box-2');
const box3 = document.getElementById('box-3');
const startButton = document.getElementById('start');
const submitButton = document.getElementById('submit');
const moneyInput = document.getElementById('money');
const betInput = document.getElementById('bet');
const moneyDisplay = document.getElementById('moneyDisplay');
const betDisplay = document.getElementById('betDisplay');
let intervalId;
let money = 0;
let bet = 0;

const images = [
    '../slot-machine/pictures/c-icon.png',
    '../slot-machine/pictures/css-icon.png',
    '../slot-machine/pictures/git-icon.png',
    '../slot-machine/pictures/html-icon.png',
    '../slot-machine/pictures/java-icon.png',
    '../slot-machine/pictures/js-icon.png',
    '../slot-machine/pictures/linux-icon.png'
];

function randomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function getFilename(url) {
    const lastSlashIndex = url.lastIndexOf('/');
    return url.substring(lastSlashIndex + 1);
}

function start() {
    if (intervalId) return; // Prevent multiple intervals from starting

    bet = parseFloat(betInput.value);

    if (isNaN(bet) || bet <= 0 || bet > money) {
        Swal.fire('Please enter a valid bet amount.');
        return;
    }

    money -= bet;
    moneyDisplay.textContent = money.toFixed(2);
    betDisplay.textContent = bet.toFixed(2);

    intervalId = setInterval(() => {
        const img1 = randomImage();
        const img2 = randomImage();
        const img3 = randomImage();

        box1.innerHTML = `<img src="${img1}" alt="Random Image">`;
        box2.innerHTML = `<img src="${img2}" alt="Random Image">`;
        box3.innerHTML = `<img src="${img3}" alt="Random Image">`;
    }, 250);

    setTimeout(() => {
        clearInterval(intervalId);
        intervalId = null; // Reset intervalId

        const img1 = getFilename(box1.querySelector('img').src);
        const img2 = getFilename(box2.querySelector('img').src);
        const img3 = getFilename(box3.querySelector('img').src);

        console.log(`Image 1: ${img1}`);
        console.log(`Image 2: ${img2}`);
        console.log(`Image 3: ${img3}`);

        // Check for winning condition
        if (img1 === img2 && img2 === img3) {
            Swal.fire('Congratulations! You Win!');
            money += bet * 2;
        } else {
            Swal.fire('You Lose!');
        }

        moneyDisplay.textContent = money.toFixed(2);
    }, 5000);
}

function submitMoney() {
    let newMoney = parseFloat(moneyInput.value);
    if (isNaN(newMoney) || newMoney <= 0) {
        Swal.fire('Please enter a valid amount of money.');
        return;
    }

    money += newMoney; // Add the new money to the existing money
    moneyDisplay.textContent = money.toFixed(2);
}

startButton.addEventListener('click', start);
submitButton.addEventListener('click', submitMoney);