import { TestBed } from '@angular/core/testing';

import { InternationalPhoneNumberLMService } from './international-phone-number-lm.service';

describe('InternationalPhoneNumberLMService', () => {
  let service: InternationalPhoneNumberLMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalPhoneNumberLMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
