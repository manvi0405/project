import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [],
    imports:[
        // AppComponent,
        FormsModule,
        CommonModule
    ],
    // exports:[
    //     FormsModule,
    //     CommonModule,
    //     ComponentLibraryModule 
    // ],
    schemas:[
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ]
})

export class AppModule{

}