import { AfterViewChecked, Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { AddFormComponent } from '../add-form/add-form.component';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { TableComponent } from '../table/table.component';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25,41],
  iconAnchor: [12,41],
  popupAnchor: [1,-34],
  tooltipAnchor: [16,-28],
  shadowSize: [41,41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.initMap();
  }
  private initMap() : void {
    this.map = L.map('map').setView([49.24, -123.12], 11);

    const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:70,
      attribution:'&copy: <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy;<a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    });
    tiles.addTo(this.map);

    
    this.http.get<Object>('https://272.selfip.net/apps/IsUE78NuMn/collections/dump/documents/')
    .subscribe((data:any)=>{
      for(let i=0; i<data.length; i++){
        let c = 0;
        if(data.location === 'Vancouver') {
          L.marker([49.2, -123]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'SFU') {
          L.marker([45.2, -119]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'UBC') {
          L.marker([41.2, -140]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'Surrey') {
          L.marker([35.2, -140]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'Langley') {
          L.marker([55.2, -50]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'Metrotown') {
          L.marker([49.2, -123]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
        if(data.location === 'Granville') {
          L.marker([45.2, -116]).addTo(this.map)
          .bindPopup(`pig(s) found here`).openPopup();
        }
      }

    })
    
    /*L.marker([49.2, -123]).addTo(this.map)
    .bindPopup(`pig(s) found here`).openPopup();*/

    
  }
}
