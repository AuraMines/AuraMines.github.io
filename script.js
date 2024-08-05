let saldo = 0;
let selectedValue = 0;

// Update saldo display and selected value
function add(value) {
    selectedValue = value;
    document.getElementById('valor').textContent = `R$ ${selectedValue}`;
}

// Confirm deposit and update saldo
function confirmDep() {
    saldo += selectedValue;
    document.getElementById('valor').textContent = `R$ ${saldo}`;
    selectedValue = 0; // Reset selected value
    document.getElementById('dep').style.display = 'none'; // Hide deposit section
}

// Show deposit section
function depositar() {
    document.getElementById('dep').style.display = 'block';
}

// Set input to max saldo value
function max() {
    document.getElementById('inp').value = saldo;
}

// Set input to one-fifth of saldo
function mid() {
    document.getElementById('inp').value = saldo / 5;
}

// Handle betting logic
function aposta() {
    const value = parseFloat(document.getElementById('inp').value);
    if (isNaN(value) || value <= 0 || value > saldo) {
        alert('Insira um valor válido para apostar.');
        return;
    }
    // Betting logic
    document.getElementById('inp').value = ''; // Clear input after betting
}

// Stop game logic
function para() {
    // Implement stopping game logic
}

// Handle button click in the game
function clicar(id) {
    // Implement game button click logic
    console.log(`Button ${id} clicked`);
}
