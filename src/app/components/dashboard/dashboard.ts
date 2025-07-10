import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { RouterModule } from '@angular/router'
import { User } from '../../models/auth.dto'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  user?: User

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getMe().subscribe(res => {
      this.user = res?.data.user
    })
  }

  logout() {
    this.auth.logout()
  }
}
