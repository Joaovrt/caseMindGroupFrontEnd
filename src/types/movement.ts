import { Product } from "./product";
import { User } from "./user";

export interface Movement {
    id: number;
    productId: number;
    userId: number;
    type: MovementType;
    quantity: number;
    balance: number;
    date: string;
    product:Product;
    user:User
  }

  enum MovementType {
    entrada = 'entrada',
    saida = 'saida',
  }