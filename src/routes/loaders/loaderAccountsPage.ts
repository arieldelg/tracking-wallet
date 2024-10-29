import { getAccounts } from "../../helpers/wallet";

const loader = async () => {
  try {
    const accounts = await getAccounts();
    return {
      accounts,
      title: "Accounts",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default loader;
