import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import ControlScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-scaleline',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
  styles: []
})
export class ScalelineComponent implements OnInit{
  @Input() map!: Map;
  control!: ControlScaleLine;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
