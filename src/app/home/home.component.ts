import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    {path: '../../assets/images/1.jpg'},
    {path: '../../assets/images/2.jpg'},
    {path: '../../assets/images/3.jpg'},
    {path: '../../assets/images/4.jpg'},
    {path: '../../assets/images/5.jpg'},
    {path: '../../assets/images/6.jpg'},
    {path: '../../assets/images/7.jpg'},
    {path: '../../assets/images/8.jpg'},
    {path: '../../assets/images/9.jpg'},
    {path: '../../assets/images/10.jpg'},
    {path: '../../assets/images/11.jpg'},
    {path: '../../assets/images/12.jpg'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}