import { 
  ChangeDetectorRef, 
  Component, 
  ChangeDetectionStrategy,
  ElementRef, 
  HostListener, 
  OnInit, 
  ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IImage } from '../../models/image';
import { ImagesApi } from '../../services/images-api';
import { IFilter } from '../../models/filter';
import { environment } from '../../../environments/environment';
import { FiltersApi } from '../../services/filters-api';
import { Contacts } from '../../components/contacts/contacts';

@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, Contacts],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  @ViewChild('filterRoot') filterRoot!: ElementRef;

  images: IImage[] = [];
  isOpenFilter = false;
  filters: IFilter[] = [];
  
  constructor(
    private imagesApi: ImagesApi, 
    private cdr: ChangeDetectorRef, 
    private filtersApi: FiltersApi
  ) {}

  ngOnInit(): void {
    this.imagesApi.getAll().subscribe(res => {
      this.images = res.map((image: IImage) => ({
        ...image,
        url: environment.apiUrl + image.url
      }));
      this.cdr.markForCheck();
    });

    this.filtersApi.getAll().subscribe(res => {
      const apiFilters = res.map((filter: IFilter) => ({
        ...filter,
        isSelect: true
      }));

      this.filters = [
        {
          id: 0,
          name: 'Все',
          isDefault: true,
          isSelect: true
        },
        ...apiFilters
      ]
      
      this.cdr.markForCheck();
    });
  }

  toggleFilter() {
    this.isOpenFilter = !this.isOpenFilter;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.filterRoot?.nativeElement.contains(event.target)) {
      this.isOpenFilter = false;
    }
  }

  get selectedCategoryIds(): number[] {
    return this.filters
      .filter(f => f.isSelect && f.id !== 0)
      .map(f => f.id);
  }

  get filteredImages(): IImage[] {
    const categoryFilters = this.filters.filter(f => f.id !== 0);
    const selectedFilters = categoryFilters.filter(f => f.isSelect);

    if (selectedFilters.length === categoryFilters.length) {
      return this.images;
    }

    return this.images.filter(image =>
      image.categoryId != null &&
      this.selectedCategoryIds.includes(image.categoryId)
    );
  }

  onFilterChange(filter: IFilter) {
    const allFilter = this.filters.find(f => f.id === 0)!;
    const categoryFilters = this.filters.filter(f => f.id !== 0);

    if (filter.id === 0) {
      const newValue = !filter.isSelect;
      this.filters.forEach(f => f.isSelect = newValue);
    } else {
      filter.isSelect = !filter.isSelect;
      const allSelected = categoryFilters.every(f => f.isSelect);

      if (allSelected) {
        allFilter.isSelect = true;
      } else {
        allFilter.isSelect = false;
      }
    }

    this.cdr.detectChanges();
  }
}
