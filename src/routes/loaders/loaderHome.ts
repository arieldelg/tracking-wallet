import { activeAccountHelper, notesHome } from "../../helpers/wallet";

const loader = async () => {
  try {
    const accountID = activeAccountHelper({});
    const notes = await notesHome(accountID);
    return {
      notes,
      title: "Dashboard",
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default loader;
