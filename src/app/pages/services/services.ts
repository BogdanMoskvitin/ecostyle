import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { Service } from '../../models/service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  services: Service[] = [];

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getServices().subscribe(res => {
      this.services = res.data;
    });
  }
}
