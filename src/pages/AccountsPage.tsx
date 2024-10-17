import {
  MyContainerCardAccounts,
  MyNewButton,
  MyNewEmptySection,
} from "../components";
import Modal from "../modals/Modal";
import { toogleClass } from "../helpers";
import { NewAccount } from "./views";
import { useWalletStore, useWindowDimensions } from "../hooks";

const AccountsPage = () => {
  const {
    setOpenModal,
    isOpenModal,
    Accounts,
    setEditAccount,
    setResetAccount,
    setDeleteAccount,
    activeAccountMemo,
  } = useWalletStore();
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
        {Accounts.length > 0 ? (
          Accounts.map((props) => (
            <MyContainerCardAccounts
              {...props}
              key={props.id}
              toogleClass={toogleClass}
              active={props.id === activeAccountMemo({})?.id ? true : false}
              setEditAccount={setEditAccount}
              setOpenModal={setOpenModal}
              setDeleteAccount={setDeleteAccount}
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
    </div>
  );
};

export default AccountsPage;
