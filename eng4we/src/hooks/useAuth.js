// Custom hook to consume AuthContext and provide auth info/actions
import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useAuthContext();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
