import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { User } from 'src/app/licenses/interfaces/user';

@Component({
  selector: 'ryodan-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanPopupComponent {
  @Output()
  close = new EventEmitter<void>();

  @Input()
  title!: string;

  @Input()
  user!: User;

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.close.emit();
  }
}
