import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GeneralApi } from "../../../services/general-api";
import { AdminHeader } from "../header/header";
import { IMainInfo } from "../../../models/general";
import { UploadApi } from "../../../services/upload";

@Component({
  standalone: true,
  selector: 'admin-general',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general.html',
  styleUrls: ['./general.scss'],
  imports: [CommonModule, FormsModule, AdminHeader],
})
export class AdminGeneral implements OnInit {
  model: IMainInfo = {
    title: '',
    subtitle: '',
    aboutText: '',
    aboutImageUrl: '',
  };
  isLoading = false;
  isSaving = false;

  constructor(
    private generalApi: GeneralApi, 
    private uploadApi: UploadApi, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.generalApi.get().subscribe(res => {
      this.model = res;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.isSaving = true;
    this.generalApi.update(this.model).subscribe(() => {
      this.isSaving = false;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('file', input.files[0]);

    this.uploadApi.upload(formData).subscribe(res => {
      this.model.aboutImageUrl = res.url;
      this.cdr.detectChanges();
    });
  }
}
