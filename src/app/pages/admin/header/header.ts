import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth";

@Component({
  standalone: true,
  selector: 'admin-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [CommonModule, RouterModule],
})
export class AdminHeader {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
