import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFormPage } from './students-form-page';

describe('StudentsFormPage', () => {
  let component: StudentsFormPage;
  let fixture: ComponentFixture<StudentsFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
