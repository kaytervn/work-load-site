const colors = [
  "#2B3A42",
  "#304C73",
  "#A35454",
  "#8C4E4E",
  "#849EBC",
  "#463457",
  "#9A6BAA",
  "#334F4F",
  "#566D64",
  "#7E8F82",
  "#A5636D",
  "#7B5C7F",
  "#6B4A6E",
  "#382B66",
  "#684A8F",
  "#D97191",
  "#F49A7A",
  "#25254A",
  "#43357D",
  "#5A5399",
  "#2F4858",
  "#4E696B",
  "#6A8B87",
  "#40405A",
  "#575B7E",
  "#7A849E",
  "#1B2429",
  "#2A4F4F",
];

const PathPattern = /^\/([a-zA-Z0-9_-]+\/)*([a-zA-Z0-9_-]+)(\?[^#]*)?$/;
const HeaderPattern = /^[a-zA-Z0-9-]+$/;
const defaultInteger = 0;
const defaultLong = 6969696969696969;
const defaultDouble = 0.1;
const defaultPageSize = 20;
const defaultBasicAuth = {
  type: "basic",
  basic: [
    { key: "username", value: "{{clientId}}", type: "string" },
    { key: "password", value: "{{clientSecret}}", type: "string" },
  ],
};
const defaultNoAuth = {
  type: "noauth",
};
const defaultTenantHeader = [
  {
    key: "X-tenant",
    value: "{{localTenantId}}",
    type: "text",
    disabled: true,
  },
  {
    key: "X-tenant",
    value: "{{remoteTenantId}}",
    type: "text",
    disabled: true,
  },
];

const myPublicSecretKey = "D@y1aK3yDu0cC0n9";

export {
  defaultInteger,
  defaultLong,
  defaultPageSize,
  defaultBasicAuth,
  defaultTenantHeader,
  defaultDouble,
  colors,
  myPublicSecretKey,
  PathPattern,
  defaultNoAuth,
  HeaderPattern,
};
