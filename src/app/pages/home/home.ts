import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { images, services } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  services = services;

  images = images;

  reviews = [
    {
      name: 'Иван Иванов',
      text: 'Отличные мастера, сделали все быстро, качественно. Нареканий нет. Еще и не дорого',
      rating: 3.5,
    },
    {
      name: 'Антонио Бандерос',
      text: 'Ну сойдет. Паркет постелили наизнанку. Но в целом не плохо.',
      rating: 3,
    },
    {
      name: 'Дональд',
      text: 'Мы сделаем Америку снова великой! Здесь должен быть какой то длинный текст для примера',
      rating: 4.5,
    }
  ]

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

    if (rating % 1 >= 0.5) {
      stars.push({ src: 'icons/star_half.svg' });
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push({ src: 'icons/star_empty.svg' });
    }

    return stars;
  }
}
