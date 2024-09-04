import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useCookie from "hooks/useCookie";
import { AppState, useDispatch, useSelector } from "store/Store";
import PageLoader from "components/PageLoader";
import { useProfileUser } from "hooks/react-query/useAuth";
import { setProfile } from "store/apps/DashboardSlice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

const AuthenticatedRoute = ({
  children,
}: AuthenticatedRouteProps): JSX.Element => {
  const { getCurrentCookie, removeFromCookie } = useCookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: profileUserData,
    isLoading: isLoadingProfile,
    error,
  } = useProfileUser();
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const token = getCurrentCookie();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleUnauthenticated = () => {
    removeFromCookie();
    navigate("/masuk", { replace: true });
    setIsAuthenticated(false);
  };

  const handleSessionExpired = () => {
    removeFromCookie();
    navigate("/masuk", { replace: true });
    toast.error("Sesi Anda telah berakhir, silahkan login kembali");
  };

  useEffect(() => {
    if (!token) {
      handleUnauthenticated();
    } else {
      setIsAuthenticated(true);
      if (!profile && profileUserData?.data) {
        dispatch(setProfile(profileUserData.data));
      }
    }
  }, [token, profile, profileUserData, dispatch]);

  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      handleSessionExpired();
    }
  }, [error]);

  if (!isAuthenticated || isLoadingProfile) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
