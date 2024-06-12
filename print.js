function printReceipt() {
    const receiptWindow = window.open('', '', 'width=400,height=600');
    receiptWindow.document.write('<html><head><title>Boleta</title>');
    receiptWindow.document.write('<style>');
    receiptWindow.document.write(`
        body {
            font-family: 'Courier New', Courier, monospace;
            width: 58mm;
            margin: 0;
            padding: 0;
        }
        h1, h2 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 5px;
            text-align: left;
        }
        th {
            border-bottom: 1px solid #000;
        }
        .total {
            text-align: right;
            font-weight: bold;
            border-top: 1px dashed #000;
            margin-top: 10px;
            padding-top: 10px;
        }
        .highlight {
            color: #000;
        }
        .receipt-info {
            text-align: center;
            margin-bottom: 10px;
        }
    `);
    receiptWindow.document.write('</style>');
    receiptWindow.document.write('</head><body>');
    receiptWindow.document.write('<div class="receipt-info">');
    receiptWindow.document.write('<h2>Restaurante</h2>');
    receiptWindow.document.write('<p>Dirección: Calle Falsa 123</p>');
    receiptWindow.document.write('<p>Tel: (01) 234-5678</p>');
    receiptWindow.document.write('<p>R.U.C: 1234567890</p>');
    receiptWindow.document.write('</div>');
    receiptWindow.document.write('<table>');
    receiptWindow.document.write('<tr><th>Item</th><th>Precio</th></tr>');

    order.forEach(orderItem => {
        receiptWindow.document.write(`<tr><td>${orderItem.item}</td><td>S/ ${orderItem.price.toFixed(2)}</td></tr>`);
    });

    const total = order.reduce((sum, orderItem) => sum + orderItem.price, 0);
    const igv = total * 0.18;
    const neto = total - igv;

    receiptWindow.document.write(`<tr><td class="total">Total Neto</td><td>S/ ${neto.toFixed(2)}</td></tr>`);
    receiptWindow.document.write(`<tr><td class="total">I.G.V 18%</td><td>S/ ${igv.toFixed(2)}</td></tr>`);
    receiptWindow.document.write(`<tr><td class="total highlight">Total</td><td class="highlight">S/ ${total.toFixed(2)}</td></tr>`);
    receiptWindow.document.write('</table>');
    receiptWindow.document.write('<p class="receipt-info">Gracias por su compra</p>');
    receiptWindow.document.write('</body></html>');
    receiptWindow.document.close();
    receiptWindow.print();
}
