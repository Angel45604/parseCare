import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatMenuModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatMenuModule, MatCardModule],
})
export class MaterialModule { }