import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForCaseDetailsComponent } from './form-for-case-details.component';

describe('FormForCaseDetailsComponent', () => {
  let component: FormForCaseDetailsComponent;
  let fixture: ComponentFixture<FormForCaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormForCaseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormForCaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
