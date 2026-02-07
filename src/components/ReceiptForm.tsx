import React from "react";
import { BillData } from "@/lib/types";

interface ReceiptFormProps {
    data: BillData;
    onChange: (data: BillData) => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ data, onChange }) => {
    const handleChange = (field: keyof BillData, value: string | number) => {
        onChange({ ...data, [field]: value });
    };

    const handleDeepChange = (
        category: "electricity" | "water",
        field: "current" | "previous" | "unitPrice",
        value: number
    ) => {
        onChange({
            ...data,
            [category]: {
                ...data[category],
                [field]: value,
            },
        });
    };

    const months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">ข้อมูลบิล</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">เดือน</label>
                    <select
                        value={data.month}
                        onChange={(e) => handleChange("month", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
                    >
                        <option value="" disabled>เลือกเดือน</option>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">หมายเลขห้อง</label>
                    <input
                        type="text"
                        value={data.roomNumber}
                        onChange={(e) => handleChange("roomNumber", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">ค่าเช่าห้อง (บาท)</label>
                <input
                    type="number"
                    value={data.rent || ""}
                    onChange={(e) => handleChange("rent", Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
            </div>

            <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">⚡️</span> ค่าไฟ
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500">หน่วยปัจจุบัน</label>
                        <input
                            type="number"
                            value={data.electricity.current || ""}
                            onChange={(e) => handleDeepChange("electricity", "current", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">หน่วยเดือนก่อน</label>
                        <input
                            type="number"
                            value={data.electricity.previous || ""}
                            onChange={(e) => handleDeepChange("electricity", "previous", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">บาท/หน่วย</label>
                        <input
                            type="number"
                            value={data.electricity.unitPrice || ""}
                            onChange={(e) => handleDeepChange("electricity", "unitPrice", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">💧</span> ค่าน้ำ
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500">หน่วยปัจจุบัน</label>
                        <input
                            type="number"
                            value={data.water.current || ""}
                            onChange={(e) => handleDeepChange("water", "current", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">หน่วยเดือนก่อน</label>
                        <input
                            type="number"
                            value={data.water.previous || ""}
                            onChange={(e) => handleDeepChange("water", "previous", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">บาท/หน่วย</label>
                        <input
                            type="number"
                            value={data.water.unitPrice || ""}
                            onChange={(e) => handleDeepChange("water", "unitPrice", Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700">ค่าขยะ (บาท)</label>
                <input
                    type="number"
                    value={data.trash || ""}
                    onChange={(e) => handleChange("trash", Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
            </div>
        </div>
    );
};
