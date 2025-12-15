import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  services = [
    {
      isOpen: false,
      title: 'напольные покрытия',
      list: [
        'монтаж деревянных лестниц', 
        'монтаж бетонного, металлического основания лестницы',
        'ограждение лестницы (дерево, металл, ковка)',
        'обшивка деревянным массивом лестницы',
        'реставрация старых лестниц'
      ]
    },
    {
      isOpen: false,
      title: 'лестницы',
      list: [
        'монтаж деревянных лестниц', 
        'монтаж бетонного, металлического основания лестницы',
        'ограждение лестницы (дерево, металл, ковка)',
        'обшивка деревянным массивом лестницы',
        'реставрация старых лестниц'
      ]
    },
    {
      isOpen: false,
      title: 'реставрация',
      list: []
    },
    {
      isOpen: false,
      title: 'плинтус',
      list: [
        'монтаж плинтуса (деревянного, мдф, полимерного, полиуретанового, пластикого)',
        'покраска плинтуса'
      ]
    }
  ];

  images = [
    {
      src: 'images/1.jpg'
    },
    {
      src: 'images/2.jpg'
    },
    {
      src: 'images/3.jpg'
    },
    {
      src: 'images/4.jpg'
    },
    {
      src: 'images/1.jpg'
    },
  ];

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
