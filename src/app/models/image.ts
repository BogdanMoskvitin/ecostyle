export interface IImage {
  id: number;
  url: string;
  description: string;
  categoryId: number | undefined;
  showOnMain: boolean;
}
