import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModules } from '../../shared/shared-modules/shared-modules';

type CalculatorStatus = 'idle' | 'success' | 'error';

interface CalculationHistory {
  expression: string;
  result: number;
  timestamp: Date;
}

@Component({
  selector: 'app-calculator',
  imports: [...SharedModules],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
})
export class Calculator {
  calculateForm: FormGroup;

  result = 0;
  resultText = 'Enter values and choose an operation.';
  activeOperation = 'None';
  status: CalculatorStatus = 'idle';

  history: CalculationHistory[] = [];

  readonly maxHistoryItems = 8;
  readonly maxSafeValue = Number.MAX_SAFE_INTEGER;

  constructor(private formBuilder: FormBuilder) {
    this.calculateForm = this.formBuilder.group({
      textField1: ['', Validators.required],
      textField2: ['', Validators.required],
    });
  }

  onAdd(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    const result = numbers.firstNumber + numbers.secondNumber;
    this.setSuccessfulResult(
      'Addition',
      `${numbers.firstNumber} + ${numbers.secondNumber}`,
      result
    );
  }

  onSubtract(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    const result = numbers.firstNumber - numbers.secondNumber;
    this.setSuccessfulResult(
      'Subtraction',
      `${numbers.firstNumber} - ${numbers.secondNumber}`,
      result
    );
  }

  onMultiply(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    const result = numbers.firstNumber * numbers.secondNumber;
    this.setSuccessfulResult(
      'Multiplication',
      `${numbers.firstNumber} × ${numbers.secondNumber}`,
      result
    );
  }

  onDivide(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    if (numbers.secondNumber === 0) {
      this.setError(
        'Division Error',
        'Division by zero is forbidden. A number cannot be divided by 0.'
      );
      return;
    }

    const result = numbers.firstNumber / numbers.secondNumber;
    this.setSuccessfulResult(
      'Division',
      `${numbers.firstNumber} ÷ ${numbers.secondNumber}`,
      result
    );
  }

  onPower(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    if (numbers.firstNumber === 0 && numbers.secondNumber === 0) {
      this.setError(
        'Power Error',
        '0 raised to the power of 0 is mathematically indeterminate.'
      );
      return;
    }

    const result = Math.pow(numbers.firstNumber, numbers.secondNumber);

    this.setSuccessfulResult(
      'Power',
      `${numbers.firstNumber} ^ ${numbers.secondNumber}`,
      result
    );
  }

  onModulo(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    if (numbers.secondNumber === 0) {
      this.setError(
        'Modulo Error',
        'Modulo by zero is forbidden because the remainder cannot be calculated.'
      );
      return;
    }

    const result = numbers.firstNumber % numbers.secondNumber;
    this.setSuccessfulResult(
      'Modulo',
      `${numbers.firstNumber} mod ${numbers.secondNumber}`,
      result
    );
  }

  onAverage(): void {
    const numbers = this.getTwoNumbers();
    if (!numbers) return;

    const result = (numbers.firstNumber + numbers.secondNumber) / 2;
    this.setSuccessfulResult(
      'Average',
      `(${numbers.firstNumber} + ${numbers.secondNumber}) ÷ 2`,
      result
    );
  }

  onSquareRootFirst(): void {
    const firstNumber = this.getFirstNumberOnly();
    if (firstNumber === null) return;

    if (firstNumber < 0) {
      this.setError(
        'Square Root Error',
        'Square root of a negative number is not allowed in the real-number calculator.'
      );
      return;
    }

    const result = Math.sqrt(firstNumber);
    this.setSuccessfulResult('Square Root', `√${firstNumber}`, result);
  }

  onSquareFirst(): void {
    const firstNumber = this.getFirstNumberOnly();
    if (firstNumber === null) return;

    const result = firstNumber * firstNumber;
    this.setSuccessfulResult('Square', `${firstNumber}²`, result);
  }

