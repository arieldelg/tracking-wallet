import { NavLink, NavLinkRenderProps } from "react-router-dom";
import huron from "../../assets/f6b509853a254673be01d2ee62fb81bf.jpg";
import PrivateRoutes from "../../data/routesDataPrivate.json";
import { useHeaderName } from "../../hooks";
import { useAppDispatch } from "../../store/hooks";
import { startResetActiveNote } from "../../store/wallet/thunk";

const ProtectedSideBar = () => {
  const dispatch = useAppDispatch();
  const { setHeaderName } = useHeaderName();
  return (
    <header className="w-full h-full bg-[#363a45]">
      <img src={huron} alt="huron" className="object-cover w-full h-44" />
      <nav className="h-auto flex flex-col items-center justify-center px-4 pt-8">
        <ul className="text-center flex flex-col items-center justify-center w-full space-y-4">
          {PrivateRoutes.map(({ id, label, to }) => (
            <li key={id} className="navlinkContainer">
              <NavLink
                to={to}
                className={`${({ isActive, isPending }: NavLinkRenderProps) =>
                  isActive ? "active" : isPending ? "pending" : null} navlink`}
                onClick={() => {
                  dispatch(startResetActiveNote());
                  setHeaderName(label);
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default ProtectedSideBar;
