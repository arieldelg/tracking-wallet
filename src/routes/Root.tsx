import huron from "../assets/f6b509853a254673be01d2ee62fb81bf.jpg";
import PrivateRoutes from "../data/routesDataPrivate.json";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const Root = () => {
  let status = "unAuthenticaded";
  status = "authenticated";
  if (status === "unAuthenticaded") return <PublicRoute />;
  else return <ProtectedRoute img={huron} routes={PrivateRoutes} />;
};

export default Root;
