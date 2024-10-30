interface Request {
  name: string;
  path: string;
  method: string;
  body: string;
  preScript: string;
  postScript: string;
  authKind: string;
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
  requests: Request[];
  color: string;
  createdAt: Date;
}

export type { SwaggerCollection, Request };
