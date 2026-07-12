import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "p1",
    slug: "gold-kundan-choker",
    name: "Kundan Choker Necklace",
    category: "necklace",
    material: "kundan",
    price: 84500,
    weightGrams: 42,
    description:
      "A hand-set kundan choker with a traditional meenakari reverse, strung on a temple-style pearl base.",
    images: [],
    inStock: true,
    stockCount: 3,
    sku: "AAB-NCK-001",
    isFeatured: true,
  },
  {
    id: "p2",
    slug: "22k-antique-jhumka",
    name: "Antique Gold Jhumka",
    category: "earring",
    material: "gold-22k",
    price: 38900,
    weightGrams: 14,
    description:
      "22k gold jhumkas with an oxidised antique finish and fine filigree work along the dome.",
    images: [],
    inStock: true,
    stockCount: 6,
    sku: "AAB-EAR-014",
    isFeatured: true,
  },
  {
    id: "p3",
    slug: "polki-solitaire-ring",
    name: "Polki Solitaire Ring",
    category: "ring",
    material: "polki",
    price: 112000,
    weightGrams: 6,
    description:
      "An uncut polki diamond set in 18k gold, framed by a delicate rope-twist border.",
    images: [],
    inStock: true,
    stockCount: 2,
    sku: "AAB-RNG-007",
    isFeatured: true,
  },
  {
    id: "p4",
    slug: "gold-bangle-set",
    name: "Classic Gold Bangle Set (Pair)",
    category: "bangle",
    material: "gold-22k",
    price: 156000,
    weightGrams: 58,
    description:
      "A pair of everyday 22k gold bangles with a brushed matte band and hairline engraving.",
    images: [],
    inStock: false,
    stockCount: 0,
    sku: "AAB-BNG-003",
  },
  {
    id: "p5",
    slug: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    category: "bracelet",
    material: "diamond",
    price: 198000,
    weightGrams: 11,
    description:
      "A continuous line of brilliant-cut diamonds in a four-prong 18k white gold setting.",
    images: [],
    inStock: true,
    stockCount: 4,
    sku: "AAB-BRC-009",
  },
  {
    id: "p6",
    slug: "silver-lotus-pendant",
    name: "Lotus Pendant",
    category: "pendant",
    material: "silver-925",
    price: 6400,
    weightGrams: 8,
    description:
      "A sterling silver lotus pendant with a hand-textured petal finish, on an adjustable chain.",
    images: [],
    inStock: true,
    stockCount: 12,
    sku: "AAB-PND-021",
  },
];

export function getFeaturedProducts() {
  return products.filter((p) => p.isFeatured);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
