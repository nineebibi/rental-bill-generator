"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { BillData, initialBillData } from "@/lib/types";
import { ReceiptForm } from "@/components/ReceiptForm";
import { ReceiptPreview } from "@/components/ReceiptPreview";
import { toPng } from "html-to-image";


export default function Home() {
  const [data, setData] = useState<BillData>(initialBillData);
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);



  const handleOpenImage = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      await document.fonts.ready;
      const element = printRef.current;
      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });

      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(
          '<img src="' + dataUrl + '" style="width:100%; max-width: 210mm;" />'
        );
        newWindow.document.title = `Receipt-${data.roomNumber}`;
      } else {
        alert("โปรดอนุญาต Pop-up เพื่อเปิดดูรูปภาพ");
      }
    } catch (error) {
      console.error("Error opening image:", error);
      alert("เกิดข้อผิดพลาดในการเปิดรูปภาพ");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans pb-20">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">ระบบสร้างบิลค่าเช่า</h1>
          <p className="text-gray-500 text-sm md:text-base">กรอกข้อมูลเพื่อสร้างใบเสร็จรับเงิน</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleOpenImage}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <span className="text-xl">👁️</span> <span className="hidden sm:inline">เปิดดูรูป</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="h-fit">
          <ReceiptForm data={data} onChange={setData} />
        </section>

        <section className="bg-gray-200 rounded-xl p-4 overflow-hidden border shadow-inner flex justify-center items-start min-h-[500px]">
          <div className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.65] xl:scale-[0.8] origin-top transition-transform" id="print-container">
            <ReceiptPreview data={data} ref={printRef} />
          </div>
        </section>
      </main>
    </div>
  );
}
