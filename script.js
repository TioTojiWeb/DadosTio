const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];
const selector = document.getElementById('dice-selector');

// Función que oculta o muestra los dados según el menú desplegable
function actualizarCantidadDados() {
    const cantidadSelect = parseInt(selector.value);
    for (let i = 1; i <= 4; i++) {
        const wrapper = document.getElementById(`wrapper-${i}`);
        if (i <= cantidadSelect) {
            wrapper.classList.remove('hidden');
        } else {
            wrapper.classList.add('hidden');
        }
    }
}

// Escuchamos cuando el usuario cambia la opción del selector
selector.addEventListener('change', actualizarCantidadDados);

document.getElementById('roll-btn').addEventListener('click', function() {
    const button = document.getElementById('roll-btn');
    const cantidadDadosActivos = parseInt(selector.value);
    
    button.disabled = true;
    selector.disabled = true; // Bloqueamos el selector mientras gira
    button.textContent = '¡Girando!';

    let tiempoRestante = 3;

    // 1. Iniciamos los textos de ROLLING... y el giro loco solo en los dados activos
    for (let i = 1; i <= cantidadDadosActivos; i++) {
        const statusElement = document.getElementById(`status-${i}`);
        statusElement.textContent = `ROLLING... ${tiempoRestante}s`;
        statusElement.classList.add('active');
        
        document.getElementById(`dice-${i}`).classList.add('spinning');
    }

    // 2. Fiesta rápida de cambio de colores (cada 70ms) en dados activos
    const fiestaColores = setInterval(() => {
        for (let i = 1; i <= cantidadDadosActivos; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            diceElement.className = 'dice spinning ' + colorAleatorio;
        }
    }, 70);

    // 3. Cuenta regresiva de 3 segundos
    const cuentaRegresiva = setInterval(() => {
        tiempoRestante--;
        
        if (tiempoRestante > 0) {
            for (let i = 1; i <= cantidadDadosActivos; i++) {
                document.getElementById(`status-${i}`).textContent = `ROLLING... ${tiempoRestante}s`;
            }
        } else {
            clearInterval(cuentaRegresiva);
            clearInterval(fiestaColores);

            // 4. Detener la animación y fijar los colores finales
            for (let i = 1; i <= cantidadDadosActivos; i++) {
                const diceElement = document.getElementById(`dice-${i}`);
                
                diceElement.classList.remove('spinning');
                document.getElementById(`status-${i}`).classList.remove('active');
                
                const colorFinal = colores[Math.floor(Math.random() * colores.length)];
                diceElement.className = 'dice ' + colorFinal;
                
                diceElement.style.transform = 'scale(1.15)';
                setTimeout(() => { diceElement.style.transform = 'scale(1)'; }, 150);
            }

            button.disabled = false;
            selector.disabled = false; // Desbloqueamos el selector
            button.textContent = 'Tirar Dados';
        }
    }, 1000);
});

// Inicializamos la cantidad de dados por defecto al cargar la página
actualizarCantidadDados();
