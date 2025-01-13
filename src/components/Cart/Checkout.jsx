// import { jsPDF } from "jspdf"; //instalar dependencias
// import "jspdf-autotable";

export const handleFinalizePurchase = (cart, totalPrice, orderNumber, clearCart, showModal, setOrderNumber) => {
  // Crear y descargar el PDF con el resumen
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Encabezado
    doc.setFontSize(18);
    doc.text("Resumen de Compra", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text(`Número de Pedido: ${orderNumber}`, 14, 40);

    // Tabla de productos
    const tableData = cart.map((item) => [
      item.name,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 50,
      head: [["Producto", "Cantidad", "Precio Unitario", "Subtotal"]],
      body: tableData,
    });

    // Totales
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: $${totalPrice.toFixed(2)}`, pageWidth - 50, finalY);

    // Guardar PDF
    doc.save(`Resumen_Pedido_${orderNumber}.pdf`);
  };

  // Generar mensaje para el modal
  const purchaseDetails = cart
    .map(
      (item) =>
        `${item.name} - Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)} - Subtotal: $${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  const message = `
Pedido N° ${orderNumber}

${purchaseDetails}

Total: $${totalPrice.toFixed(0)}
`;

  showModal(
    "Gracias por tu compra",
    message,
    () => {
      clearCart();
      setOrderNumber(orderNumber + 1);
      generatePDF();
    }
  );
};
