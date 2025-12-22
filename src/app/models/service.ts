export interface Service {
  title: string;
  isHome: boolean;
  items: ServiceItem[];
  isOpen: boolean;
}

interface ServiceItem {
  text: string;
}
