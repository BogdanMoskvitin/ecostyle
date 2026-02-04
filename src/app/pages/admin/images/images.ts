import { CommonModule } from "@angular/common";
import { 
  Component, 
  ChangeDetectionStrategy, 
  ElementRef, 
  HostListener, 
  OnInit, 
  ViewChild, 
  ChangeDetectorRef
} from "@angular/core";
import { ImagesApi } from "../../../services/images-api";
import { FormsModule } from "@angular/forms";
import { AdminHeader } from "../header/header";
import { FiltersApi } from "../../../services/filters-api";
import { forkJoin } from "rxjs";
import { IFilter } from "../../../models/filter";
import { IImage } from "../../../models/image";
import { UploadApi } from "../../../services/upload";

@Component({
  standalone: true,
  selector: 'admin-images',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './images.html',
  styleUrls: ['./images.scss'],
  imports: [CommonModule, FormsModule, AdminHeader],
})
export class AdminImages implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  images: IImage[] = [];
  filters: IFilter[] = [];
  newImage: Partial<IImage> = {
    url: '',
    description: '',
    categoryId: undefined,
    showOnMain: false,
  };
  isLoading = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  openSelectId: number | 'new' | null = null;
  selectedCategory: IFilter | null = null;

  constructor(
    private imagesApi: ImagesApi, 
    private filtersApi: FiltersApi,
    private uploadApi: UploadApi,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    
    forkJoin({
      images: this.imagesApi.getAll(),
      filters: this.filtersApi.getAll()
    }).subscribe(({ images, filters }) => {
      this.images = images;
      this.filters = filters;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  add() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.uploadApi.upload(formData).subscribe(res => {
      const defaultCategory = this.filters.find(f => f.isDefault);

      const image: Partial<IImage> = {
        url: res.url,
        description: this.newImage.description,
        categoryId: this.newImage.categoryId ?? defaultCategory?.id,
        showOnMain: this.newImage.showOnMain,
      };

      this.imagesApi.add(image).subscribe(() => {
        this.resetForm();
        this.load();
      });
    });
  }

  update(image: IImage) {
    this.imagesApi.update(image).subscribe();
  }

  remove(id: number) {
    this.imagesApi.delete(id).subscribe(() => this.load());
  }

  resetForm() {
    this.newImage = {
      url: '',
      description: '',
      categoryId: undefined,
      showOnMain: false,
    };
    this.selectedFile = null;
    this.previewUrl = null;
    this.selectedCategory = null;

    this.fileInput?.nativeElement && (this.fileInput.nativeElement.value = '');
  }

  getCategoryName(id?: number) {
    return this.filters.find(f => f.id === id)?.name;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  @HostListener('document:click')
  closeSelect() {
    this.openSelectId = null;
  }
  
  selectItem(item?: IFilter) {
    if (item) {
      this.selectedCategory = item;
      this.newImage.categoryId = item.id;
    } else {
      this.selectedCategory = null;
      this.newImage.categoryId = undefined;
    }
    this.openSelectId = null;
  }

  selectCategoryForImage(img: IImage, categoryId?: number) {
    img.categoryId = categoryId;
    this.openSelectId = null;
    this.update(img);
  }
}
