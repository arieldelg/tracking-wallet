import { ActionFunctionArgs } from "react-router-dom";
import { deleteImg, deleteNote } from "../../helpers/wallet";

export async function action({ request }: ActionFunctionArgs) {
  const formdata = await request.formData();
  const id = formdata.get("id") as string;
  const images = formdata.getAll("images") as string[];
  try {
    await deleteNote(id);
    if (images.length > 0) return await deleteImg(images);
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
