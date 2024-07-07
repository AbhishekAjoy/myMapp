import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormatterService } from '../../services/coordinate-formatter.service';
import { CoordinateFormat, format } from 'ol/coordinate';



@Component({
  selector: 'app-mouse-position',
  standalone: true,
  providers: [CoordinateFormatterService],
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['::ng-deep .ol-scale-line {position: relative;}',
  '::ng-deep .ol-scale-line, ::ng-deep .ol-scale-line-inner {background-color: transparent; border-color: var(--text-color);color: var(--text-color);font-size: inherit;bottom: auto;}']
})
export class MousePositionComponent  implements OnInit{

  @Input() map!: Map;
  @Input() positionTemplate!: string;
  control!: ControlMousePosition;

  constructor( private element: ElementRef,
    private coordinateFormatter: CoordinateFormatterService){}

  ngOnInit(): void {
    let customFormat = function(template: string): CoordinateFormat {
      return (coordinate: number[] | undefined) => format(coordinate || [0, 0], template);
    }
    
      this.control = new ControlMousePosition({
        className: 'mouseposition-control',
        coordinateFormat: customFormat(this.positionTemplate),
        target: this.element.nativeElement,
        // undefinedHTML: undefined
      });
      this.map.addControl(this.control);
    
  }

}
