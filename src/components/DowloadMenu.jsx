import { useState } from "react";
import { exportExcel } from "../utils/exportExcel";
import { exportWord } from "../utils/exportWord";
import { exportPDF } from "../utils/exportPDF";

function DownloadMenu({ products }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="download-box">
      <button
        className="download-btn"
        onClick={() => setOpen(!open)}
      >
        📥 Yuklab olish
      </button>

      {open && (
        <div className="dropdown">
          <button
            onClick={() => {
              exportExcel(products);
              setOpen(false);
            }}
          >
            📊 Excel
          </button>

          <button
            onClick={() => {
              exportWord(products);
              setOpen(false);
            }}
          >
            📄 Word
          </button>

          <button
            onClick={() => {
              exportPDF(products);
              setOpen(false);
            }}
          >
            📕 PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default DownloadMenu;
