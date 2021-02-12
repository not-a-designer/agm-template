import { AgmInfoWindow, MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { isPlatform } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(AgmInfoWindow)
  infoWindow: ElementRef;
  defaultPosition = {lat: 35.1067, lng: -106.6291}
  zoom: number = 13;
  openedWindow = -1;
  positions = [
    {lat: 35.1073, lng: -106.6290},
    {lat: 35.1068, lng: -106.6291},
    {lat: 35.1079, lng: -106.6292},
    {lat: 35.1069, lng: -106.6289},
    {lat: 35.1066, lng: -106.6291}
  ];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}


  async ngOnInit() {
    //await this.mapsAPILoader.load();
    this.setCurrentLocation();
  }

  async setCurrentLocation() {
    const successFn = (position) => {
      const { lat, lng } = position.coords;
      this.defaultPosition.lat = lat;
      this.defaultPosition.lng = lng;
    };

    const errFn = (err) => {
      return console.log(err)
    }

    if (isPlatform('desktop'||'mobileweb') && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(successFn, errFn, { enableHighAccuracy: true })
    }

    const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    const { latitude, longitude } = position.coords;
    this.defaultPosition.lat = latitude;
    this.defaultPosition.lng = longitude;

  }

  showInfo(position, index) {
    console.log('clicked');
    this.openedWindow = index;
    
  }

  isWindowOpened(index: number) {
    return this.openedWindow === index;
  }
}
