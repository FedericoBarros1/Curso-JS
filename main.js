class Game {
    constructor(minNumber, maxNumber, maxAttempts) {
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.maxAttempts = maxAttempts;
        this.randomNumber = this.generateRandomNumber();
        this.attempts = maxAttempts;
        this.guesses = [];
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * (this.maxNumber - this.minNumber + 1)) + this.minNumber;
    }

    updateGuessList(number) {
        this.guesses.push(number);
        updateGuessListUI(this.guesses); // Llamar a la función que actualiza la lista en el HTML
    }

    checkGuess(number) {
        this.updateGuessList(number);
        this.attempts--;

        if (number === this.randomNumber) {
            return "win";
        } else if (this.attempts === 0) {
            return "lose";
        } else {
            return "continue";
        }
    }
}

function updateGuessListUI(guesses) {
    const guessList = document.getElementById('guessList');
    guessList.innerHTML = ''; // Limpia la lista antes de agregar los nuevos elementos
    guesses.forEach(guess => {
        const li = document.createElement('li');
        li.textContent = guess;
        guessList.appendChild(li);
    });
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

function main() {
    const minNumber = 1;
    const maxNumber = 10;
    const maxAttempts = 3;
    
    const game = new Game(minNumber, maxNumber, maxAttempts);

    alert("Bienvenido al juego de adivinanzas. Tienes 3 intentos para adivinar el número.");

    document.getElementById('darkModeButton').addEventListener('click', toggleDarkMode);

    while (game.attempts > 0) {
        let numberChoice = prompt(`Elige un número entre ${minNumber} y ${maxNumber}`);

        if (game.minNumber <= parseInt(numberChoice) && parseInt(numberChoice) <= game.maxNumber) {
            let guess = parseInt(numberChoice);
            let result = game.checkGuess(guess);

            if (result === "win") {
                alert("¡Felicidades! Has adivinado el número.");
                document.getElementById('resultImage').innerHTML = '<img src="medios/ganaste.jpg" alt="Ganaste">';
                document.getElementById('resultTitle').innerText = '¡Ganaste! ¡Felicidades!';
                break;
            } else if (result === "lose") {
                alert(`¡Se acabaron los intentos! El número correcto era ${game.randomNumber}.`);
                document.getElementById('resultImage').innerHTML = '<img src="medios/perdiste.jpg" alt="Perdiste">';
                document.getElementById('resultTitle').innerText = '¡Perdiste! ¡Intenta otra vez!';
                break;
            } else {
                alert(`Número incorrecto. Te quedan ${game.attempts} intentos.`);
            }
        } else {
            alert("Por favor, elige un número válido dentro del rango.");
        }
    }
}

window.addEventListener('load', main);