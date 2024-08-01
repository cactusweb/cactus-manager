import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AboutService } from './services/about.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileDropzoneAcceptedTypes } from '../common/components/file-dropzone/models/file-dropzone.models';
import { AboutActionDTO, AboutDTO } from './models/about.models';
import { filter, take } from 'rxjs';
import { AccountService } from '../account/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'csm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxSpinnerService],
})
export class AboutComponent implements OnInit {
  readonly form = new FormGroup({
    banner: new FormControl(''),
    description: new FormControl('', Validators.required),
    actions: new FormArray([new FormControl()]),
  });

  readonly acceptedFileTypes = [
    FileDropzoneAcceptedTypes.JPEG,
    FileDropzoneAcceptedTypes.JPG,
    FileDropzoneAcceptedTypes.PNG,
  ];

  constructor(
    private aboutService: AboutService,
    private accService: AccountService,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {}

  get actionsControl() {
    return this.form.controls.actions;
  }

  ngOnInit(): void {
    this.setOwnerColor();
    this.aboutService.fetchData();

    this.aboutService.about$.pipe(take(1), filter(Boolean)).subscribe((res) => {
      this.form.patchValue(res);

      if (!res.actions.length) {
        return;
      }
      this.onRemoveAction(0);
      res.actions.forEach((action) => this.onAddAction(action));
    });
  }

  onSave() {
    let data = this.form.value as AboutDTO;
    data = {
      ...data,
      actions: data.actions.filter(Boolean),
    };

    this.aboutService.putData(data as AboutDTO);
  }

  onSelectFile(file: File | null) {
    const bannerControl = this.form.controls.banner;
    if (!file && bannerControl.value) {
      this.aboutService
        .deleteBanner(bannerControl.value)
        .subscribe(() => bannerControl.setValue(null));
    } else if (file) {
      this.aboutService
        .postBanner(file)
        .subscribe((res) => bannerControl.setValue(res.url));
    }
  }

  onAddAction(val?: AboutActionDTO) {
    this.actionsControl.push(new FormControl(val || null));
  }

  onRemoveAction(controlIndex: number) {
    this.actionsControl.removeAt(controlIndex);
  }

  deleteFile() {
    const bannerControl = this.form.controls.banner;
    this.aboutService
      .deleteBanner(bannerControl.value!)
      .subscribe(() => bannerControl.setValue(null));
  }

  private setOwnerColor() {
    this.accService.owner.pipe(filter(Boolean), take(1)).subscribe((res) => {
      this.renderer.setAttribute(
        this.eRef.nativeElement,
        'style',
        `--owner-color: ${res.general.primary_color || null}`
      );
    });
  }
}
