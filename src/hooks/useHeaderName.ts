import { useAppDispatch } from "../store/hooks";
import { setHeader } from "../store/ui/uiSlice";

const useHeaderName = () => {
  const dispatch = useAppDispatch();

  const setHeaderName = (name: string) => {
    let header;
    if (name !== "Home") header = name;
    else header = "Dashboard";
    dispatch(setHeader(header));
  };

  return {
    // methods
    setHeaderName,
  };
};

export default useHeaderName;
