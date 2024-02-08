import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionsComponent } from './sections/sections.component';
import { MatieresComponent } from './matieres/matieres.component';
import { EpreuvesComponent } from './epreuves/epreuves.component';
import { AddSectionComponent } from './crudSections/add-section/add-section.component';
import { EditSectionComponent } from './crudSections/edit-section/edit-section.component';
import { AddMatiereComponent } from './crudMatieres/add-matiere/add-matiere.component';
import { EditMatiereComponent } from './crudMatieres/edit-matiere/edit-matiere.component';
import { AddEpreuveComponent } from './crudEpreuves/add-epreuve/add-epreuve.component';
import { EditEpreuveComponent } from './crudEpreuves/edit-epreuve/edit-epreuve.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'matieres', component: MatieresComponent },
  { path: 'epreuves', component: EpreuvesComponent },
  { path: 'sections/add', component: AddSectionComponent },
  { path: 'matieres/add', component: AddMatiereComponent },
  { path: 'epreuves/add', component: AddEpreuveComponent },
  { path: 'sections/edit/:id', component: EditSectionComponent },
  { path: 'matieres/edit/:sectionId/:matiereId', component: EditMatiereComponent },
  { path: 'epreuves/edit/:sectionId/:matiereId/:epreuveId', component: EditEpreuveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
