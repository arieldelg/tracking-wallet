import { getNotes } from "../../helpers/wallet";
import { NoteProps } from "../../interface/walletApp";

const loader = async () => {
  const accountID = localStorage.getItem("activeAccount");
  const noteID = localStorage.getItem("activeNote");
  if (accountID) {
    const data = await getNotes(accountID);
    const filterNote = data.find((value) => value._id === noteID) as NoteProps;

    return {
      notes: data,
      title: "Bill Page",
      activeNoteLoader: noteID === "newNote" ? data[0] : filterNote,
    };
  }

  return null;
};

export default loader;
