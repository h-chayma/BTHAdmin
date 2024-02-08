import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BTHAService } from '../../service/btha.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent implements OnInit {
  nomSection: string = '';
  icon: string = '';

  constructor(private service: BTHAService, private router: Router) { }

  ngOnInit(): void {
    this.service.isLoggedIn();
  }

  addSection() {
    this.service.addSection(this.nomSection, this.icon).subscribe(
      () => {
        this.router.navigate(['/sections']);
      }
    );
  }
}
