import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";
 
@NgModule({
    declarations: [
    ],
    imports:[
        AppComponent,
        FormsModule,
        CommonModule,
        // NgModule,
        ComponentLibraryModule
    ]
})
 
export class AppModule{
 
}