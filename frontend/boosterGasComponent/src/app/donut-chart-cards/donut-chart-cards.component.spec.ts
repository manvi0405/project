import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartCardsComponent } from './donut-chart-cards.component';

describe('DonutChartCardsComponent', () => {
  let component: DonutChartCardsComponent;
  let fixture: ComponentFixture<DonutChartCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutChartCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutChartCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
