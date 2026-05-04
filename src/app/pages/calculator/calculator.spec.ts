import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { Calculator } from './calculator';

describe('Calculator', () => {
  let component: Calculator;
  let fixture: ComponentFixture<Calculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calculator', () => {
    expect(component).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    component.calculateForm.setValue({
      textField1: 100,
      textField2: 50,
    });

    component.onAdd();

    expect(component.result).toBe(150);
    expect(component.resultText).toContain('100 + 50 = 150');
  });

  it('should subtract two numbers correctly', () => {
    component.calculateForm.setValue({
      textField1: 100,
      textField2: 50,
    });

    component.onSubtract();

    expect(component.result).toBe(50);
    expect(component.resultText).toContain('100 - 50 = 50');
  });

  it('should multiply two numbers correctly', () => {
    component.calculateForm.setValue({
      textField1: 10,
      textField2: 5,
    });

    component.onMultiply();

    expect(component.result).toBe(50);
    expect(component.resultText).toContain('10 × 5 = 50');
  });

  it('should divide two numbers correctly', () => {
    component.calculateForm.setValue({
      textField1: 10,
      textField2: 5,
    });

    component.onDivide();

    expect(component.result).toBe(2);
    expect(component.resultText).toContain('10 ÷ 5 = 2');
  });

  it('should block division by zero', () => {
    component.calculateForm.setValue({
      textField1: 10,
      textField2: 0,
    });

    component.onDivide();

    expect(component.status).toBe('error');
    expect(component.resultText).toContain('Division by zero is forbidden');
  });

  it('should block modulo by zero', () => {
    component.calculateForm.setValue({
      textField1: 10,
      textField2: 0,
    });

    component.onModulo();

    expect(component.status).toBe('error');
    expect(component.resultText).toContain('Modulo by zero is forbidden');
  });

  it('should block square root of negative number', () => {
    component.calculateForm.patchValue({
      textField1: -9,
      textField2: '',
    });

    component.onSquareRootFirst();

    expect(component.status).toBe('error');
    expect(component.resultText).toContain('Square root of a negative number');
  });

  it('should calculate square root correctly', () => {
    component.calculateForm.patchValue({
      textField1: 9,
      textField2: '',
    });

    component.onSquareRootFirst();

    expect(component.result).toBe(3);
    expect(component.resultText).toContain('√9 = 3');
  });

  it('should clear calculator values', () => {
    component.calculateForm.setValue({
      textField1: 10,
      textField2: 5,
    });

    component.onAdd();
    component.onClear();

    expect(component.result).toBe(0);
    expect(component.activeOperation).toBe('None');
    expect(component.resultText).toContain('Enter values');
  });
});