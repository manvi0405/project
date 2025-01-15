import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablularListComponent } from './tablular-list.component';

describe('TablularListComponent', () => {
  let component: TablularListComponent;
  let fixture: ComponentFixture<TablularListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablularListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
