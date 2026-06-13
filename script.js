const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];

document.getElementById('roll-btn').addEventListener('click', function() {
    const button = document.getElementById('roll-btn');
    button.disabled = true;
    button.textContent = '¡Girando!';

    // 1. Activamos los textos de "ROLLING..." y la animación de rotación
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`status-1`).classList.add('active');
        document.getElementById(`status-2`).classList.add('active');
        document.getElementById(`status-3`).classList.add('active');
        document.getElementById(`status-4`).classList.add('active');
        
        document.getElementById(`dice-${i}`).classList.add('spinning');
    }

    // 2. Un intervalo rápido para que cambien de color frenéticamente mientras giran
    const fiestaColores = setInterval(() => {
        for (let i = 1; i <= 4; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            diceElement.className = 'dice spinning ' + colorAleatorio;
        }
    }, 70); // Cambia el color cada 70 milisegundos

    // 3. DETENER TODO EXACTAMENTE A LOS 2 SEGUNDOS (2000 milisegundos)
    setTimeout(() => {
        clearInterval(fiestaColores); // Frena la fiesta de colores rápido

        for (let i = 1; i <= 4; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            
            // Quitamos la clase de giro y el letrero de "ROLLING..."
            diceElement.classList.remove('spinning');
            document.getElementById(`status-${i}`).classList.remove('active');
            
            // Asignamos el color definitivo final
            const colorFinal = colores[Math.floor(Math.random() * colores.length)];
            diceElement.className = 'dice ' + colorFinal;
            
            // Pequeño rebote de impacto al detenerse
            diceElement.style.transform = 'scale(1.15)';
            setTimeout(() => { diceElement.style.transform = 'scale(1)'; }, 150);
        }

        // Habilitamos el botón de nuevo
        button.disabled = false;
        button.textContent = 'Tirar Dados';

    }, 2000); // 2 segundos clavados
});
