import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-donut-chart-cards',
  standalone: true,
  imports: [ComponentLibraryModule],
  templateUrl: './donut-chart-cards.component.html',
  styleUrl: './donut-chart-cards.component.css'
})
export class DonutChartCardsComponent {
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
}
