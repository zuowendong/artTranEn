import { http } from "./http";

export interface Photo {
  id: string;
  year: number;
  month: number;
  day: number;
  content: string;
  imgs: string[];
}
