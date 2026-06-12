document.getElementById('roll-btn').addEventListener('click', function() {
    const diceElement = document.getElementById('dice');
    
    // Genera un número aleatorio entre 1 y 6
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    
    // Cambia el texto del dado
    diceElement.textContent = randomNumber;
});