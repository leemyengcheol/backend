export interface IProfile {
  provider: string;
  id: string;
  displayName: string;
  username?: string;
  name?: {
    familyName: string;
    givenName: string;
    middleName?: string;
  };
  emails?: Array<{
    value: string;
    type?: string;
  }>;
  photos?: Array<{
    value: string;
  }>;
  gender: string;
  _raw: string;
  _json: any;
}
