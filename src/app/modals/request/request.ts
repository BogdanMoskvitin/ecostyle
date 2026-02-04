import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestsApi } from '../../services/requests-api';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-request',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './request.html',
  styleUrl: './request.scss',
})
export class Request {
  @Output() close = new EventEmitter<void>();

  form;

  constructor(
    private fb: FormBuilder, 
    private requestsApi: RequestsApi,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.requestsApi.sendRequest(this.form.value).subscribe(() => {
      this.toast.success('Заявка успешно отправлена!');
    })
    
    this.form.reset();
    this.close.emit();
  }
}
