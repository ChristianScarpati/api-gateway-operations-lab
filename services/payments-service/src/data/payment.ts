export type Payment = {
  id: string;
  customerId: string;
  amount: number;
  currency: string;
  status: "created";
};

export const payments: Payment[] = [];