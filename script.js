const colores = ['azul', 'amarillo', 'verde', 'morado', 'naranja', 'rojo'];

document.getElementById('roll-btn').addEventListener('click', function() {
    const button = document.getElementById('roll-btn');
    let tiempoRestante = 3;
    
    button.disabled = true;
    button.textContent = `Esperando... ${tiempoRestante}s`;
    
    const contador = setInterval(() => {
        tiempoRestante--;
        
        if (tiempoRestante > 0) {
            button.textContent = `Esperando... ${tiempoRestante}s`;
        } else {
            clearInterval(contador);
            
            // Lanza los dados para cambiar los colores
            lanzarDados();
            
            button.disabled = false;
            button.textContent = 'Tirar Dados';
        }
    }, 1000);
});

function lanzarDados() {
    for (let i = 1; i <= 4; i++) {
        const diceElement = document.getElementById(`dice-${i}`);
        
        // Mantenemos el punto en el medio pase lo que pase
        diceElement.textContent = '●';
        
        // Cambiamos el fondo de color al azar de la lista
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        diceElement.className = 'dice ' + colorAleatorio;
        
        // Efecto físico de rebote
        diceElement.style.transform = 'scale(1.08)';
        setTimeout(() => {
            diceElement.style.transform = 'scale(1)';
        }, 150);
    }
}
