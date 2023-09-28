import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RyodanMetamaskUser } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';

@Component({
  selector: 'ryodan-mm-user-row',
  templateUrl: './mm-user-row.component.html',
  styleUrls: ['./mm-user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanMmUserRowComponent {
  @Input()
  mmUser!: RyodanMetamaskUser;

  @Output()
  view = new EventEmitter<void>();
}
