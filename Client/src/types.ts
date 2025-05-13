export interface Item {
  name: string;
  status: string;
  charge: number;
}

export interface Reservation {
  count: number;
  total: number;
  items: Item[];
  hasCancelled?: boolean;
}