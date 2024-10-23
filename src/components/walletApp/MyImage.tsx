import { CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IMG } from "../../interface/walletApp";

type Props = {
  images: IMG[];
  setImage: React.Dispatch<React.SetStateAction<IMG[]>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setDeleteImages: (value: string) => void;
};

const MyImage = ({ images, setImage, setFiles, setDeleteImages }: Props) => {
  if (images.length > 0)
    return images.map((props) => {
      return (
        <div className="imageContainerUpload" key={props.id}>
          <img
            src={props.httpURL}
            alt={props.id}
            className="w-full rounded-xl"
          />
          <button
            className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
            onClick={() => {
              setImage((prev) => {
                const filter = prev?.filter((img) => img.id !== props.id);
                return [...(filter as IMG[])];
              });

              if (props.httpURL.startsWith("blob:")) {
                setFiles((prev) => {
                  const filter = prev.filter((img) => img.name !== props.id);
                  console.log(filter);
                  return [...filter];
                });

                return URL.revokeObjectURL(props.httpURL);
              }

              const filterDeleteImages = images.filter(
                (img) => img.id === props.id
              )[0].id;

              setDeleteImages(filterDeleteImages);
            }}
          >
            <TrashIcon className="w-5 text-red-500" />
          </button>
        </div>
      );
    });
  else
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4 col-span-3">
        <CloudArrowUpIcon className="w-36 text-gray-500" />
        <p className="text-2xl text-gray-500">Upload an Image!!</p>
      </div>
    );
};

export default MyImage;
