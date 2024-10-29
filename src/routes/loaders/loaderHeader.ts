import { activeAccountHelper, getSingleAccount } from "../../helpers/wallet";

const loader = async () => {
  const id = activeAccountHelper({});

  try {
    const account = await getSingleAccount(id !== undefined ? id : "1");
    return {
      account,
    };
  } catch (error) {
    console.log(error, "startGetDataDB");
    return null;
  }
};

export default loader;
