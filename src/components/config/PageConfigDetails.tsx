import Account from "../../pages/account/Account";
import CreateAccount from "../../pages/account/CreateAccount";
import UpdateAccount from "../../pages/account/UpdateAccount";
import ViewAccount from "../../pages/account/ViewAccount";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Login from "../../pages/auth/Login";
import RequestResetMfa from "../../pages/auth/RequestResetMfa";
import ResetMfa from "../../pages/auth/ResetMfa";
import ResetPassword from "../../pages/auth/ResetPassword";
import CreatePlatform from "../../pages/platform/CreatePlatform";
import Platform from "../../pages/platform/Platform";
import UpdatePlatform from "../../pages/platform/UpdatePlatform";

const ACCOUNT_CONFIG = {
  ACCOUNT: {
    name: "account",
    label: "Account",
    path: "/account",
    element: <Account />,
  },
  CREATE_ACCOUNT: {
    label: "Create account",
    path: "/account/create",
    element: <CreateAccount />,
  },
  UPDATE_ACCOUNT: {
    label: "Update account",
    path: "/account/update/:id",
    element: <UpdateAccount />,
  },
  DELETE_ACCOUNT: {
    label: "Delete account",
  },
  VIEW_ACCOUNT: {
    label: "View account",
    path: "/account/view/:id",
    element: <ViewAccount />,
  },
};

const PLATFORM_CONFIG = {
  PLATFORM: {
    name: "platform",
    label: "Platform",
    path: "/platform",
    element: <Platform />,
  },
  CREATE_PLATFORM: {
    label: "Create platform",
    path: "/platform/create",
    element: <CreatePlatform />,
  },
  UPDATE_PLATFORM: {
    label: "Update platform",
    path: "/platform/update/:id",
    element: <UpdatePlatform />,
  },
  DELETE_PLATFORM: {
    label: "Delete platform",
  },
};

const USER_CONFIG = {
  LOGIN: {
    label: "Login",
    path: "/login",
    element: <Login />,
  },
  FORGOT_PASSWORD: {
    label: "Forgot password",
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  RESET_PASSWORD: {
    label: "Reset password",
    path: "/reset-password",
    element: <ResetPassword />,
  },
  REQUEST_RESET_MFA: {
    label: "Request reset MFA",
    path: "/request-reset-mfa",
    element: <RequestResetMfa />,
  },
  RESET_MFA: {
    label: "Reset MFA",
    path: "/reset-mfa",
    element: <ResetMfa />,
  },
};

export { ACCOUNT_CONFIG, PLATFORM_CONFIG, USER_CONFIG };
