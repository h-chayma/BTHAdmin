import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEpreuveComponent } from './edit-epreuve.component';

describe('EditEpreuveComponent', () => {
  let component: EditEpreuveComponent;
  let fixture: ComponentFixture<EditEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEpreuveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
