interface PMVarriable {
  key: string;
  value: string;
}

interface SwaggerCollection {
  id: string;
  collectionName: string;
  local: {
    url: string;
    isInit: boolean;
  };
  remote: {
    url: string;
    isInit: boolean;
  };
  addinVars: PMVarriable[];
  color: string;
  createdAt: Date;
}

export type { SwaggerCollection };
