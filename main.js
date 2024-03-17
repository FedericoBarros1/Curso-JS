// variables,constantes,array
const minNumber = 1;
const maxNumber = 10;
const numberList = Array.from({length: maxNumber}, (_, i) => i + minNumber); 
let randomNumber = generateRandomNumber(minNumber, maxNumber);
let attempts = 3;
let guesses = [];

//  generar un nro aleatorio
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función principal - 
function main() {
    alert("Bienvenido al juego de adivinanzas. Tienes 3 intentos para adivinar el número.");
    
    while (attempts > 0) {
    
        let numberChoice = prompt(`Elige un número entre ${minNumber} y ${maxNumber}:\n${numberList.join(', ')}`);

        // Verifica si el nro elegido esta dentro del rango permitido y si es valido
        if (numberList.includes(parseInt(numberChoice))) {
            let guess = parseInt(numberChoice);
            guesses.push(guess); // Almacena el intento en el array 'guesses'
            
            if (guess === randomNumber) {
                alert("¡Felicidades! Has adivinado el número.");
                break; // Sale del bucle si adivina correctamente
            } else {
                attempts--;
                if (attempts > 0) {
                    alert(`Número incorrecto. Te quedan ${attempts} intentos.`);
                } else {
                    alert(`¡Se acabaron los intentos! El número correcto era ${randomNumber}.`);
                }
            }
        } else {
            alert("Por favor, elige un número válido de la lista.");
        }
    }
}

main();
