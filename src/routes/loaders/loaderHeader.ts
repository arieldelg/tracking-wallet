import {
  activeAccountHelper,
  //   activeNoteHelper,
  //   getAccounts,
  //   getNotes,
  getSingleAccount,
} from "../../helpers/wallet";

const loader = async () => {
  const id = activeAccountHelper({});

  try {
    const account = await getSingleAccount(id);
    // dispatch(setSaveAllUserAccounts(accounts));

    // const getAccountActive = activeAccountHelper({
    //   refresh: true,
    //   account: accounts[0]._id,
    // });

    // const [account] = accounts.filter(
    //   (account) => account._id === getAccountActive
    // );

    // dispatch(setActiveAccount(account));

    // const notes = await getNotes(getAccountActive as string);
    // activeNoteHelper({ refresh: true, note: notes[0]?._id });
    // const note = notes.find((note) => note._id === id);
    //   dispatch(setNotes(notes));
    //   dispatch(setActiveNoteSlice(filterNote));

    return {
      account,
    };
  } catch (error) {
    console.log(error, "startGetDataDB");
    return null;
  }
};

export default loader;
