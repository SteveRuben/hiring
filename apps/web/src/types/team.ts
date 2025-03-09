export interface TeamSettings {
  name: string;
  username: string;
  autoJoinDomain: boolean;
  restrictToDomain: boolean;
  verifiedDomains: string[];
}

export interface Domain {
  id: string;
  domain: string;
  verified: boolean;
  verificationDate?: Date;
  primary: boolean;
}
