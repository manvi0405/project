import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import moment from 'moment';
import { AppserviceService } from '../../appservice.service';

@Component({ //child of tabular list
  selector: 'app-form-for-case-details',
  standalone: true,
  imports: [
    ComponentLibraryModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './form-for-case-details.component.html',
  styleUrl: './form-for-case-details.component.css',
  providers: [AppserviceService]
})
export class FormForCaseDetailsComponent implements OnChanges {
  validCasenameInEdit: string = '';
  valid: string = '';
  constructor(private service: AppserviceService){
  
  }

  

  casename: string = '';
  status: string = '';
  priority: string = '';
  type = 'General';
  opendate: string = '';
  contributingCase: string = '';
  co2!: number | null;
  h2o!: number | null;
  o2!: number | null;
  n2!: number | null;
  resetDate: boolean = false;
  editContributing!: boolean;
  errorCasename!: boolean;
  errorCo2!: boolean;
  errorH2o!: boolean;
  errorO2!: boolean;
  errorN2!: boolean;
  validCasename: any;
  validCo2: string | undefined = '';
  validH2o: string | undefined = '';
  validO2: string | undefined = '';
  validN2: string | undefined = '';
  result: any;
  tableAllOrContri: string = '';
  
  inputCases: any = {};
  
  @Input() idForEdit: any = [];
  // @Input() isEdit!: boolean
  @Input() valuesToBeEnteredInFormForEdit: any = {}
  @Input() isOpen!: boolean //this is a property that can take input from the parent, tabular list
  //to send data to the parent, the data is send using @Output
  @Input() formAddOrEdit: string = '';

  @Output() resetModal = new EventEmitter()
  @Output() onCloseModal = new EventEmitter<boolean>();
  @Output() caseAddedOrEditedOrDelete = new EventEmitter();
  modalCtas: any = [
    { type: 'secondary', label: 'Reset', key: 'sb--modal-cta--secondary' },
    { type: 'primary', label: 'Save', key: 'sb--modal-cta--primary' },
  ];

  ngOnChanges(){
    if(this.valuesToBeEnteredInFormForEdit){ 
      this.editForm(); //this is run when there are changed in the valuesToBeEnteredInFormForEdit
    }
   }

  async casenameAndInsightsInputs(event: any, input: string){
    console.log("inouevent", event);
    if (input === 'casename') {
      if (event.detail.trim() != '') {
        
        this.casename = event.detail;
        if(this.casename === this.validCasenameInEdit){//only for edit
          this.validCasename = ''
        }
        else{
          this.errorCasename = false;
          this.validCasename = ''
          //validate the input string
          this.validateAlphaNumeric(this.casename);
          try {
            this.validCasename = await this.validateCasename(this.casename); //await for the validation of casename to complete
            if (this.validCasename !== '') {
              this.validateForm();
            }
          } catch (err) {
          }
        }
      } else {
        this.errorCasename = true;
      }
    } else if (input === 'co2') {
      if (event.detail.trim() != '') {
        this.co2 = event.detail;
        this.errorCo2 = false;
        // this.validCo2 = this.validateInsights(this.co2);
      } else {
        this.errorCo2 = true;
      }
    } else if (input === 'h2o') {
      if (event.detail.trim() != '') {
        this.h2o = event.detail;
        this.errorH2o = false;
        // this.validH2o = this.validateInsights(this.h2o);
      } else {
        this.errorH2o = true;
      }
    } else if (input === 'o2') {
      if (event.detail.trim() != '') {
        this.o2 = event.detail;
        this.errorO2 = false;
        // this.validO2 = this.validateInsights(this.o2);
      } else {
        this.errorO2 = true;
      }
    } else {
      if (event.detail.trim() != '') {
        this.n2 = event.detail;
        this.errorN2 = false;
        // this.validN2 = this.validateInsights(this.n2);
      } else {
        this.errorN2 = true;
      }
    }
    this.validateForm();
  }

  priorityAndStatusDropdown(event: any){
    console.log("dropdown: ", event);
    if (event.detail === 'tearsheet--bh-menu--item-1-high') {
      this.priority = 'High';
    } else if (event.detail === 'tearsheet--bh-menu--item-1-medium') {
      this.priority = 'Medium';
    } else if (event.detail === 'tearsheet--bh-menu--item-1-low') {
      this.priority = 'Low';
    } else if (event.detail === 'tearsheet--bh-menu--item-1-open') {
      this.status = 'Open';
    } else {
      this.status = 'Closed';
    }
    this.validateForm();
  }

  dateOrCheckbox(event: any, input: string) {
    console.log("dateandcheckbox: ", event);
    
    if (
      input === 'date' &&
      this.opendate !== moment(event.detail).format('MM-DD-YYYY')
    ) {
      this.resetDate = false;
      this.opendate = event.detail;
      this.validateForm();
    } else if (input === 'checkbox') {
      if (event.detail == true) {
        this.contributingCase = 'contributing';
      } else {
        this.contributingCase = 'all';
      }
      this.validateForm();
    }
  }

  closeModalOfForm(){
    this.resetForm(); 
    this.onCloseModal.emit()
  }
  selectSaveOrReset(event: any){
   
    if (event.detail === 'sb--modal-cta--primary') {
      //save button
      this.saveForm();
    } else {
      alert("Form Reset")
      this.resetForm();
    }
  }

<<<<<<< HEAD
  selectEditOrDelete() {
    // this.changeInsightsDonutData(event);
    
    // console.log("selectEditOrDelete form: ", );
    
=======
  editForm() {
>>>>>>> f8504b03b114506b9d67b935098f1aa1a849f13c
    if (this.formAddOrEdit === 'Edit') {
      this.casename = this.valuesToBeEnteredInFormForEdit.casename;
      this.validCasenameInEdit = this.valuesToBeEnteredInFormForEdit.validCasenameInEdit;
      this.priority = this.valuesToBeEnteredInFormForEdit.priority;
      this.status = this.valuesToBeEnteredInFormForEdit.status;
      this.opendate = this.valuesToBeEnteredInFormForEdit.opendate;
      this.co2 = this.valuesToBeEnteredInFormForEdit.co2;
      this.h2o = this.valuesToBeEnteredInFormForEdit.h2o;
      this.o2 = this.valuesToBeEnteredInFormForEdit.o2;
      this.n2 = this.valuesToBeEnteredInFormForEdit.n2;
      this.editContributing = this.valuesToBeEnteredInFormForEdit.editContributing;
    }
  }

  saveForm(){ //when save button is clicked for editing or saving
    //
    this.resetDate = false;
    this.inputCases = {
      casename: this.casename,
      priority: this.priority,
      type: 'General',
      status: this.status,
      opendate: moment(this.opendate).format('YYYY-MM-DD'),
      co2: Number(this.co2),
      h2o: Number(this.h2o),
      o2: Number(this.o2),
      n2: Number(this.n2),
      contributing: this.editContributing == true ? 'contributing' : 'all',
      statuskey: this.status == 'Closed' ? 'neutral' : 'success',
    };
    if (this.formAddOrEdit === 'Add') {
      this.service.postCases(this.inputCases).subscribe({
        error: (err) => {
        },
        next: (res: any) => {
          this.result = res;
          alert("Case Saved")
          this.onCloseModal.emit()
          this.resetForm();
          //send output that the case is added
          this.caseAddedOrEditedOrDelete.emit(); //emit an event that case is added to change the state of the table
          // this.getPriorityForDonut();
          // this.getcontriPriorityForDonut();
        },
      });
    } 
    else {
      // this.sortTableBasedOnUpdatedData(this.inputCases, this.casename);
      this.updateCases(this.idForEdit[0].casenumber, this.inputCases);
      this.resetForm();
      alert("Case Updated")
      this.isOpen = false;
      this.caseAddedOrEditedOrDelete.emit()
      // this.getPriorityForDonut();
      // this.getcontriPriorityForDonut();
    }
  }

  updateCases(id: number, data: any){
    this.service.putCases(id, data).subscribe({
      error: (err) => {
      },
      next: (res: any) => {
        this.result = res;
      },
    });
  }

  resetForm(){
    // this.validCasename = '';
    // this.casename = '';
    // this.priority = '';
    // this.status = '';
    // // this.opendate = '';
    // this.resetDate = true; //this is to reset the date
    // this.editContributing = false;
    // this.contributingCase = '';
    // this.co2 = null;
    // this.h2o = null;
    // this.o2 = null;
    // this.n2 = null;
    // this.errorCasename = false;
    // this.errorCo2 = false;
    // this.errorH2o = false;
    // this.errorN2 = false;
    // this.errorO2 = false;
    // this.validCo2 = '';
    // this.validH2o = '';
    // this.validO2 = '';
    // this.validN2 = '';
    this.resetDate = true;
    this.resetModal.emit()
    this.validateForm();
  }

  validateForm() {
    if (
      this.casename &&
      this.priority &&
      this.status &&
      this.opendate &&
      this.co2 &&
      this.h2o &&
      this.o2 &&
      this.n2 &&
      !this.validCasename &&
      !this.validCo2 &&
      !this.validH2o &&
      !this.validO2 &&
      !this.validN2 &&
      !this.errorCo2 &&
      !this.errorH2o &&
      !this.errorN2 &&
      !this.errorO2 &&
      !this.errorCasename 
      // ||
      // this.contributingCase
    ) {
      this.modalCtas = [
        { type: 'secondary', label: 'Reset', key: 'sb--modal-cta--secondary' },
        { type: 'primary', label: 'Save', key: 'sb--modal-cta--primary' },
      ];
    } else {
      this.modalCtas = [
        { type: 'secondary', label: 'Reset', key: 'sb--modal-cta--secondary' },
        {
          type: 'primary',
          label: 'Save',
          key: 'sb--modal-cta--primary',
          isDisabled: 'true',
        },
      ];
    }
  }

  validateInsights(value: number | null) {
    if (value == null) {
      return;
    } else {
      value < 100
        ? value > 0
          ? (this.valid = '')
          : (this.valid = 'Value should be above 0')
        : (this.valid = 'Value should be less than 100');
      return this.valid;
    }
  }

  validateAlphaNumeric(input: string) {
    let val = input.trim();
    let isValid = /^[a-z0-9 ]+$/i.test(val);
    console.log(
      isValid
      ? (this.validCasename="")
      : (this.validCasename="Invalid Input")
    )
  }

  validateCasename(casename: string): Promise<any> {
    return new Promise((resolve) => {
      this.service.validateCasename(casename).subscribe((value: any) => { //resolve callback used to resolve (sucessful) result and reject to reject the promise(in case of error)
        this.result = value;
        if (this.result.rowCount == 1) {
          this.validCasename = `${casename} already exists`;
        }
        resolve(this.validCasename); //resolve used to provide the result or value 
      });
    });
  }

}
