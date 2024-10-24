import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setHeader } from "../store/ui/uiSlice";
import { GetActiveAcountSelector } from "../store/wallet/walletSlice";

const useHeaderName = () => {
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(GetActiveAcountSelector);
  const headerName = useAppSelector((state) => state.ui.headerName);

  const setHeaderName = (name: string) => {
    let header;
    if (name !== "Home") header = name;
    dispatch(setHeader(header as string));
  };

  return {
    //states
    activeAccount,
    headerName,
    // methods
    setHeaderName,
  };
};

export default useHeaderName;
