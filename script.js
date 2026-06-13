// Lista completa con el rojo incluido
const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];

document.getElementById('roll-btn').addEventListener('click', function() {
    for (let i = 1; i <= 4; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        
        // Volvemos a generar números aleatorios entre 1 y 6
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = randomNumber;
        
        // Elegimos el color al azar
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        
        // Cambiamos la clase para aplicar el color
        diceElement.className = 'dice ' + colorAleatorio;
        
        // Efecto visual de salto
        diceElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            diceElement.style.transform = 'scale(1)';
        }, 100);
    }
});
