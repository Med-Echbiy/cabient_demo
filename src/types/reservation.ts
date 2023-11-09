export interface reservation {
  _id: string;
  event_id: string;
  _type: string;
  start: Date;
  end: Date;
  title: string;
  client: {
    _ref: string;
    _type: "reference";
  };
  assets: {
    _key: string;
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  }[];
  service: {
    _type: "reference";
    _ref: string;
  };
  doctors: {
    _ref: string;
    _type: "reference";
  };
}
