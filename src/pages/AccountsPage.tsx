import {
  MyContainerCardAccounts,
  MyNewButton,
  MyNewEmptySection,
} from "../components";
import Modal from "../modals/Modal";
import { toogleClass } from "../helpers";
import { NewAccount, WarningView } from "./views";
import { useWalletStore, useWindowDimensions } from "../hooks";
import { activeAccountHelper } from "../helpers/wallet";
import ModalDelete from "../modals/ModalDelete";

const AccountsPage = () => {
  const {
    setOpenModal,
    isOpenModal,
    Accounts,
    setEditAccount,
    setResetAccount,
    setOpenModalDelete,
    isOpenModalDelete,
  } = useWalletStore();
  const { height } = useWindowDimensions();
  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton
        openModal={() => {
          setResetAccount();
          setOpenModal({});
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
              key={props._id}
              toogleClass={toogleClass}
              active={props._id === activeAccountHelper({})?._id ? true : false}
              setEditAccount={setEditAccount}
              setOpenModal={setOpenModal}
              setOpenDelete={setOpenModalDelete}
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
