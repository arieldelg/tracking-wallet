import { ActionFunctionArgs } from "react-router-dom";
import {
  activeAccountHelper,
  deleteAccount,
  saveAccount,
  updateNote,
} from "../../helpers/wallet";
import { UsersAccount, UsersAccountFormik } from "../../interface/walletApp";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData) as {
    _id?: string;
    active?: string;
    delete?: string;
  };

  if (values.active) return activeAccountHelper({ account: values.active });
  try {
    if (values._id) {
      activeAccountHelper({ account: values._id });
      await updateNote(values as UsersAccount);
      return null;
    }
    if (values.delete) {
      await deleteAccount(values.delete);
      activeAccountHelper({ deleteAccount: true });
      return null;
    }
    if (!values._id) {
      const id = await saveAccount(values as UsersAccountFormik);
      activeAccountHelper({ account: id });
      return null;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
