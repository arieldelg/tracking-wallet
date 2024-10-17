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
  account: string;
  quantity: number;
  tag: string;
  date: number;
  currency: Currency;
  images?: IMG[] | null;
};

export interface PropsCardAccounts {
  title: string;
  quantity: number;
  currency: Currency;
  description: string;
  id: string;
  toogleClass?: (event: HTMLDivElement | null) => void;
  active: boolean;
  setEditAccount: (value: UsersAccount) => void;
  setOpenModal: ({ note }: { note?: NoteProps }) => void;
  setDeleteAccount: (id: string) => void;
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
