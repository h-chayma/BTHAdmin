import { Component } from '@angular/core';
import { BTHAService } from '../service/btha.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {
  sections: any[] = [];

  constructor(private service: BTHAService) { }

  refreshSections() {
    this.service.getSections().subscribe((res) => {
      this.sections = res
    })
  }

  ngOnInit() {
    this.service.isLoggedIn();
    this.refreshSections();
  }

  deleteSection(sectionId: string) {
    if (confirm('Etes-vous sûr de vouloir supprimer ce section?')) {
      this.service.deleteSection(sectionId);
    }
  }
}
