import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdd } from './dialog-add';

describe('DialogAdd', () => {
  let component: DialogAdd;
  let fixture: ComponentFixture<DialogAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
