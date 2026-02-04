import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesApi } from '../../services/services-api';
import { IService } from '../../models/service';
import { Contacts } from '../../components/contacts/contacts';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, Contacts],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements OnInit {
  services: IService[] = [];

  constructor(private servicesApi: ServicesApi, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.servicesApi.getAll().subscribe(res => {
      this.services = res;
      this.cdr.markForCheck();
    });
  }
}