  onPercentage(): void {
    const firstNumber = this.getFirstNumberOnly();
    if (firstNumber === null) return;

    const result = firstNumber / 100;
    this.setSuccessfulResult('Percentage', `${firstNumber}%`, result);
  }

  onSwapNumbers(): void {
    const first = this.calculateForm.get('textField1')?.value;
    const second = this.calculateForm.get('textField2')?.value;

    this.calculateForm.patchValue({
      textField1: second,
      textField2: first,
    });

    this.status = 'idle';
    this.activeOperation = 'Swap';
    this.resultText = 'Numbers swapped successfully.';
  }

  onUseHistoryResult(value: number): void {
    this.calculateForm.reset({
      textField1: value,
      textField2: '',
  });

    this.calculateForm.markAsPristine();
    this.calculateForm.markAsUntouched();

  Object.values(this.calculateForm.controls).forEach((control) => {
    control.markAsPristine();
    control.markAsUntouched();
  });

    this.result = value;
    this.status = 'idle';
    this.activeOperation = 'History';
    this.resultText = `${value} has been placed into the first number field. Enter a second number to continue.`;
  }

  onClear(): void {
    this.calculateForm.reset({
      textField1: '',
      textField2: '',
    });

    this.result = 0;
    this.status = 'idle';
    this.activeOperation = 'None';
    this.resultText = 'Enter values and choose an operation.';
  }

  onClearHistory(): void {
    this.history = [];
    this.status = 'idle';
    this.activeOperation = 'History Cleared';
    this.resultText = 'Calculation history cleared.';
  }

  private getTwoNumbers(): { firstNumber: number; secondNumber: number } | null {
    if (this.calculateForm.invalid) {
      this.calculateForm.markAllAsTouched();
      this.setError(
        'Input Error',
        'Please enter both numbers before running this operation.'
      );
      return null;
    }

    const firstNumber = Number(this.calculateForm.get('textField1')?.value);
    const secondNumber = Number(this.calculateForm.get('textField2')?.value);

    if (!this.isValidNumber(firstNumber) || !this.isValidNumber(secondNumber)) {
      this.setError(
        'Number Error',
        'Only valid finite numbers are allowed. Empty, infinite, or invalid values are forbidden.'
      );
      return null;
    }

    return {
      firstNumber,
      secondNumber,
    };
  }

  private getFirstNumberOnly(): number | null {
    const firstControl = this.calculateForm.get('textField1');

    if (!firstControl?.value && firstControl?.value !== 0) {
      firstControl?.markAsTouched();
      this.setError(
        'Input Error',
        'Please enter the first number before running this operation.'
      );
      return null;
    }

    const firstNumber = Number(firstControl.value);

    if (!this.isValidNumber(firstNumber)) {
      this.setError(
        'Number Error',
        'The first number must be a valid finite number.'
      );
      return null;
    }

    return firstNumber;
  }

  private isValidNumber(value: number): boolean {
    return Number.isFinite(value);
  }

  private setSuccessfulResult(
    operationName: string,
    expression: string,
    value: number
  ): void {
    if (!Number.isFinite(value)) {
      this.setError(
        'Result Error',
        'The result is too large, too small, or mathematically invalid.'
      );
      return;
    }

    if (Math.abs(value) > this.maxSafeValue) {
      this.setError(
        'Safe Number Error',
        `The result is outside JavaScript safe integer range. Maximum safe value is ${this.maxSafeValue}.`
      );
      return;
    }

    this.result = this.roundResult(value);
    this.activeOperation = operationName;
    this.status = 'success';
    this.resultText = `${expression} = ${this.result}`;

    this.addHistory(expression, this.result);
  }

  private setError(operationName: string, message: string): void {
    this.activeOperation = operationName;
    this.status = 'error';
    this.resultText = message;
  }

  private roundResult(value: number): number {
    return Number(Number(value).toFixed(10));
  }

  private addHistory(expression: string, result: number): void {
    this.history.unshift({
      expression,
      result,
      timestamp: new Date(),
    });

    if (this.history.length > this.maxHistoryItems) {
      this.history.pop();
    }
  }
}