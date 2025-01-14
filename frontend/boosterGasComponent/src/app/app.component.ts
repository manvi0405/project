import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { AppserviceService } from './appservice.service';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist/';
// import { BhTabularListCustomEvent } from '@bh-digitalsolutions/ui-toolkit/dist/types/components';
import { OnInit } from '@angular/core';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ComponentLibraryModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private service: AppserviceService) {}

  ngOnInit(): void {
    this.getContriCases();
    this.getPriorityForDonut();
    this.getcontriPriorityForDonut();
  }

  result: any;
  value: any;
  title = 'boosterGasComponent';
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
  inputCases: any = {};
  statuskey: string = '';
  payload: any = [];
  options: any = [];
  editContributing!: boolean;
  formAddOrEdit: string = '';
  prioritydata: any;
  priorityContridata: any;
  errorCasename!: boolean;
  errorCo2!: boolean;
  errorH2o!: boolean;
  errorO2!: boolean;
  errorN2!: boolean;
  valid: string = '';
  validCasename: string = '';
  validCo2: string | undefined = '';
  validH2o: string | undefined = '';
  validO2: string | undefined = '';
  validN2: string | undefined = '';
  tableAllOrContri: string = 'contributing';
  reset: boolean = false;
  imgSrc: string = '';
  donutCasename: string = '';
  donutOpendate: string = '';
  donutStatus: string = '';
  donutPriority: string = '';
  validCasenameInEdit: string = ''
  idForEdit: any = []

  cardHeaderAction: any = {
    template:
      '<bh-dropdown selected-value="Contributing Cases" menu-items="{"itemGroups":[{"items":[{"label":"Contributing Cases","value":"tearsheet--bh-menu--item-1-1"},{"label":"All Cases","value":"tearsheet--bh-menu--item-1-2"}],"divider":false}]}" width="inherit" searchable="false" unselectable="false" multiselect="false" searchMode="contains" selectall="false" label="Label" required="false" placeholder="Contributing Cases" message="help" fluid="false" error="false" disabled="false" value="" small="false" inline="false" inline-anchor-id="" ellipsis=false  showall-label="all" flip-offset=50></bh-dropdown>',
  };

  header: any = {
    label: 'Card Title',
    actionMenu: {
      menuItems: {
        itemGroups: [
          {
            items: [
              {
                label: 'Configurable Cases',
                value: 'example-bhtl--bh-menu--item-1-1',
              },
              { label: 'All Cases', value: 'example-bhtl--bh-menu--item-1-2' },
            ],
          },
        ],
      },
    },
    ctas: {
      type: 'primary',
      label: 'Call To Action',
      key: 'example-bhtl--cta-primary',
    },
  };

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

  tableData: any = {};

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

  modalCtas: any = [
    { type: 'secondary', label: 'Reset', key: 'sb--modal-cta--secondary' },
    { type: 'primary', label: 'Save', key: 'sb--modal-cta--primary' },
  ];

  // data for donut charts
  defaultDonutInsights = [
    `<span style="border-bottom:1px solid black;font-size:11px" >Carbon Dioxide (CO2)&ensp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Water (H2O)&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Oxygen (O2)&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Nitrogen (N2)&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>`,
  ];

  defaultDonutPriority = [
    `<span style="border-bottom:1px solid black;font-size:11px" >High&ensp;&ensp;&ensp;&nbsp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Medium</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Low&ensp;&ensp;&ensp;&nbsp;&ensp;</span>`,
  ];

  // data for donut charts
  dataInsights: any = {
    labels: cloneDeep(this.defaultDonutInsights),
    datasets: [
      {
        data: [],
      },
    ],
  };

  optionsInsights = {
    styleOverride: [
      {
        color: '#666EB4',
      },
      {
        color: '#B0CD5D',
      },
      {
        color: '#4CA2A8',
      },
      {
        color: '#AF74B9',
      },
      {
        isDashed: false,
      },
    ],
    mode: 'default',
    tooltipSetting: {
      isDisabled: true,
      unit: {
        suffix: '%',
      },
    },
    disableLegend: false,
  };

  labelInsights = {
    unit: {
      suffix: '%',
      isShortScale: true,
    },
  };

  dataTotal: any = {
    labels: cloneDeep(this.defaultDonutPriority),
    datasets: [
      {
        data: [],
      },
    ],
  };

  optionsTotal = {
    styleOverride: [
      {
        color: '#CF2333',
      },
      {
        color: '#E87516',
      },
      {
        color: '#299BA3',
      },
    ],
    tooltipSetting: {
      isDisabled: true,
    },
    disableLegend: false,
  };

  labelTotal = {
    unit: {
      suffix: '',
      isShortScale: true,
    },
  };

  dataContri: any = {
    labels: cloneDeep(this.defaultDonutPriority),
    datasets: [
      {
        data: [],
      },
    ],
  };

  optionsContri = {
    styleOverride: [
      {
        color: '#CF2333',
      },
      {
        color: '#E87516',
      },
      {
        color: '#299BA3',
      },
    ],
    tooltipSetting: {
      isDisabled: true,
    },
    disableLegend: false,
  };

  labelContri = {
    unit: {
      isShortScale: true,
    },
  };

  priorityimages = [
    {
      high: {
        high: 'assets/priorityHigh.png',
      },
      medium: {
        medium: 'assets/priorityMedium.png',
      },
      low: {
        low: 'assets/priorityLow.png',
      },
    },
  ];

  //event handelling//
  isOpen: boolean = false;
  addCase(event: any) {
    console.log('bhEventCtaClickTabularList', event);
    if (event.detail === 'example-bhtl--cta-primary') {
      this.formAddOrEdit = 'Add';
      this.reset = false;
      console.log('add button', this.formAddOrEdit);
      this.isOpen = true;
      this.validateForm();
    }
  }

  filterCases(event: any) {
    //differentiate for contri cases in tebular liast header
    console.log('bheventchange', event);
    //here the row select runs
    if (event.detail.label === 'Contributing Cases') {
      // console.log("Contrbuting cases")
      this.tableAllOrContri = 'contributing';
      this.getContriCases();
    } else if (event.detail.label === 'All Cases') {
      this.tableAllOrContri = 'all';
      this.getAll();
    }
  }

  selectSaveOrReset(event: any) {
    console.log('bhEventCtaClickModal', event);
    if (event.detail === 'sb--modal-cta--primary') {
      //save button
      console.log('save button');
      this.saveForm();
    } else {
      console.log('reset button');
      alert('Form reset');
      this.resetForm();
    }
  }

  selectEditOrDelete(event: any) {
    this.changeInsightsDonutData(event);
    if (event.detail.payload?.label === 'Edit') {
      console.log('edit button');
      this.validateForm();
      this.formAddOrEdit = 'Edit';
      console.log(this.formAddOrEdit);
      //putting all values in the form modal
      this.casename = event.detail.item.casename;
      this.validCasenameInEdit = event.detail.item.casename;
      this.priority = event.detail.item.priority;
      this.status = event.detail.item.status;
      this.opendate = moment(event.detail.item.opendate).format('MM-DD-YYYY');
      this.co2 = event.detail.item.co2;
      this.h2o = event.detail.item.h2o;
      this.o2 = event.detail.item.o2;
      console.log(typeof this.o2)
      this.n2 = event.detail.item.n2;
      this.editContributing =
        event.detail.item.contributing === 'contributing' ? true : false;
      this.isOpen = true;

      console.log("@@@@@edit", this.validCasenameInEdit);
      
      this.service.getId(this.casename).subscribe({
          error: (err) => {
            console.log('error: ', err);
          },
          next: (res: any) => {
            console.log(res)
            this.idForEdit = res;
          },
        });
    } else if (event.detail.payload?.label === 'Delete') {
      console.log('delete button');
      let item = event.detail.item;
      console.log('item', item);
      this.service.getId(item.casename).subscribe({
        next: (res: any) => {
          let result: any = res;
          this.deleteCases(result[0].casenumber);

          // console.log('getid response:', result[0].casenumber);
          
        },
        error: (err) => {
          // console.log('error: ', err);
        },
      });
    }
  }

  changeInsightsDonutData(event: any) {
    // let co2 = 14.29;
    // let h2o = 28.57;
    // let o2 = 42.86;
    // let n2 = 14.29;
    // const sum = Number(co2)+Number(h2o)+Number(o2)+Number(n2);
    // let c =(((co2/sum)*100).toFixed(2));
    // let h = (((h2o)/sum)*100).toFixed(2);
    // let o=(((o2)/sum)*100).toFixed(2);
    // let n=(((n2)/sum)*100).toFixed(2);
    // console.log("sum: ", sum)
    // console.log("c: ", c)
    // console.log("h: ", h)
    // console.log("n: ", n)
    // console.log("o: ", o)
    
    console.log(event);
    
    this.donutCasename = event.detail.item.casename;
    this.donutOpendate = event.detail.item.opendate;
    this.donutStatus = event.detail.item.status;

    if (event.detail.item.priority === 'High') {
      this.donutPriority = 'High';
      this.imgSrc = 'assets/priorityHigh.png';
      console.log('high');
    } else if (event.detail.item.priority === 'Medium') {
      this.donutPriority = 'Medium';
      this.imgSrc = 'assets/PriorityMedium.png';
      console.log('medium');
    } else if (event.detail.item.priority === 'Low') {
      this.donutPriority = 'Low';
      this.imgSrc = 'assets/PriorityLow.png';
      console.log('low');
    } else {
      this.donutPriority = '';
      this.imgSrc = '';
      console.log('empty');
    }
let sum = Number(event.detail.item.co2)+Number(event.detail.item.h2o)+Number(event.detail.item.o2)+Number(event.detail.item.n2);
    console.log('sum: ',sum);
    
    let co2 =(((event.detail.item.co2/sum))*100).toFixed(2);
    let h2o = (((event.detail.item.h2o)/sum)*100).toFixed(2);
    let o2=(((event.detail.item.o2)/sum)*100).toFixed(2);
    let n2=(((event.detail.item.n2)/sum)*100).toFixed(2);
    console.log(co2, h2o, n2, o2)
    this.defaultDonutInsights = cloneDeep(this.defaultDonutInsights);
    
    if (Object.keys(event.detail.item).length > 0) {
      this.dataInsights.labels[0] = this.donutLegendSpanRemover(
        this.defaultDonutInsights[0],
        co2
      );
      this.dataInsights.labels[1] = this.donutLegendSpanRemover(
        this.defaultDonutInsights[1],
        h2o
      );
      this.dataInsights.labels[2] = this.donutLegendSpanRemover(
        this.defaultDonutInsights[2],
        o2
      );
      this.dataInsights.labels[3] = this.donutLegendSpanRemover(
        this.defaultDonutInsights[3],
        n2
      );
console.log("typeof: ", typeof co2);

      console.log(this.dataInsights.labels[0]);
    } else {
      this.dataInsights.labels[0] = this.defaultDonutInsights[0];
      this.dataInsights.labels[1] = this.defaultDonutInsights[1];
      this.dataInsights.labels[2] = this.defaultDonutInsights[2];
      this.dataInsights.labels[3] = this.defaultDonutInsights[3];

      console.log('from else:', this.dataInsights.labels[0]);
    }
    this.defaultDonutInsights = { ...this.defaultDonutInsights };

    this.dataInsights.datasets[0].data = [
      Number(((event.detail.item.co2/sum))*100),
      Number(((event.detail.item.h2o/sum))*100),
      Number(((event.detail.item.o2/sum))*100),
      Number(((event.detail.item.n2/sum))*100),
    ];
    this.dataInsights = { ...this.dataInsights };
  }

  closeModal() {
    console.log(this.opendate);
    this.resetForm();
    this.isOpen = false;
    this.validCasenameInEdit = ''
    console.log('validcasenameeidt', this.validCasenameInEdit);
    console.log('closed modal');
  }

  async bhEventInput(event: any, input: string) {
    // this.validCasename = ''
    if (input === 'casename') {
      if (event.detail.trim() != '') {
        this.casename = event.detail;

        if(this.casename === this.validCasenameInEdit){
          this.validCasename = ''
        }
        else{
          this.errorCasename = false;
          //validate the input string
          this.validateAlphaNumeric(this.casename);
          try {
            this.validCasename = await this.validateCasename(this.casename);
            console.log('>>', this.validCasename);
            if (this.validCasename !== '') {
              this.validateForm();
            }
          } catch (err) {
            console.log('error in validating casename: ', err);
          }
          console.log('}}}', this.validCasename);
        }
      } else {
        this.errorCasename = true;
      }
    } else if (input === 'co2') {
      if (event.detail.trim() != '') {
        this.co2 = event.detail;
        this.errorCo2 = false;
        this.validCo2 = this.validateInsights(this.co2);
      } else {
        this.errorCo2 = true;
      }
    } else if (input === 'h2o') {
      if (event.detail.trim() != '') {
        this.h2o = event.detail;
        this.errorH2o = false;
        this.validH2o = this.validateInsights(this.h2o);
      } else {
        this.errorH2o = true;
      }
    } else if (input === 'o2') {
      if (event.detail.trim() != '') {
        this.o2 = event.detail;
        this.errorO2 = false;
        this.validO2 = this.validateInsights(this.o2);
      } else {
        this.errorO2 = true;
      }
    } else {
      if (event.detail.trim() != '') {
        this.n2 = event.detail;
        this.errorN2 = false;
        this.validN2 = this.validateInsights(this.n2);
      } else {
        this.errorN2 = true;
      }
    }
    this.validateForm();
  }

  bhEventSelectedDropdown(event: any) {
    console.log('bhEventSelected', event);
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
    console.log('event date and checkbox', event.detail);
    if (
      input === 'date' &&
      this.opendate !== moment(event.detail).format('MM-DD-YYYY')
    ) {
      this.reset = false;
      this.opendate = event.detail;
      this.validateForm();
    } else if (input === 'checkbox') {
      if (event.detail == true) {
        this.contributingCase = 'contributing';
      } else {
        this.contributingCase = 'all';
      }
      console.log(this.contributingCase);
      this.validateForm();
    }
  }

  donutLegendSpanRemover(legend: any, value: any) {
    const s = legend.split('</span>');
    return s[0] + value + '%' + s[1];
  }
  donutLegendSpanRemoverPriority(legend: any, value: any) {
    const s = legend.split('</span>');
    return (
      s[0] +
      '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;' +
      value +
      s[1]
    );
  }

  //functions for Apis
  getContriCases() {
    this.service.getContri().subscribe({
      error: (err) => {
        console.log('error: ', err);
      },
      next: (res: any) => {
        this.tableData = {
          data: res,
          length: res.length,
        };
      },
    });
  }

  getAll() {
    this.service.getAll().subscribe({
      error: (err) => {
        console.log('error: ', err);
      },
      next: (res: any) => {
        this.tableData = {
          data: res,
          length: res.length,
        };
        // this.result = this.result.sort((a: any, b: any) => a.id - b.id);
        console.log('getall response:', this.tableData.data);
      },
    });
  }

  sortTableBasedOnUpdatedData(inputcases: any, casename: string) {
    const tableDataClone = this.tableData.data;
    const rowValue = tableDataClone.find((d: any) => d.casename === casename);
    if (rowValue) {
      tableDataClone.splice(tableDataClone.indexOf(rowValue), 1);
    }
    tableDataClone.unshift(inputcases);
    this.tableData = {
      ...this.tableData,
      data: tableDataClone,
      length: tableDataClone.length
    };
  }

  //functions for form
  saveForm() {
    this.reset = false;
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
      console.log('form add');
      console.log('formaddofedit: ', this.formAddOrEdit);
      console.log('Add: ', this.inputCases);
      this.service.postCases(this.inputCases).subscribe({
        error: (err) => {
          console.log('error in post: ', err);
        },
        next: (res: any) => {
          this.result = res;
          console.log('postdatafromapi response:', this.result);
          this.resetForm();
          this.isOpen = false;
          alert('Case Saved');
          if (this.tableAllOrContri === 'contributing') {
            this.getContriCases();
          } else {
            this.getAll();
          }
          this.getPriorityForDonut();
          this.getcontriPriorityForDonut();
        },
      });
    } else {
      console.log('formaddofedit: ', this.formAddOrEdit);
      this.sortTableBasedOnUpdatedData(this.inputCases, this.casename);
      console.log('Edit: ', this.inputCases);
      console.log('getid response:', this.idForEdit[0].casenumber);
      this.updateForm(this.idForEdit[0].casenumber, this.inputCases);
      this.resetForm();
      alert('Case Updated');
      this.isOpen = false;
      if (this.tableAllOrContri === 'contributing') {
        this.getContriCases();
      } else {
        this.getAll();
      }
      this.getPriorityForDonut();
      this.getcontriPriorityForDonut();
    }
  }
  test: boolean = false;

  resetForm() {
    console.log('reset form');
    this.validCasename = '';
    this.casename = '';
    this.priority = '';
    this.status = '';
    this.opendate = '';
    this.reset = true;
    this.editContributing = false;
    this.contributingCase = '';
    this.co2 = null;
    this.h2o = null;
    this.o2 = null;
    this.n2 = null;
    this.errorCasename = false;
    this.errorCo2 = false;
    this.errorH2o = false;
    this.errorN2 = false;
    this.errorO2 = false;
    this.validCo2 = '';
    this.validH2o = '';
    this.validO2 = '';
    this.validN2 = '';
    this.validateForm();
  }

  updateForm(id: number, data: any) {
    this.service.putCases(id, data).subscribe({
      error: (err) => {
        console.log('error in update: ', err);
      },
      next: (res: any) => {
        this.result = res;
        console.log('getdatafromapi response:', this.result);
      },
    });
  }

  deleteCases(id: number) {
    // const isDelete = confirm("Are you sure you want to delete?");
    // if(isDelete){
    //   console.log(isDelete);
    this.service.deleteCases(id).subscribe({
      error: (err: any) => {
        console.log('error in update: ', err);
      },
      next: (res: any) => {
        this.result = res;
        console.log('deleteuser response:', this.result);
        alert('Case Deleted');
        if (this.tableAllOrContri === 'contributing') {
          this.getContriCases();
        } else {
          this.getAll();
        }
        this.getPriorityForDonut();
        this.getcontriPriorityForDonut();
      },
    });
  }

  validateForm() {
    console.log('validating form');
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
      console.log('here');
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
    console.log('over val');
  }

  validateAlphaNumeric(input: string) {
    let val = input.trim();
    let isValid = /^[a-z0-9 ]+$/i.test(val);
    console.log(
      isValid
        ? (this.validCasename = '')
        : (this.validCasename = 'Invalid input.')
    );
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

  validateCasename(casename: string): Promise<any> {
    console.log('validating casename');
    return new Promise((resolve) => {
      this.service.validateCasename(casename).subscribe((value: any) => {
        this.result = value;
        if (this.result.rowCount == 1) {
          console.log('true');
          this.validCasename = `${casename} already exists`;
        }
        resolve(this.validCasename);
      });
    });
  }

  //donut charts
  getPriorityForDonut() {
    this.service.priority().subscribe({
      error: (err) => {
        console.log('error in priority:', err);
      },
      next: (res: any) => {
        this.prioritydata = res;
        console.log('res', res);
        this.prioritydata.forEach((value: any) => {
          if (value.priority === 'High') {
            console.log('>>>>', value.priority);
            this.dataTotal.datasets[0].data[0] = Number(value.count);
          } else if (value.priority === 'Medium') {
            console.log('????', value.priority);
            this.dataTotal.datasets[0].data[1] = Number(value.count);
          } else {
            console.log('/////', value.priority);
            this.dataTotal.datasets[0].data[2] = Number(value.count);
          }
        });
        this.dataTotal = { ...this.dataTotal };
        // this.dataTotal.datasets[0].data = this.prioritydata.map(Number)
        this.dataTotal.labels[0] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[0],
          this.dataTotal.datasets[0].data[0] || 0
        );
        this.dataTotal.labels[1] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[1],
          this.dataTotal.datasets[0].data[1] || 0
        );
        this.dataTotal.labels[2] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[2],
          this.dataTotal.datasets[0].data[2] || 0
        );
        console.log(this.dataTotal.datasets[0].data);
      },
    });
  }

  getcontriPriorityForDonut() {
    this.service.contributingpriority().subscribe({
      error: (err) => {
        console.log('error in contriPriority: ', err);
      },
      next: (res: any) => {
        this.priorityContridata = res;
        this.priorityContridata.forEach((value: any) => {
          if (value.priority === 'High') {
            this.dataContri.datasets[0].data[0] = Number(value.count);
          } else if (value.priority === 'Medium') {
            this.dataContri.datasets[0].data[1] = Number(value.count);
          } else {
            this.dataContri.datasets[0].data[2] = Number(value.count);
          }
        });
        console.log(this.dataContri.datasets[0].data);
        // this.dataContri.datasets[0].data = this.priorityContridata.map(Number);
        this.dataContri.labels[0] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[0],
          this.dataContri.datasets[0].data[0] || 0
        );
        this.dataContri.labels[1] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[1],
          this.dataContri.datasets[0].data[1] || 0
        );
        this.dataContri.labels[2] = this.donutLegendSpanRemoverPriority(
          this.defaultDonutPriority[2],
          this.dataContri.datasets[0].data[2] || 0
        );
        this.dataContri = { ...this.dataContri };
        console.log(
          'getcontriPriorityForDonut',
          this.dataContri.datasets[0].data
        );
      },
    });
  }

  getinsights(id: number) {
    this.service.insights(id).subscribe({
      error: (err) => {
        console.log('error in insights: ', err);
      },
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}

export function sum(a: number, b: number) {
  return a + b;
}


