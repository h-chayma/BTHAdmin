import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SectionsComponent } from './sections/sections.component';
import { MatieresComponent } from './matieres/matieres.component';
import { EpreuvesComponent } from './epreuves/epreuves.component';
import { AddSectionComponent } from './crudSections/add-section/add-section.component';
import { EditSectionComponent } from './crudSections/edit-section/edit-section.component';
import { AddMatiereComponent } from './crudMatieres/add-matiere/add-matiere.component';
import { EditMatiereComponent } from './crudMatieres/edit-matiere/edit-matiere.component';
import { AddEpreuveComponent } from './crudEpreuves/add-epreuve/add-epreuve.component';
import { EditEpreuveComponent } from './crudEpreuves/edit-epreuve/edit-epreuve.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SectionsComponent,
    MatieresComponent,
    EpreuvesComponent,
    AddSectionComponent,
    EditSectionComponent,
    AddMatiereComponent,
    EditMatiereComponent,
    AddEpreuveComponent,
    EditEpreuveComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
