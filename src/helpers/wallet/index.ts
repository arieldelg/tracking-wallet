import { UsersAccount } from "../../interface/walletApp";

/**
 * TODO queda pendiente activeAccountHelper, (delete)
 */

const activeAccountHelper = ({
  account,
  //   id,
  init,
}: //   deleteAccount,
{
  account?: UsersAccount;
  id?: string;
  init?: UsersAccount[];
  deleteAccount?: boolean;
}) => {
  const istrue = !!localStorage.getItem("activeAccount");

  if (init?.length === 0) {
    return false;
  }

  if (init && !istrue) {
    localStorage.setItem("activeAccount", JSON.stringify(init[0]));
    return init[0];
  }

  if (account) {
    localStorage.setItem("activeAccount", JSON.stringify(account));
    return account;
  }

  //   const activeCompare = JSON.parse(
  //     localStorage.getItem("activeAccount") as string
  //   ) as UsersAccount;

  //   if (id && deleteAccount) {
  //     if (id === activeCompare._id) {
  //       localStorage.setItem("activeAccount", JSON.stringify(init[0]));
  //       return init[0];
  //     }
  //   }

  return JSON.parse(localStorage.getItem("activeAccount") as string);
};

export { activeAccountHelper };
