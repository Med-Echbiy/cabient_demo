export default interface state {
  client: string;
  unite: string;
  clientId: string;
  start: {
    value: Date;
    validity: boolean;
    type: string;
  };
  end: {
    value: Date;
    validity: boolean;
    type: string;
  };
  service: string;
  assets?:
    | Blob[]
    | {
        _key: string;
        _type: "image";
        asset: { _type: "reference"; _ref: string };
      }[];
}

export interface client {
  fullName: string;
  phone: number;
  email?: string;
  city?: string;
  adress?: string;
}
