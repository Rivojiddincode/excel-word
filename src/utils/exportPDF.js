import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (products) => {
  const doc = new jsPDF();

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price,
    0
  );

  doc.setFontSize(20);
  doc.text("Products Report", 14, 20);

  doc.setFontSize(12);
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  doc.text(
    `Total Products: ${products.length}`,
    14,
    38
  );

  autoTable(doc, {
    startY: 48,

    head: [["ID", "Product", "Category", "Price"]],

    body: products.map((item) => [
      item.id,
      item.name,
      item.category,
      `$${item.price}`,
    ]),

    foot: [
      [
        "",
        "",
        "Total Price",
        `$${totalPrice}`,
      ],
    ],

    theme: "grid",

    headStyles: {
      fillColor:[13, 110, 253]
    },

    footStyles: {
      fillColor:[40, 167, 69]
    },
  });

  doc.save("Products_Report.pdf");
};
