import { 
  ChangeDetectorRef, 
  Component, 
  ChangeDetectionStrategy,
  ElementRef, 
  HostListener, 
  Input, 
  ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFilter } from '../../models/filter';

@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  @ViewChild('selectRoot') selectRoot!: ElementRef;
  @Input('items') items!: IFilter[];

  isOpenSelect = false;
  selectedCategory: IFilter | null = null;
  
  constructor(private cdr: ChangeDetectorRef) {}

  toggleSelect() {
    this.isOpenSelect = !this.isOpenSelect;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.selectRoot?.nativeElement.contains(event.target)) {
      this.isOpenSelect = false;
    }
  }
  
  selectItem(item: IFilter) {
    console.log(item);
    this.selectedCategory = item;
    this.isOpenSelect = false;
  }
}
