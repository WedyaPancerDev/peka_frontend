import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useCookie from "hooks/useCookie";
import { AppState, useDispatch, useSelector } from "store/Store";
import PageLoader from "components/PageLoader";
import { useProfileUser } from "hooks/react-query/useAuth";
import { setProfile } from "store/apps/DashboardSlice";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

const AuthenticatedRoute = ({
  children,
}: AuthenticatedRouteProps): JSX.Element => {
  const { getCurrentCookie } = useCookie();
  const { data: profileUserData, isLoading: isLoadingProfile } =
    useProfileUser();

  const { profile } = useSelector((state: AppState) => state.dashboard);
  const dispatch = useDispatch();

  const token = getCurrentCookie();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/masuk", {
        replace: true,
      });

      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token && !profile && profileUserData?.data) {
      dispatch(setProfile(profileUserData?.data));
    }
  }, [token, profile, profileUserData?.data]);

  if (!isAuthenticated || isLoadingProfile) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
