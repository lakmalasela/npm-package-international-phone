# International Phone Number Input Component for Angular

![Angular](https://img.shields.io/badge/Angular-18+-red.svg)
![npm](https://img.shields.io/npm/v/@lakmaldulanga/international-phone-number-lm)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A customizable international phone number input component for Angular applications with country flags and validation.

![Component Preview](https://via.placeholder.com/300x100?text=Phone+Input+Preview)

## Features

- 🌍 Country code selection with flags
- 🔍 Searchable country dropdown
- ✅ Phone number validation
- 📱 Mobile-friendly responsive design
- 🎨 Customizable styles
- 🔄 Two-way data binding with `ngModel`

## Installation

```bash
npm install @lakmaldulanga/international-phone-number-lm



## Usage

import { InternationalPhoneNumberLMModule } from '@lakmaldulanga/international-phone-number-lm';

@NgModule({
  imports: [
    // ... other imports
    InternationalPhoneNumberLMModule
  ]
})
export class AppModule { }


## Use in your templates

<lib-intl-phone-input
  [(ngModel)]="phoneNumber"
  [defaultCountry]="'US'"
  [placeholder]="'Enter phone number'"
  [disabled]="false"
  (ngModelChange)="onPhoneChange($event)">
</lib-intl-phone-input>
