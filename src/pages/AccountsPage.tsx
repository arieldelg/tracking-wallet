import { useState } from "react";
import MockAccounts from "../data/mockAccounts.json";
import { MyContainerCardAccounts, MyNewButton } from "../components";
import Modal from "../modals/Modal";
import { toogleClass } from "../helpers";
import { NewAccount } from "./views";
import { useWalletStore, useWindowDimensions } from "../hooks";

//TODO agregar un dispatch de que resete el estado de abrir y cerrar el tab en Accounts, que se active cuando cambies de ruta

const AccountsPage = () => {
  const { setOpenModal, isOpenModal } = useWalletStore();
  const { height } = useWindowDimensions();
  const [active, setActive] = useState<string | boolean>("");
  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton openModal={() => setOpenModal()} />
      <div
        style={{ height: height - 235 }}
        className="w-full  flex flex-col justify-start overflow-auto scrollbar"
      >
        {MockAccounts.map((props) => (
          <MyContainerCardAccounts
            {...props}
            key={props.id}
            toogleClass={toogleClass}
            setActive={setActive}
            active={props.id === active ? true : false}
          />
        ))}
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
