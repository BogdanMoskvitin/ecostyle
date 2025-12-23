import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IService } from '../../models/service';
import { Api } from '../../services/api';
import { IImage } from '../../models/image';
import { IReview } from '../../models/review';
import { Request } from '../../modals/request/request';
import { Review } from '../../modals/review/review';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, Request, Review],
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
  
  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getGeneral().subscribe(res => {
      this.title = res.data.title;
      this.subtitle = res.data.subtitle;
      this.about_text = res.data.about_text;
      this.about_img = 'http://localhost:1337' + res.data.about_img.url;
    });

    this.api.getServices().subscribe(res => {
      this.services = res.data.map((service: IService) => ({
        ...service,
        isOpen: false
      }));
    });
    
    this.api.getImages().subscribe(res => {
      this.images = res.data.map((item: any) => ({
        ...item,
        src: 'http://localhost:1337' + item.image.url
      }));
    });
    
    this.api.getReviews().subscribe(res => {
      this.reviews = res.data;
    });
  }

  submitRequest() {}

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
