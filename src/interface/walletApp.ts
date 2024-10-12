export type PaymentType =
  | "cash"
  | "creditCard"
  | "debitCard"
  | "transfer"
  | "checkBook";
export type Currency = "MXN" | "USD";
export type TypeCurrency = "income" | "expense";

export interface InitialValues {
  typePayment: PaymentType | "";
  date: Date;
  tag: string;
  title: string;
  note: string;
  quantity: number;
  currency: Currency;
  typeCurrency: TypeCurrency;
}

interface IMG {
  id: string;
  img: string;
}

export type NoteProps = {
  id: string;
  typeCurrency: string;
  title: string;
  note: string;
  typePayment: string;
  quantity: number;
  tag: string;
  date: string;
  currency: Currency;
  images: IMG[] | null;
};
