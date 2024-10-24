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
  images: IMG[];
}

export interface IMG {
  id: string;
  httpURL: string;
}

export interface NoteProps extends InitialValues {
  _id: string;
  account: string;
}

export interface PropsCardAccounts {
  title: string;
  quantity: number;
  currency: Currency;
  description: string;
  _id: string;
  toogleClass?: (event: HTMLDivElement | null) => void;
  active: boolean;
  activeAccountHK: (value: UsersAccount) => void;
  setOpenModal: ({ note }: { note?: NoteProps }) => void;
  setOpenDelete: () => void;
}

export interface UsersAccount extends UsersAccountFormik {
  _id: string;
  user?: string;
  creation?: {
    updatedAt: number;
    creationAt: number;
  };
}

export interface UsersAccountFormik {
  title: string;
  description: string;
  quantity: number;
  currency: Currency;
}

export interface DataAxiosNote {
  data: {
    ok: boolean;
    notes: NoteProps[];
  };
}
