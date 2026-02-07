import React, { forwardRef } from "react";
import { BillData } from "@/lib/types";

interface ReceiptPreviewProps {
    data: BillData;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
    ({ data }, ref) => {
        return (
            <div className="w-full flex justify-center py-8">
                <div
                    ref={ref}
                    className="bg-white text-black p-8 w-[210mm] min-h-[297mm] shadow-lg box-border relative flex flex-col justify-between"
                    style={{ width: "210mm", height: "auto", minHeight: "297mm" }} // A4 size
                >
                    <SingleReceipt data={data} />

                    <div className="border-b-2 border-dashed border-gray-400 my-8 w-full relative">
                        <span className="absolute left-1/2 -top-3 bg-white px-2 text-gray-500 text-sm transform -translate-x-1/2">
                            ✂️ ตัดตามรอย
                        </span>
                    </div>

                    <SingleReceipt data={data} />
                </div>
            </div>
        );
    }
);

const SingleReceipt = ({ data }: { data: BillData }) => {
    // Calculations
    const elecUnits = data.electricity.current - data.electricity.previous;
    const elecTotal = elecUnits * data.electricity.unitPrice;

    const waterUnits = data.water.current - data.water.previous;
    const waterTotal = waterUnits * data.water.unitPrice;

    const total = data.rent + elecTotal + waterTotal + data.trash;

    return (
        <div className="flex-1">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">ค่าเช่าหอพัก 65/1 หมู่6</h1>
            </div>

            <div className="flex justify-between mb-4 text-lg">
                <div>
                    <span className="font-semibold">เดือน :</span> {data.month}
                </div>
                <div>
                    <span className="font-semibold">ห้อง :</span> {data.roomNumber}
                </div>
            </div>

            {/* Table Container */}
            <div className="border-2 border-black">
                {/* Row 1: Rent */}
                <div className="flex border-b border-black">
                    <div className="w-1/4 p-4 border-r border-black flex items-center justify-center font-semibold text-lg">
                        ค่าเช่าห้อง
                    </div>
                    <div className="w-2/4 p-4 border-r border-black flex items-center justify-center text-lg">
                        1 เดือน
                    </div>
                    <div className="w-1/4 p-4 flex items-center justify-end text-lg font-medium">
                        {data.rent > 0 && data.rent.toLocaleString()}
                    </div>
                </div>

                {/* Row 2: Electricity */}
                <div className="flex border-b border-black">
                    <div className="w-1/4 p-4 border-r border-black flex items-center justify-center font-semibold text-lg">
                        ค่าไฟ :
                    </div>
                    <div className="w-2/4 p-4 border-r border-black text-sm space-y-1 pl-12 flex flex-col justify-center">
                        <div className="flex justify-between w-[90%]">
                            <span>ปัจจุบัน</span>
                            <span className="border-b border-black w-24 text-right px-1">
                                {data.electricity.current || ""}
                            </span>
                        </div>
                        <div className="flex justify-between w-[90%]">
                            <span>เดือนก่อน</span>
                            <span className="border-b border-black w-24 text-right px-1">
                                {data.electricity.previous || ""}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/4 p-4 flex items-center justify-end text-lg font-medium">
                        {elecTotal > 0 && elecTotal.toLocaleString()}
                    </div>
                </div>

                {/* Row 3: Water */}
                <div className="flex border-b border-black">
                    <div className="w-1/4 p-4 border-r border-black flex items-center justify-center font-semibold text-lg">
                        ค่าน้ำ :
                    </div>
                    <div className="w-2/4 p-4 border-r border-black text-sm space-y-1 pl-12 flex flex-col justify-center">
                        <div className="flex justify-between w-[90%]">
                            <span>ปัจจุบัน</span>
                            <span className="border-b border-black w-24 text-right px-1">
                                {data.water.current || ""}
                            </span>
                        </div>
                        <div className="flex justify-between w-[90%]">
                            <span>เดือนก่อน</span>
                            <span className="border-b border-black w-24 text-right px-1">
                                {data.water.previous || ""}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/4 p-4 flex items-center justify-end text-lg font-medium">
                        {waterTotal > 0 && waterTotal.toLocaleString()}
                    </div>
                </div>

                {/* Row 4: Trash */}
                <div className="flex border-b border-black">
                    <div className="w-1/4 p-4 border-r border-black flex items-center justify-center font-semibold text-lg">
                        ค่าขยะ
                    </div>
                    <div className="w-2/4 p-4 border-r border-black"></div>
                    <div className="w-1/4 p-4 flex items-center justify-end text-lg font-medium">
                        {data.trash > 0 && data.trash.toLocaleString()}
                    </div>
                </div>

                {/* Row 5: Total */}
                <div className="flex">
                    <div className="w-3/4 p-4 border-r border-black flex items-center justify-center font-bold text-xl">
                        รวมทั้งสิ้น
                    </div>
                    <div className="w-1/4 p-4 flex items-center justify-end text-xl font-bold text-black">
                        {total > 0 && total.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

ReceiptPreview.displayName = "ReceiptPreview";
