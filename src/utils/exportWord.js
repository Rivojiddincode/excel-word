import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
} from "docx";

export const exportWord = async (products) => {
  const totalPrice = products.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const rows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 10, type: WidthType.PERCENTAGE },
          children: [new Paragraph("ID")],
        }),
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Product")],
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Category")],
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          children: [new Paragraph("Price")],
        }),
      ],
    }),
  ];

  products.forEach((item) => {
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(String(item.id))],
          }),
          new TableCell({
            children: [new Paragraph(item.name)],
          }),
          new TableCell({
            children: [new Paragraph(item.category)],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.price}`)],
          }),
        ],
      })
    );
  });
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          columnSpan: 3,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Total Price",
                  bold: true,
                }),
              ],
            }),
          ],
        }),

        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `$${totalPrice}`,
                  bold: true,
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            text: "Products Report",
          }),

          new Paragraph(
            `Date: ${new Date().toLocaleDateString()}`
          ),

          new Paragraph(
            `Total Products: ${products.length}`
          ),

          new Paragraph(""),

          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "Products_Report.docx";

  a.click();

  window.URL.revokeObjectURL(url);
};
