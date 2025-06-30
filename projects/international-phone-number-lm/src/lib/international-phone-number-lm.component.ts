import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js/min';
// import countries from 'world-countries';

import { parsePhoneNumberFromString,CountryCode} from 'libphonenumber-js';
import countries from 'world-countries/countries.json';


@Component({
   selector: 'lib-intl-phone-input',
  templateUrl: './international-phone-number-lm.component.html',
  styleUrls: ['./international-phone-number-lm.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InternationalPhoneNumberLMComponent),
    multi: true
  }],
})
export class InternationalPhoneNumberLMComponent implements ControlValueAccessor, OnInit {

 @Input() defaultCountry: CountryCode = 'US';
  @Input() placeholder = 'Phone number';
  @Input() disabled = false;
  
  phoneNumber = '';
  countryCode: CountryCode = this.defaultCountry;
  countries: Array<{
    code: CountryCode;
    name: string;
    dialCode: string;
    flag: string;
  }> = [];
  showDropdown = false;
  searchQuery = '';
  
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.countries = countries.map((c: any) => {
      // Clean dial code to ensure proper formatting
      let dialCode = c.idd.root;
      if (c.idd.suffixes && c.idd.suffixes[0]) {
        dialCode += c.idd.suffixes[0];
      }
      
      // Ensure exactly one plus sign
      dialCode = dialCode.replace(/^\+/, ''); // Remove existing plus if any
      dialCode = '+' + dialCode; // Add exactly one plus
      
      return {
        code: c.cca2 as CountryCode,
        name: c.name.common,
        dialCode: dialCode,
        flag: this.getFlagEmoji(c.cca2)
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }

  private getFlagEmoji(countryCode: string): string {
    // Convert country code to flag emoji (works for most modern browsers)
   try {
    // Convert country code to flag emoji
    const codePoints = Array.from(countryCode.toUpperCase())
      .map(char => {
        const charCode = char.charCodeAt(0);
        return 127397 + charCode;
      });
    
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    console.warn('Failed to generate flag emoji for', countryCode, e);
    return '🏳️'; // Fallback flag
  }
  }

  getSelectedCountry() {
    return this.countries.find(c => c.code === this.countryCode) || 
           this.countries.find(c => c.code === 'US') || 
           this.countries[0];
  }

  get filteredCountries() {
    return this.countries.filter(c => 
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.dialCode.includes(this.searchQuery)
    );
  }

  // ... rest of your component methods remain unchanged ...
  writeValue(value: string): void {
    if (value) {
      try {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (phoneNumber) {
          this.countryCode = phoneNumber.country as CountryCode || this.defaultCountry;
          this.phoneNumber = phoneNumber.nationalNumber;
          return;
        }
      } catch (e) {
        console.warn('Could not parse phone number:', e);
      }
    }
    this.phoneNumber = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onPhoneNumberChange() {
    try {
      const phoneNumber = parsePhoneNumberFromString(this.phoneNumber, this.countryCode);
      this.onChange(phoneNumber?.number || this.phoneNumber);
    } catch (e) {
      this.onChange(this.phoneNumber);
    }
    this.onTouched();
  }

  selectCountry(country: { code: CountryCode }) {
    this.countryCode = country.code;
    this.showDropdown = false;
    this.searchQuery = '';
    this.onPhoneNumberChange();
  }

  validatePhoneNumber(): boolean {
    try {
      const phoneNumber = parsePhoneNumberFromString(this.phoneNumber, this.countryCode);
      return phoneNumber?.isValid() || false;
    } catch {
      return false;
    }
  }
}
