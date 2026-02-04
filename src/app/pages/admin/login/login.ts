import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth";
import { Router } from "@angular/router";

@Component({
  standalone: true,
  selector: 'admin-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule],
})
export class AdminLogin {
  password = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.password.trim()) return;

    this.isLoading = true;

    this.auth.login(this.password).subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.isLoading = false;
      this.router.navigate(['/admin/general']);
    });
  }
}
