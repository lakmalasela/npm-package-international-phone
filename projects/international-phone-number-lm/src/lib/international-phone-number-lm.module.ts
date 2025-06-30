import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternationalPhoneNumberLMComponent } from './international-phone-number-lm.component';



@NgModule({
  declarations: [InternationalPhoneNumberLMComponent],
  imports: [CommonModule, FormsModule],
  exports: [InternationalPhoneNumberLMComponent]
})
export class InternationalPhoneNumberLMModule { }
