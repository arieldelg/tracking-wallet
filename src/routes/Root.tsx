import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

const Root = () => {
  let status = "unAuthenticaded";
  status = "authenticated";
  if (status === "unAuthenticaded") return <PublicRoute />;
  else return <ProtectedRoute />;
};

export default Root;
