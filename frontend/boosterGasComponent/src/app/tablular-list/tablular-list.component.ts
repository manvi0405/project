import { Component, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter, OnChanges } from '@angular/core';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist';
import { AppserviceService } from '../appservice.service';
import { CommonModule } from '@angular/common';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";
import { OnInit } from '@angular/core';
import { FormForCaseDetailsComponent } from './form-for-case-details/form-for-case-details.component';
import moment from 'moment';


@Component({
  selector: 'app-tablular-list',
  standalone: true,
  imports: [
    ComponentLibraryModule, 
    CommonModule,
    FormForCaseDetailsComponent],
  templateUrl: './tablular-list.component.html',
  styleUrl: './tablular-list.component.css',
  providers: [AppserviceService]
})
export class TablularListComponent implements OnInit, OnChanges{
  formAddOrEdit: string = '';
  reset: boolean = false;
  isOpen: boolean = false;
  isEdit: boolean = false;
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
  validCasenameInEdit: string = '';   
  editContributing!: boolean;
  idForEdit: any;
  valuesToBeEnteredInFormForEdit: any = {}
  tableAllOrContri: string = '';
  
//   tableData: { id: number, name: string }[] = [
//     { "id": 0, "name": "Available" },
//     { "id": 1, "name": "Ready" },
//     { "id": 2, "name": "Started" }
// ];
ngOnInit(): void {
    this.getContri()
}

constructor(private service: AppserviceService){
  
}

ngOnChanges(){
  if (this.tableAllOrContri === 'contributing') {
        console.log("###3");
        this.getContri();
      } else {
        console.log("@@@");
        this.getAll();
      }
}

tableSchema: any = [
  {
    label: 'Case Name',
    prop: 'casename',
    resizable: false,
    option: {
      width: 500,
    },
  },
  {
    label: 'Priority',
    prop: 'priority',
    resizable: false,
    html: {
      template:
        "<bh-icon icon=''>{0}</bh-icon>",
      keys: ['priority'],
    },
    option: {
      width: 150,
    },
  },
  {
    label: 'Type',
    prop: 'type',
    resizable: false,
    option: {
      width: 150,
    },
  },
  {
    label: 'Status',
    prop: 'status',
    html: {
      template:
        "<bh-chip size='medium' theme={1} type='solid' disabled='false' icon='' label={0} plain=true></bh-chip>",
      keys: ['status', 'statuskey'],
    },
    resizable: false,
    option: {
      width: 150,
    },
  },
  {
    label: 'Open Date',
    prop: 'opendate',
    resizable: false,
    type: 'text',
    option: {
      width: 150,
    },
  },
];
  tableData: any = {};
  tabularListOption: any = {
    spacing: 'medium',
    isRowSelectable: true,
    isMultiRowsSelectable: false,
    paginationMode: 'shown',
    paginationOptions: [5, 10, 20],
    hideCellVerticalBorder: false,
    actionMenu: {
      itemGroups: [
        {
          items: [
            { label: 'Edit', value: 'example-bhtl--bh-menu--item-Edit' },
            { label: 'Delete', value: 'example-bhtl--bh-menu--item-Delete' },
          ],
        },
      ],
    },
  };

  closeModalOfTable(){
    console.log("close modal in tabular list");
    this.isOpen = false;
  }

  resetModal(){
    this.reset = true;
  }
  filterCases(event: any){}

  addCase(event: any){
    
    console.log("addcasebutton", event);
    if (event.detail === 'example-bhtl--cta-primary') {
      this.formAddOrEdit = 'Add';
      this.reset = false;
      this.isOpen = true; //send this value to the modal component to open the form
      console.log("isOpen: ", this.isOpen, this.formAddOrEdit);      
    }
  }
  selectEditOrDelete(event: any){
    
    console.log("selecteditordelet tabular list", event);
    if (event.detail.payload?.label === 'Edit') {
      // this.validateForm();
      this.formAddOrEdit = 'Edit';
      //putting all values in the form modal
      this.valuesToBeEnteredInFormForEdit = {
        "casename" : event.detail.item.casename,
        "validCasenameInEdit" : event.detail.item.casename,
        "priority" : event.detail.item.priority,
        "status" : event.detail.item.status,
        "opendate" : moment(event.detail.item.opendate).format('MM-DD-YYYY'),
        "co2": event.detail.item.co2,
        "h2o" : event.detail.item.h2o,
        "o2" : event.detail.item.o2,
        "n2" : event.detail.item.n2,
        "editContributing" :
          event.detail.item.contributing === 'contributing' ? true : false
      }
      this.isOpen = true;
      
      this.service.getId(event.detail.item.casename).subscribe({
          error: (err) => {
          },
          next: (res: any) => {
            this.idForEdit = res;
            console.log("getid: ", this.idForEdit);
          },
        });
    }else{
      this.isEdit=false;
    }
  }

  getAll(){
    this.service.getAll().subscribe({
      error: (err) => {
      },
      next: (res: any) => {
        this.tableData = {
          data: res,
          length: res.length,
        };
      },
    });
  }

  getContri(){
    this.service.getContri().subscribe({
      error: (err) => {
      },
      next: (res: any) => {
        this.tableData = {
          data: res,
          length: res.length,
        };
      },
    });
  }

}
