// Agregamos 'rojo' a la lista de colores permitidos
const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];

document.getElementById('roll-btn').addEventListener('click', function() {
    for (let i = 1; i <= 4; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = randomNumber;
        
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        
        diceElement.className = 'dice ' + colorAleatorio;
        
        diceElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            diceElement.style.transform = 'scale(1)';
        }, 100);
    }
});
