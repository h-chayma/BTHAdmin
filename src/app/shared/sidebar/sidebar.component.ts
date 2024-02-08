import { Component } from '@angular/core';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private service: BTHAService) { }

  logout() {
    this.service.logout();
  }

}
