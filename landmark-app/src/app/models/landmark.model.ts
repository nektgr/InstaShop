// landmark.model.ts

// Interface representing a Landmark
export interface Landmark {
  objectId: string;         // Unique identifier for the landmark
  title: string;            // Title of the landmark
  photo_thumb: string;      // URL for the thumbnail photo of the landmark
  short_info: string;       // Short information about the landmark
  description: string;      // Detailed description of the landmark
  official_site: string;    // URL of the official site related to the landmark
  location: number[];       // Array representing the geographical location of the landmark
  order: number;            // Order or priority of the landmark
  photo: string;            // URL for the full-size photo of the landmark
}

// Interface representing a list of Landmarks
export interface LandmarkList {
  results: Landmark[];      // Array of Landmark objects
}

// Interface representing the response after updating a landmark
export interface UpdateResponse {
  updatedAt: string;        // Timestamp indicating when the update occurred
}
