import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { sum } from './app.component';
import { Component } from '@angular/core';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(withFetch())]
    }).compileComponents();
  });
  
  let Component: AppComponent;
  test('should create the app', () => {
    console.log("test case 1")
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  

});
