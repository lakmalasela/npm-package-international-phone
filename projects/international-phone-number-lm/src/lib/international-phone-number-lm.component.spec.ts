import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPhoneNumberLMComponent } from './international-phone-number-lm.component';

describe('InternationalPhoneNumberLMComponent', () => {
  let component: InternationalPhoneNumberLMComponent;
  let fixture: ComponentFixture<InternationalPhoneNumberLMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternationalPhoneNumberLMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalPhoneNumberLMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
