import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FileDropzoneAcceptedTypes,
  FileDropzoneAcceptedTypesNamesMap,
} from './models/file-dropzone.models';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

const DRAG_CLASS = 'dragstarted';

@Component({
  selector: 'csd-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, CommonModule, MatIconModule, MatButtonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileDropzoneComponent),
      multi: true,
    },
  ],
  standalone: true,
})
export class FileDropzoneComponent
  implements AfterViewInit, ControlValueAccessor
{
  @Input()
  acceptedTypes!: FileDropzoneAcceptedTypes[];

  @Input()
  description?: string;

  @Output()
  selectFile = new EventEmitter<File | null>();

  @Output()
  reset = new EventEmitter<void>();

  readonly currentValue = signal<string | null>(null);

  readonly selectedFile = signal<null | File>(null);

  onChange!: (_: null | string) => void;
  onTouch!: () => void;

  readonly #destroyRef = inject(DestroyRef);

  constructor(
    private tools: ToolsService,
    private eRef: ElementRef<HTMLElement>
  ) {}

  get displayAcceptedTypes() {
    return this.acceptedTypes
      .map((type) => FileDropzoneAcceptedTypesNamesMap.get(type))
      .join(' or ');
  }

  ngAfterViewInit(): void {
    let blockedByEnter = false;

    fromEvent(this.eRef.nativeElement, 'dragenter')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        blockedByEnter = true;
        this.toggleDragClass('add');
      });

    fromEvent(this.eRef.nativeElement, 'dragleave')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        if (!blockedByEnter) {
          this.toggleDragClass('remove');
        }
        blockedByEnter = false;
      });

    fromEvent(this.eRef.nativeElement, 'dragover')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((event) => event.preventDefault());

    fromEvent(this.eRef.nativeElement, 'drop')
      .pipe(
        map((d) => d as DragEvent),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((event: DragEvent) => {
        this.toggleDragClass('remove');
        this.handleDrop(event);
      });
  }

  writeValue(value: string | null): void {
    this.currentValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSelectFile(input: HTMLInputElement) {
    let files = input.files;
    let file = files?.[0];

    if (!file) {
      this.onRemoveFile();
      this.tools.generateNotification('File not selected');
      return;
    }
    this.selectFile.emit(file);
    this.selectedFile.set(file);
  }

  onRemoveFile(event?: MouseEvent) {
    event?.stopPropagation();
    event?.preventDefault();
    this.selectedFile.set(null);
    this.selectFile.emit(null);
  }

  /** Handling of Drop event */
  private handleDrop(event: DragEvent) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer!;

    if (dataTransfer.files.length != 1) {
      this.tools.generateNotification('Drag and drop only 1 file');
      return;
    }

    const file = dataTransfer.files.item(0)!;

    if (!this.acceptedTypes.includes(file.type as FileDropzoneAcceptedTypes)) {
      this.tools.generateNotification(`Invalid file format`);
      return;
    }

    this.selectedFile.set(file);
    this.selectFile.emit(file);
  }

  private toggleDragClass(action: 'add' | 'remove') {
    this.eRef.nativeElement.classList[action](DRAG_CLASS);
  }
}
