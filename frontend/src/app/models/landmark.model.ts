export interface Landmark {
    objectId: string;
    title: string;
    photo_thumb: string;
    short_info: string;
    description: string;
    official_site: string;
    location: number[];
    order: number;
  }
  
  export interface LandmarkList {
    results: Landmark[];
  }