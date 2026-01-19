export interface RequestProject {
  id: string;
  title: string;
  description: string;
  clientId?: string;
  artistId?: string;
  startOffer?: number;
}
