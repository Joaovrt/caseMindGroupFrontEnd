export interface Product {
    id: number;
    name: string;
    description:string;
    value: number;
    minimum_value: number;
    quantity: number;
    image: string | null;
  }