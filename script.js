const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];

document.getElementById('roll-btn').addEventListener('click', function() {
    const button = document.getElementById('roll-btn');
    button.disabled = true;
    button.textContent = '¡Girando!';

    let tiempoRestante = 3; // Ponemos los 3 segundos de sazón

    // 1. Activamos la animación de giro y ponemos el texto inicial "ROLLING... 3s"
    for (let i = 1; i <= 4; i++) {
        const statusElement = document.getElementById(`status-${i}`);
        statusElement.textContent = `ROLLING... ${tiempoRestante}s`;
        statusElement.classList.add('active');
        
        document.getElementById(`dice-${i}`).classList.add('spinning');
    }

    // 2. Fiesta de colores rápida: los dados cambian de color frenéticamente cada 70ms
    const fiestaColores = setInterval(() => {
        for (let i = 1; i <= 4; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            diceElement.className = 'dice spinning ' + colorAleatorio;
        }
    }, 70);

    // 3. El contador que baja segundo a segundo (3s -> 2s -> 1s)
    const cuentaRegresiva = setInterval(() => {
        tiempoRestante--;
        
        if (tiempoRestante > 0) {
            // Actualizamos el texto sobre cada casilla
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`status-${i}`).textContent = `ROLLING... ${tiempoRestante}s`;
            }
        } else {
            // Cuando llega a 0, detenemos los motores
            clearInterval(cuentaRegresiva);
            clearInterval(fiestaColores);

            // 4. Frenazo definitivo y revelación de colores
            for (let i = 1; i <= 4; i++) {
                const diceElement = document.getElementById(`dice-${i}`);
                
                // Quitamos el giro y ocultamos los cartelitos
                diceElement.classList.remove('spinning');
                document.getElementById(`status-${i}`).classList.remove('active');
                
                // Color final definitivo
                const colorFinal = colores[Math.floor(Math.random() * colores.length)];
                diceElement.className = 'dice ' + colorFinal;
                
                // Efecto de impacto al detenerse
                diceElement.style.transform = 'scale(1.15)';
                setTimeout(() => { diceElement.style.transform = 'scale(1)'; }, 150);
            }

            // Reactivamos el botón principal
            button.disabled = false;
            button.textContent = 'Tirar Dados';
        }
    }, 1000); // Se actualiza cada 1 segundo exacto
});
