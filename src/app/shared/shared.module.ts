import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule
  ]
})
export class SharedModule { }
