import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../../services/api';
import { ToastService } from '../toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  @Output() close = new EventEmitter<void>();

  form;
  stars = Array(5).fill(0);
  hoveredIndex: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private api: Api,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      text: [''],
      rating: [0, Validators.min(1)],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.api.sendReview(this.form.value).subscribe(() => {
      this.toast.success('Отзыв успешно отправлен!');
    })
    
    this.form.reset();
    this.close.emit();
  }

  onHover(index: number): void {
    this.hoveredIndex = index;
  }

  onLeave(): void {
    this.hoveredIndex = null;
  }

  getStarIcon(index: number): string {
    let rating = 0;
    if (this.form.controls['rating'].value) {
      rating = this.form.controls['rating'].value
    };

    if (this.hoveredIndex !== null) {
      return index <= this.hoveredIndex
        ? 'icons/star_fill.svg'
        : 'icons/star_empty.svg';
    }

    return index < rating
      ? 'icons/star_fill.svg'
      : 'icons/star_empty.svg';
  }

  onRate(index: number): void {
    this.form.patchValue({
      rating: index + 1
    });
  }
}
