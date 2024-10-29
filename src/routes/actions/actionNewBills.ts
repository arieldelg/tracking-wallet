import { ActionFunctionArgs } from "react-router-dom";
import {
  saveNote,
  // activeNoteHelper,
  // saveNote,
  savingImages,
} from "../../helpers/wallet";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const images = formData.getAll("image") as File[];
  const values = Object.fromEntries(formData);

  try {
    await saveNote(values, images);
    if (images.length > 0) await savingImages(images);

    //     const form = formData as { images: string };
    //     if (form.images === "false") activeNoteHelper({ newNote: true });

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
