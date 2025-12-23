export interface IService {
  title: string;
  isHome: boolean;
  items: IServiceItem[];
  isOpen: boolean;
}

interface IServiceItem {
  text: string;
}
