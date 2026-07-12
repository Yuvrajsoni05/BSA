export type ProductCategory =
  | "necklace"
  | "ring"
  | "earring"
  | "bangle"
  | "bracelet"
  | "pendant";

export type ProductMaterial = "gold-22k" | "gold-18k" | "silver-925" | "diamond" | "kundan" | "polki";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  material: ProductMaterial;
  price: number;
  weightGrams: number;
  description: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
  isFeatured?: boolean;
}
