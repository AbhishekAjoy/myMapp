import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { NominatimResponse } from '../models/nominatim-response.model';


@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private readonly BASE_NOMINATIM_URL:string = 'nominatim.openstreetmap.org';
  private readonly LIMIT_RESULTS: string = '5'
  public searchResults$:Observable<NominatimResponse[]> = new Observable<NominatimResponse[]>();

  constructor(private http: HttpClient) {
  }

  addressLookup(req?: any) {
    let url = `https://${this.BASE_NOMINATIM_URL}/search?format=json&q=${req}&limit=${this.LIMIT_RESULTS}`;
    return this.http
      .get<any[]>(url).pipe(
        map(data => data.map(item => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
        ))
        )
      )

  }
}
