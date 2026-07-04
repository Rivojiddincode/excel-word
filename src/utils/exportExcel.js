import * as XLSX from "xlsx"
import { saveAs } from "file-saver"


export const exportExcel =(products)=> {
    const data = products.map((item)=> ({
        ID: item.id,
        Products: item.name,
        Category: item.category,
        Price: item.price,
    }));

    const totalPrice = products.reduce((sum, item)=> sum + item.price, 0);

    data.push({});

    data.push({
        Product:"Total Price",
        Price: totalPrice,
    });

    data.push({
        Product:"Date",
        Category: new Date().toLocaleDateString(),
    });

    data.push({
        Product:"Products",
        Category: products.length,
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
     worksheet["!close"]=[
        {wch: 10},
        {wch: 30},
        {wch: 20},
        {wch: 15},
     ];


     const workbook =XLSX.utils.book_new()

     XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
     const excelBuffer =XLSX.write(workbook,{
        bookType: "xlsx",
        type: "array",
     });

     const file = new Blob([excelBuffer],{
        type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

     });

     saveAs(file, "Products_Report.xlsx");

