import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthIndexCardComponent } from './health-index-card.component';

describe('HealthIndexCardComponent', () => {
  let component: HealthIndexCardComponent;
  let fixture: ComponentFixture<HealthIndexCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthIndexCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthIndexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
