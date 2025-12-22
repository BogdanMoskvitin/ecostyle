import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { filters, images } from '../../services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  @ViewChild('filterRoot') filterRoot!: ElementRef;

  images = images;
  isOpenFilter = false;
  filters = filters;

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
