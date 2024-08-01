import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { AboutActionDTO } from '../../models/about.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'csd-about-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AboutActionComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutActionComponent
  implements AfterViewInit, ControlValueAccessor
{
  @Output()
  remove = new EventEmitter<void>();

  @Input()
  removeAvailable!: boolean;

  readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    button: new FormGroup({
      link: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    }),
  });

  private onChange!: (_: AboutActionDTO) => void;
  private onTouch!: () => void;

  readonly #destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res) => {
        this.onTouch();
        this.onChange(res as AboutActionDTO);
      });
  }

  writeValue(obj: AboutActionDTO): void {
    this.form.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
