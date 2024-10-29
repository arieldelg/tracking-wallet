import {
  MyContainerCardAccounts,
  MyNewButton,
  MyNewEmptySection,
} from "../components";
import Modal from "../modals/Modal";
import { toogleClass } from "../helpers";
import { NewAccount, WarningView } from "./views";
import { useHeaderName, useWalletStore, useWindowDimensions } from "../hooks";
import ModalDelete from "../modals/ModalDelete";
import { useLoaderData } from "react-router-dom";
import { UsersAccount } from "../interface/walletApp";
import { activeAccountHelper } from "../helpers/wallet";
import { useEffect } from "react";

const AccountsPage = () => {
  const { accounts, title } = useLoaderData() as {
    accounts: UsersAccount[];
    title: string;
    active: boolean;
  };
  const { setHeaderName } = useHeaderName();
  const {
    setOpenModal,
    isOpenModal,
    setResetAccount,
    setOpenModalDelete,
    isOpenModalDelete,
    activeAccountHK,
  } = useWalletStore();

  useEffect(() => {
    setHeaderName(title);
  }, [title, setHeaderName]);

  const { height } = useWindowDimensions();

  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton
        openModal={() => {
          setResetAccount();
          setOpenModal();
        }}
      />
      <div
        style={{ height: height - 235 }}
        className="w-full  flex flex-col justify-start overflow-auto scrollbar"
      >
        {accounts.length > 0 ? (
          accounts.map((props) => (
            <MyContainerCardAccounts
              {...props}
              key={props._id}
              toogleClass={toogleClass}
              active={props._id === activeAccountHelper({}) ? true : false}
              setOpenModal={setOpenModal}
              setOpenDelete={setOpenModalDelete}
              activeAccountHK={activeAccountHK}
            />
          ))
        ) : (
          <MyNewEmptySection
            label="It seems that you dont have any accounts... try adding a new one"
            classNameContainer="h-full"
          />
        )}
      </div>
      {isOpenModal && (
        <Modal>
          <NewAccount />
        </Modal>
      )}
      {isOpenModalDelete && (
        <ModalDelete>
          <WarningView />
        </ModalDelete>
      )}
    </div>
  );
};

export default AccountsPage;
