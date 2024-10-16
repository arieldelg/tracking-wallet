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
  name: string;
}

export type NoteProps = {
  id: string;
  typeCurrency: TypeCurrency;
  title: string;
  note: string;
  typePayment: PaymentType | "";
  quantity: number;
  tag: string;
  date: number;
  currency: Currency;
  images?: IMG[] | null;
};

export interface PropsCardAccounts {
  title: string;
  quantity: number;
  typeCurrency: string;
  description: string;
  id: string;
  toogleClass?: (event: HTMLDivElement | null) => void;
  setActive?: (value: string) => void;
  active: boolean;
}

export interface UsersAccount extends UsersAccountFormik {
  id: string;
}

export interface UsersAccountFormik {
  title: string;
  description: string;
  quantity: number;
  currency: Currency;
}
