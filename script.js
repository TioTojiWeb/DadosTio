// Lista de colores permitidos
const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja'];

document.getElementById('roll-btn').addEventListener('click', function() {
    // Buscamos los 4 dados por su ID
    for (let i = 1; i <= 4; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        
        // 1. Generar número aleatorio entre 1 y 6
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = randomNumber;
        
        // 2. Elegir un color aleatorio de la lista
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        
        // 3. Quitamos cualquier color anterior y ponemos el nuevo
        diceElement.className = 'dice ' + colorAleatorio;
        
        // Un pequeño efecto visual de que el dado "saltó" al tirar
        diceElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            diceElement.style.transform = 'scale(1)';
        }, 100);
    }
});
