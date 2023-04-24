export interface Product {
  name: string;
  price: number;
  description: string;
  image?: string | null;
  imgURL?: string | ArrayBuffer | null | undefined;
  id: number;
}
