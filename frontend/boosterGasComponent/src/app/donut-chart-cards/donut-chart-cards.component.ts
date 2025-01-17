import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";
import { cloneDeep } from 'lodash';
import { AppserviceService } from '../appservice.service';
import { HealthIndexCardComponent } from "../health-index-card/health-index-card.component";
import { TablularListComponent } from '../tablular-list/tablular-list.component';


@Component({
  selector: 'app-donut-chart-cards',
  standalone: true,
  imports: [ComponentLibraryModule],
  templateUrl: './donut-chart-cards.component.html',
  styleUrl: './donut-chart-cards.component.css'
})
export class DonutChartCardsComponent implements OnInit,OnChanges {

  // service: any;
  prioritydata: any;
  priorityContridata: any;
  donutCasename: any;
  donutOpendate: any;
  donutStatus: any;
  donutPriority: string="";
  imgSrc: string="";
 
  constructor(private service: AppserviceService,private tabularList: TablularListComponent){
  }

  @Input()donutData:any;
  @Input() donutEdit!: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['donutData'] && changes['donutData'].currentValue) {
      this.changeInsightsDonutData(changes['donutData'].currentValue);
    }

    
  }
  
  ngOnInit() {
    this.getPriorityForDonut();
    this.getcontriPriorityForDonut();

    this.tabularList.donutEdit.subscribe(()=>{
      this.getPriorityForDonut();
      this.getcontriPriorityForDonut();
    })
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

  changeInsightsDonutData(event: any) {
    // console.log("event",event);
    this.donutCasename = event.casename;
    this.donutOpendate = event.opendate;
    this.donutStatus = event.status;

    let sum = Number(event.co2)+Number(event.h2o)+Number(event.o2)+Number(event.n2);
    let co2 =(((event.co2/sum))*100).toFixed(2);
    let h2o = (((event.h2o)/sum)*100).toFixed(2);
    let o2=(((event.o2)/sum)*100).toFixed(2);
    let n2=(((event.n2)/sum)*100).toFixed(2);
    this.defaultDonutInsights = cloneDeep(this.defaultDonutInsights);
    
    if (Object.keys(event).length > 0) {
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
    } else {
      this.dataInsights.labels[0] = this.defaultDonutInsights[0];
      this.dataInsights.labels[1] = this.defaultDonutInsights[1];
      this.dataInsights.labels[2] = this.defaultDonutInsights[2];
      this.dataInsights.labels[3] = this.defaultDonutInsights[3];
    }
    this.defaultDonutInsights = { ...this.defaultDonutInsights };

    this.dataInsights.datasets[0].data = [
      Number(((event.co2/sum))*100),
      Number(((event.h2o/sum))*100),
      Number(((event.o2/sum))*100),
      Number(((event.n2/sum))*100),
    ];
    this.dataInsights = { ...this.dataInsights };
  }




  getPriorityForDonut() {
    this.service.priority().subscribe({
      error: (err: any) => {
        console.log("error in priority", err)
      },
      next: (res: any) => {
        this.prioritydata = res;
        this.prioritydata.forEach((value: any) => {
          if (value.priority === 'High') {
            this.dataTotal.datasets[0].data[0] = Number(value.total_count );
          } else if (value.priority === 'Medium') {
            this.dataTotal.datasets[0].data[1] = Number(value.total_count);
          } else {
            this.dataTotal.datasets[0].data[2] = Number(value.total_count);
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
      },
    });
  }

  getcontriPriorityForDonut() {
    this.service.priority().subscribe({
      error: (err: any) => {
        console.log("error in contributing priority", err)
      },
      next: (res: any) => {
        this.priorityContridata = res;
        this.priorityContridata.forEach((value: any) => {
          if (value.priority === 'High') {
            this.dataContri.datasets[0].data[0] = Number(value.contributing_count);
          } else if (value.priority === 'Medium') {
            this.dataContri.datasets[0].data[1] = Number(value.contributing_count);
          } else {
            this.dataContri.datasets[0].data[2] = Number(value.contributing_count);
          }
        });
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
      },
    });
  }


  defaultDonutInsights = [
    `<span style="border-bottom:1px solid black;font-size:11px" >Carbon Dioxide (CO2)&ensp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Water (H2O)&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Oxygen (O2)&ensp;&ensp;&ensp;&nbsp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>`,
    `<span style="border-bottom:1px solid black;font-size:11px" >Nitrogen (N2)&ensp;&ensp;&ensp;&nbsp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>`,
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
}
