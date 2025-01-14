import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { sum } from './app.component';
 
 
describe('AppComponent', () => {

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [AppComponent],
  //     providers: [provideHttpClient(withFetch())]
  //   }).compileComponents();
  // });
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
 
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(2, 2)).toBe(4);
  });
 
  // it('should create the app', () => {
  //   console.log("test case 1")
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });
 
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