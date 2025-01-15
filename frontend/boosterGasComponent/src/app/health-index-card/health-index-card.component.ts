import { Component, Input } from '@angular/core';
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
  imgSrc: string = ''
}
