import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Map from 'ol/Map';
import Zoom from 'ol/control/Zoom'

@Component({
  selector: 'app-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: '',
  styles: [':host { width: 100%; height: 100%; display: block; }']
})
export class MapComponent implements OnInit, OnChanges{
  @Input() map!: Map;
  constructor(private elementRef: ElementRef) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.map);
  }
  ngOnInit() {
    this.map.setTarget(this.elementRef.nativeElement);
    this.addCustomZoomControls();
    
  }
  addGeoLocation(){
    //this.map.addControl()
    throw console.error('Not implemented'); 
  }
  addCustomZoomControls() {
    this.map.addControl(new Zoom({
      className: 'zoom-control',
      zoomInLabel: '+',
      zoomOutLabel: '-'
    }))
  }

}
