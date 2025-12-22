import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../models/image';
import { Api } from '../../services/api';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  @ViewChild('filterRoot') filterRoot!: ElementRef;

  images: Image[] = [];
  isOpenFilter = false;
  filters: Filter[] = [];
  
  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getImages().subscribe(res => {
      this.images = res.data.map((item: any) => ({
        ...item,
        src: 'http://localhost:1337' + item.image.url
      }));
    });

    this.api.getFilters().subscribe(res => {
      this.filters = res.data.map((item: any) => ({
        ...item,
        isSelect: true
      }));
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

  get selectedCategories(): string[] {
    return this.filters
      .filter(f => f.isSelect)
      .map(f => f.filter);
  }

  get filteredImages() {
    return this.images.filter(image => {
      const category = image.category ?? 'Другое';
      return this.selectedCategories.includes(category);
    });
  }
}
