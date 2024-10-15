import { useState } from "react";

import { MyContainerCardAccounts, MyNewButton } from "../components";
import Modal from "../modals/Modal";

//TODO agregar un dispatch de que resete el estado de abrir y cerrar el tab en Accounts, que se active cuando cambies de ruta

const AccountsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton openModal={() => setOpenModal(true)} />
      <div className="w-full h-96 flex flex-col justify-start">
        <MyContainerCardAccounts />
        <MyContainerCardAccounts />
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
