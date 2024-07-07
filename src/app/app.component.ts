import {  Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapComponent } from './components/map/map.component';
import { ScalelineComponent } from './components/scaleline/scaleline.component';
import { MousePositionComponent } from './components/mouse-position/mouse-position.component';
import { NominatimService } from './services/nominatim.service';
import { AsyncPipe } from '@angular/common';
import { NominatimResponse } from './models/nominatim-response.model';
import { Circle, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { useGeographic } from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import {Circle as CircleStyle, Stroke} from 'ol/style'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, ScalelineComponent, MousePositionComponent,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'myMapp';
  map!: Map;

  constructor(public nominatimService: NominatimService){}




  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }



  Search(){
    let searchInputTag = document.getElementById('search-input') as HTMLInputElement;
    let request = '';
    if(searchInputTag)
      request = searchInputTag.value??'';
    if(request.trim().length > 0)
    this.nominatimService.searchResults$ = this.nominatimService.addressLookup(request);
  }

  selectedOption($event: any){
    let location:string = $event.target.value;
    let coordinates = location.split(',').map(x => Number.parseFloat(x));
    console.log(coordinates);
    this.searchByCoordinates(coordinates);
  }

  searchByCoordinates(coordinates: number[]){
    this.map.removeLayer;
    useGeographic();
    const point = new Point(coordinates);
    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      }),
    );

    positionFeature.setGeometry(point);

    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [ positionFeature],
      }),
    });
   this.map.setView(new View({
    center: coordinates,
    zoom: 12,
  }))
  }

}
