import { PlusIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useHeaderName } from "../../hooks";

type Props = {
  reset?: () => void;
  headerName?: string;
  to?: string;
  openModal?: () => void;
};

const MyNewButton = ({
  reset,
  headerName = "New Bill",
  to,
  openModal,
}: Props) => {
  const { setHeaderName } = useHeaderName();
  return (
    <NavLink
      className="w-24 h-9 bg-teal-500 rounded-full flex items-center justify-between text-xl px-4 text-white"
      to={to!}
      onClick={() => {
        if (reset) reset();
        if (to) setHeaderName(headerName);
        if (openModal) openModal();
      }}
    >
      <PlusIcon className="w-6" />
      <p>New</p>
    </NavLink>
  );
};

export default MyNewButton;
