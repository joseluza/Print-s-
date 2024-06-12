let orders = {};
let currentTable = 'Mesa 1';  // Iniciar en la Mesa 1 por defecto

document.addEventListener('DOMContentLoaded', function() {
    updateOrderList();  // Actualizar al cargar por primera vez
});

function changeTable(table) {
    currentTable = table;
    updateOrderList();  // Actualizar la lista de pedidos al cambiar la mesa
}

function addToOrder(item, price) {
    if (!orders[currentTable]) {
        orders[currentTable] = [];
    }
    let existingItem = orders[currentTable].find(i => i.item === item);
    if (existingItem) {
        existingItem.quantity += 1;  // Incrementar la cantidad si el ítem ya existe
    } else {
        orders[currentTable].push({ item, price, quantity: 1 });
    }
    updateOrderList();
}

function removeFromOrder(item) {
    orders[currentTable] = orders[currentTable].filter(i => i.item !== item);
    updateOrderList();
}

function clearOrder() {
    orders[currentTable] = [];
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    let currentOrders = orders[currentTable] || [];
    currentOrders.forEach(order => {
        let div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `${order.item} x${order.quantity} - S/ ${(order.price * order.quantity).toFixed(2)}
            <button onclick="removeFromOrder('${order.item}')">Quitar</button>`;
        orderList.appendChild(div);
    });
}

function printReceipt() {
    const orderData = orders[currentTable] || [];
    if (orderData.length === 0) {
        alert('No hay pedidos para imprimir en esta mesa.');
        return;
    }

    // Abrir una nueva ventana para la impresión
    let printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Imprimir Recibo</title><style>body { font-family: Arial, sans-serif; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style></head><body>');
    printWindow.document.write(`<h1>Recibo para ${currentTable}</h1>`);
    printWindow.document.write('<table><tr><th>Ítem</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr>');

    let total = 0;
    orderData.forEach(item => {
        const subtotal = item.quantity * item.price;
        total += subtotal;
        printWindow.document.write(`<tr><td>${item.item}</td><td>${item.quantity}</td><td>S/ ${item.price.toFixed(2)}</td><td>S/ ${subtotal.toFixed(2)}</td></tr>`);
    });

    printWindow.document.write(`<tr><td colspan="3" style="text-align:right;"><strong>Total:</strong></td><td><strong>S/ ${total.toFixed(2)}</strong></td></tr>`);
    printWindow.document.write('</table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Necesario para asegurarse de que la ventana de impresión se cargue completamente antes de llamar a print()
    printWindow.onload = function() {
        printWindow.focus(); // Necesario para que el focus esté en la ventana de impresión en algunos navegadores
        printWindow.print(); // Llama a la función de impresión del navegador
        printWindow.close(); // Cierra la ventana después de la impresión
    }
}

