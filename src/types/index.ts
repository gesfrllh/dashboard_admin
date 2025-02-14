export interface DeleteModal {
  isOpen: boolean,
  onClose: () => void,
  onDelete: () => void
}

export interface Products {
  id: number,
  name: string;
  price: number;
  description: string;
  customerId: number;
  image: { url: string } | null;
}

export interface Customer {
  name: string;
  price: number;
  description: string;
  customerId: number;
  image_data: string;
}