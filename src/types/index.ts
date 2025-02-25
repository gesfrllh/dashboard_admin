export interface DeleteModal {
  isOpen: boolean,
  onClose: () => void,
  onDelete: () => void
  title?: string,
  desc?: string
}

export interface Pagination{
  current_page: number,
  last_page: number,
  per_page: number,
  total: number,
  onPageChange: () => void
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