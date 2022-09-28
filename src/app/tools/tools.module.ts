import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoaderComponent } from './components/btn-loader/btn-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { SelectPrimaryComponent } from './components/select-primary/select-primary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThSortableComponent } from './components/th-sortable/th-sortable.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { SelectorMultiplyComponent } from './components/selector-multiply/selector-multiply.component';
import { RadioControlComponent } from './components/radio-control/radio-control.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';
import { DropdownListMultiplyComponent } from './components/dropdown-list-multiply/dropdown-list-multiply.component';
import { SelectorFilterComponent } from './components/selector-filter/selector-filter.component';
import { PasswordInpComponent } from './components/password-inp/password-inp.component';
import { ColorInpComponent } from './components/color-inp/color-inp.component';
import { CheckboxSwitcherComponent } from './components/checkbox-switcher/checkbox-switcher.component';



@NgModule({
  declarations: [
    BtnLoaderComponent,
    SelectPrimaryComponent,
    ThSortableComponent,
    FilterPipe,
    SearchPipe,
    SortPipe,
    SelectorMultiplyComponent,
    RadioControlComponent,
    DropDownListComponent,
    DropdownListMultiplyComponent,
    SelectorFilterComponent,
    PasswordInpComponent,
    ColorInpComponent,
    CheckboxSwitcherComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BtnLoaderComponent,
    SelectPrimaryComponent,
    ThSortableComponent,
    SearchPipe,
    FilterPipe,
    SortPipe,
    RadioControlComponent,
    SelectorMultiplyComponent,
    SelectorFilterComponent,
    PasswordInpComponent,
    ColorInpComponent,
    CheckboxSwitcherComponent
  ]
})
export class ToolsModule { }
