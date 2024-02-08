import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuvesComponent } from './epreuves.component';

describe('EpreuvesComponent', () => {
  let component: EpreuvesComponent;
  let fixture: ComponentFixture<EpreuvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpreuvesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpreuvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
