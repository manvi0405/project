import { Component, Input, SimpleChanges } from '@angular/core';
import { ComponentLibraryModule } from '@bh-digitalsolutions/ui-toolkit-angular/dist';
// import { ComponentLibraryModule } from "@bh-digitalsolutions/ui-toolkit-angular/dist";


@Component({
  selector: 'app-health-index-card',
  standalone: true,
  imports: [ComponentLibraryModule],
  templateUrl: './health-index-card.component.html',
  styleUrl: './health-index-card.component.css'
})
export class HealthIndexCardComponent {
  @Input() donutPriority: string = ''
  @Input() donutCasename: string = ''
  @Input() donutOpendate: string = ''
  @Input() donutStatus: string = ''
  @Input() donutData:string=''
  imgSrc: string = ''


  ngOnChanges(changes: SimpleChanges) {
    if (changes['donutData'] && changes['donutData'].currentValue) {
      this.changeHealthIndex(changes['donutData'].currentValue);
    }
 
  }

  changeHealthIndex(event:any){
    // console.log("health",event);

      if (event.priority === 'High') {
      this.donutPriority = 'High';
      this.imgSrc = 'assets/priorityHigh.png';
    } else if (event.priority === 'Medium') {
      this.donutPriority = 'Medium';
      this.imgSrc = 'assets/PriorityMedium.png';
    } else if (event.priority === 'Low') {
      this.donutPriority = 'Low';
      this.imgSrc = 'assets/PriorityLow.png';
    } else {
      this.donutPriority = '';
      this.imgSrc = '';
    }

    this.donutCasename=event.casename;
    this.donutOpendate=event.opendate;
    this.donutStatus=event.status;
  }
}
