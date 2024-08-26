import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { authLogout } from "services/auth";
import useCookie from "hooks/useCookie";

interface ILogoutHookReturn {
  handleLogout: () => Promise<void>;
  isLoadingLogout: boolean;
}

const useLogout = (): ILogoutHookReturn => {
  const navigate = useNavigate();
  const { removeFromCookie } = useCookie();

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoadingLogout(true);
      const response = await authLogout();

      if (response?.success) {
        removeFromCookie();
        navigate("/masuk", {
          replace: true,
        });

        toast.success("Berhasil logout!");
        setIsLoadingLogout(false);
        return;
      }

      console.error({ response });
      toast.error("Gagal logout, silahkan coba lagi!");
      setIsLoadingLogout(false);
    } catch (error) {
      setIsLoadingLogout(false);
      toast.error("Gagal logout, silahkan coba lagi!");
      console.error({ error });
    }
  };

  return { handleLogout, isLoadingLogout };
};

export default useLogout;
