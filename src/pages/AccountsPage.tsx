import { useState } from "react";
import MockAccounts from "../data/mockAccounts.json";
import { MyContainerCardAccounts, MyNewButton } from "../components";
import Modal from "../modals/Modal";
import { useAppSelector } from "../store/hooks";
import { OpenAccountTabSelector } from "../store/ui/uiSlice";
import { useWalletStore } from "../hooks";

//TODO agregar un dispatch de que resete el estado de abrir y cerrar el tab en Accounts, que se active cuando cambies de ruta

const AccountsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openTab = useAppSelector(OpenAccountTabSelector);
  const { openTabAccounts } = useWalletStore();
  const [idAccount, setIdAccount] = useState<string>("");

  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton openModal={() => setOpenModal(true)} />
      <div className="w-full h-96 flex flex-col justify-start">
        {MockAccounts.map((props) => (
          <MyContainerCardAccounts
            {...props}
            key={props.id}
            openTab={openTab}
            openTabAccounts={openTabAccounts}
            setIdAccount={setIdAccount}
            idAccount={idAccount}
          />
        ))}
      </div>
      {openModal && (
        <Modal>
          <p>Hola</p>
        </Modal>
      )}
    </div>
  );
};

export default AccountsPage;
