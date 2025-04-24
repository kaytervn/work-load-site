import { KeyIcon } from "lucide-react";
import { ACCOUNT_CONFIG, PLATFORM_CONFIG } from "./PageConfigDetails";

const PAGE_CONFIG = {
  ...ACCOUNT_CONFIG,
  ...PLATFORM_CONFIG,
};

const DECRYPT_FIELDS = {
  ACCOUNT: ["id", "username", "password", "note"],
  PLATFORM: ["id", "name"],
};

const SIDEBAR_MENUS = [
  {
    name: "Account management",
    icon: <KeyIcon size={20} />,
    items: [PAGE_CONFIG.PLATFORM, PAGE_CONFIG.ACCOUNT],
  },
];

export { PAGE_CONFIG, SIDEBAR_MENUS, DECRYPT_FIELDS };
