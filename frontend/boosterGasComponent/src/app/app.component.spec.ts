import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { sum } from './app.component';
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

  test('should save correct object', () => {
    console.log("test case 2")
    let formAddOrEdit = 'Add'
    const data = {
      casename: "case 1",
      priority: "High",
      type: "General",
      status: "Open",
      opendate: "12-2-25",
      co2: 1,
      h2o: 2,
      o2: 3,
      n2: 4,
      contributing: "contributing",
      statuskey: "success"
    }
    // if(formAddOrEdit==='Add'){
      Component.formAddOrEdit = 'Add'
      expect(Component.inputCases).toEqual(data);
    // }
    // else{
      Component.formAddOrEdit = 'Edit'
      // expect(Component.saveForm()).toEqual([]);
    // }
  });

  // it(`should have the 'boosterGasComponent' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('boosterGasComponent');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, boosterGasComponent');
  // });

  //using jest
  

});
