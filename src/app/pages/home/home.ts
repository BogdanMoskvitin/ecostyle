import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IService } from '../../models/service';
import { GeneralApi } from '../../services/general-api';
import { ServicesApi } from '../../services/services-api';
import { ImagesApi } from '../../services/images-api';
import { ReviewsApi } from '../../services/reviews-api';
import { IImage } from '../../models/image';
import { IReview } from '../../models/review';
import { Request } from '../../modals/request/request';
import { Review } from '../../modals/review/review';
import { environment } from '../../../environments/environment';
import { Contacts } from '../../components/contacts/contacts';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, CommonModule, Request, Review, Contacts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  title = '';
  subtitle = '';
  about_text = '';
  about_img = '';
  services: IService[] = [];
  images: IImage[] = [];
  reviews: IReview[] = [];
  isRequestOpen = false;
  isReviewOpen = false;
  
  constructor(
    private generalApi: GeneralApi, 
    private servicesApi: ServicesApi,
    private imagesApi: ImagesApi, 
    private reviewsApi: ReviewsApi,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.generalApi.get().subscribe(res => {
      this.title = res.title;
      this.subtitle = res.subtitle;
      this.about_text = res.aboutText;
      this.about_img = environment.apiUrl + res.aboutImageUrl;
      this.cdr.markForCheck();
    });

    this.servicesApi.getAll().subscribe(res => {
      this.services = res.map((service: IService) => ({
        ...service,
        isOpen: false
      }));
      this.cdr.markForCheck();
    });
    
    this.imagesApi.getAll().subscribe(res => {
      this.images = res.map((image: IImage) => ({
        ...image,
        url: environment.apiUrl + image.url
      }));
      this.cdr.markForCheck();
    });
    
    this.reviewsApi.getAll().subscribe(res => {
      this.reviews = res;
      this.cdr.markForCheck();
    });
  }

  scrollDown() {
    const vh = window.innerHeight;
    window.scrollBy({
      top: vh,
      left: 0,
      behavior: 'smooth'
    });
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
