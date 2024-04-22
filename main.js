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
        updateGuessListUI(this.guesses); // Llama a la función que actualiza la lista en el HTML
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
    
    // Guardar el estado del modo oscuro en localStorage como una cadena
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
}

function main() {
    const minNumber = 1;
    const maxNumber = 10;
    const maxAttempts = 3;
    
    const game = new Game(minNumber, maxNumber, maxAttempts);

    // Mostrar mensaje de bienvenida en el DOM
    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = "Bienvenido al juego de adivinanzas. Tienes 3 intentos para adivinar el número.";
    document.body.appendChild(welcomeMessage);

    // Verificar si hay un estado de modo oscuro guardado en localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Aplicar el modo oscuro si estaba activo previamente
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Agregar click al botón de modo oscuro
    document.getElementById('darkModeButton').addEventListener('click', toggleDarkMode);

    // Manejar la lógica  el DOM
    const form = document.createElement('form');
    const inputLabel = document.createElement('label');
    inputLabel.textContent = `Elige un número entre ${minNumber} y ${maxNumber}: `;
    const inputField = document.createElement('input');
    inputField.type = 'number';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Adivinar';
    form.appendChild(inputLabel);
    form.appendChild(inputField);
    form.appendChild(submitButton);
    document.body.appendChild(form);

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const numberChoice = parseInt(inputField.value);
        if (game.minNumber <= numberChoice && numberChoice <= game.maxNumber) {
            const result = game.checkGuess(numberChoice);
            if (result === "win") {
                alert("¡Felicidades! Has adivinado el número.");
            } else if (result === "lose") {
                alert(`¡Se acabaron los intentos! El número correcto era ${game.randomNumber}.`);
            } else {
                alert(`Número incorrecto. Te quedan ${game.attempts} intentos.`);
            }
        } else {
            alert("Por favor, elige un número válido dentro del rango.");
        }
        inputField.value = ''; // Limpiar el campo de entrada después de cada intento
    });

    // Mostrar la lista de números intentados en el DOM
    const guessList = document.createElement('ul');
    guessList.id = 'guessList';
    document.body.appendChild(guessList);
}

window.addEventListener('load', main);
