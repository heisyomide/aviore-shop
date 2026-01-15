export interface Product {
  id: number;
  name: string;
  price: string;
  era: string;
  size: string;
  img: string;
}

export interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}