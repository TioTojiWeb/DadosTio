const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];
const selector = document.getElementById('dice-selector');

const estadisticas = {
    azul: 0,
    amarillo: 0,
    verde: 0,
    morado: 0,
    naranja: 0,
    rojo: 0
};

// Cargamos un sonido público de dados rodando (puedes cambiar este link si tienes tu propio audio)
const sonidoDados = new Audio('https://assets.mixkit.co/active_storage/sfx/2048/2048-84.wav');

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

selector.addEventListener('change', actualizarCantidadDados);

document.getElementById('roll-btn').addEventListener('click', function() {
    const button = document.getElementById('roll-btn');
    const cantidadDadosActivos = parseInt(selector.value);
    
    button.disabled = true;
    selector.disabled = true;
    button.textContent = 'Rolling!';

    // --- REPRODUCIR SONIDO ---
    sonidoDados.currentTime = 0; // Reinicia el audio si se vuelve a pulsar rápido
    sonidoDados.play().catch(error => {
        console.log("El navegador bloqueó el audio hasta que el usuario interactúe con la página.");
    });

    let tiempoRestante = 1; // 1 segundo exacto de duración

    for (let i = 1; i <= cantidadDadosActivos; i++) {
        const statusElement = document.getElementById(`status-${i}`);
        statusElement.textContent = `ROLLING... ${tiempoRestante}s`;
        statusElement.classList.add('active');
        
        document.getElementById(`dice-${i}`).classList.add('spinning');
    }

    const fiestaColores = setInterval(() => {
        for (let i = 1; i <= cantidadDadosActivos; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
            diceElement.className = 'dice spinning ' + colorAleatorio;
        }
    }, 70);

    const cuentaRegresiva = setInterval(() => {
        tiempoRestante--;
        
        if (tiempoRestante > 0) {
            for (let i = 1; i <= cantidadDadosActivos; i++) {
                document.getElementById(`status-${i}`).textContent = `ROLLING... ${tiempoRestante}s`;
            }
        } else {
            clearInterval(cuentaRegresiva);
            clearInterval(fiestaColores);

            for (let i = 1; i <= cantidadDadosActivos; i++) {
                const diceElement = document.getElementById(`dice-${i}`);
                
                diceElement.classList.remove('spinning');
                document.getElementById(`status-${i}`).classList.remove('active');
                
                const colorFinal = colores[Math.floor(Math.random() * colores.length)];
                diceElement.className = 'dice ' + colorFinal;
                
                estadisticas[colorFinal]++;
                document.getElementById(`count-${colorFinal}`).textContent = estadisticas[colorFinal];
                
                diceElement.style.transform = 'scale(1.12)';
                setTimeout(() => { diceElement.style.transform = 'scale(1)'; }, 150);
            }

            button.disabled = false;
            selector.disabled = false;
            button.textContent = 'Roll Dice';
        }
    }, 1000);
});

actualizarCantidadDados();
