import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgbCarouselModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContentModule { }
