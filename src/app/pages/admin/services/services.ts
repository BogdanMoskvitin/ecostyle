import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ServicesApi } from "../../../services/services-api";
import { AdminHeader } from "../header/header";
import { IService } from "../../../models/service";

@Component({
  standalone: true,
  selector: 'admin-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  imports: [CommonModule, FormsModule, AdminHeader],
})
export class AdminServices implements OnInit {
  services: IService[] = [];
  newService: Partial<IService> = {
    name: '',
    items: [],
    showOnMain: false,
  };
  newItemText = '';
  isLoading = false;

  constructor(private servicesApi: ServicesApi, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;

    this.servicesApi.getAll().subscribe(res => {
      this.services = res;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  addService() {
    if (!this.newService.name?.trim()) return;

    this.servicesApi.add(this.newService).subscribe(() => {
      this.resetForm();
      this.load();
    });
  }

  update(service: IService) {
    this.servicesApi.update(service).subscribe();
  }

  remove(id: number) {
    this.servicesApi.delete(id).subscribe(() => this.load());
  }

  addItem() {
    if (!this.newItemText.trim()) return;

    this.newService.items = [
      ...(this.newService.items ?? []),
      this.newItemText,
    ];
    this.newItemText = '';
  }

  removeItem(index: number) {
    this.newService.items?.splice(index, 1);
  }

  addItemToService(service: IService, text: string) {
    if (!text.trim()) return;
    
    service.items.push(text);
    this.update(service);
  }

  removeItemFromService(service: IService, index: number) {
    service.items.splice(index, 1);
    this.update(service);
  }

  resetForm() {
    this.newService = {
      name: '',
      items: [],
      showOnMain: false,
    };
    this.newItemText = '';
  }
}
