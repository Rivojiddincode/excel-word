import * as XLSX from "xlsx";

export const exportExcel = (products) => {
  const totalPrice = products.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // Jadval qatorlarini tayyorlash
  const rows = products.map((item) => ({
    ID: item.id,
    Product: item.name,
    Category: item.category,
    Price: `$${item.price}`,
  }));

  // Jami summani oxiriga qo'shish
  rows.push({
    ID: "",
    Product: "",
    Category: "Total Price",
    Price: `$${totalPrice}`,
  });

  // Excel fayl yaratish
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

  // Faylni yuklab olish
  XLSX.writeFile(workbook, "Products_Report.xlsx");
}; // <-- Qavs endi to'liq yopildi
