import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { authLogout } from "services/auth";
import useCookie from "hooks/useCookie";
import { AxiosError } from "axios";
import { ERROR_CODE_UNAUTHENTICATED } from "utils/http";
import { setTokenBearer } from "utils/axios";

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
        setTokenBearer("");
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
      const status = (error as AxiosError)?.response?.status;
      console.error({ error });

      setIsLoadingLogout(false);
      if (status === ERROR_CODE_UNAUTHENTICATED) {
        removeFromCookie();
        navigate("/masuk", {
          replace: true,
        });

        window.location.reload();
        toast.error("Sesi Anda telah berakhir, silahkan login kembali");
      } else {
        toast.error("Gagal logout, silahkan coba lagi!");
      }
    }
  };

  return { handleLogout, isLoadingLogout };
};

export default useLogout;
