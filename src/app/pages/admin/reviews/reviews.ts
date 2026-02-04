import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from "@angular/core";
import { ReviewsApi } from "../../../services/reviews-api";
import { AdminHeader } from "../header/header";
import { IReview } from "../../../models/review";

@Component({
  standalone: true,
  selector: 'admin-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.scss'],
  imports: [CommonModule, AdminHeader],
})
export class AdminReviews implements OnInit {
  reviews: IReview[] = [];
  isLoading = false;

  constructor(private reviewsApi: ReviewsApi, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;

    this.reviewsApi.getAll().subscribe(res => {
      this.reviews = res;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  remove(id: number) {
    this.reviewsApi.delete(id).subscribe(() => this.load());
  }

  getRatingStars(rating: number) {
    const stars = [];
    
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push({ src: 'icons/star_fill.svg' });
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push({ src: 'icons/star_empty.svg' });
    }

    return stars;
  }
}
