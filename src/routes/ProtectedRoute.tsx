import { NavLink, NavLinkRenderProps, Outlet } from "react-router-dom";

interface RoutesProps {
  id: string;
  to: string;
  label: string;
}

interface NavBarProps {
  img: string;
  routes: RoutesProps[];
}
const ProtectedRoute = (props: NavBarProps) => {
  return (
    <main className="grid grid-cols-[250px_auto] h-screen">
      <header className="w-full h-full bg-[#363a45]">
        <img src={props.img} alt="huron" className="object-cover w-full h-44" />
        <nav className="h-auto flex flex-col items-center justify-center px-4 pt-8">
          <ul className="text-center flex flex-col items-center justify-center w-full space-y-4">
            {props.routes.map(({ id, label, to }) => (
              <li key={id} className="navlinkContainer">
                <NavLink
                  to={to}
                  className={`${({ isActive, isPending }: NavLinkRenderProps) =>
                    isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : null} navlink`}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="w-full xl:max-w-1920 h-full flex flex-col items-center justify-between place-self-center overflow-auto scrollbar">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedRoute;
