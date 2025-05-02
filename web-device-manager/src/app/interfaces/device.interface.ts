import { Category } from "./category.interface";

export interface Device {
  id:          number;
  partNumber:  number;
  color:       string;
  category:    Category;
}
