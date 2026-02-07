export interface BillData {
  month: string;
  year: string;
  roomNumber: string;
  rent: number;
  electricity: {
    current: number;
    previous: number;
    unitPrice: number;
  };
  water: {
    current: number;
    previous: number;
    unitPrice: number;
  };
  trash: number;
}

export const initialBillData: BillData = {
  month: "",
  year: new Date().getFullYear().toString(),
  roomNumber: "",
  rent: 0,
  electricity: {
    current: 0,
    previous: 0,
    unitPrice: 10,
  },
  water: {
    current: 0,
    previous: 0,
    unitPrice: 10,
  },
  trash: 0,
};
