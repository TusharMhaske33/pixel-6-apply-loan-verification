import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { ApplyloanService } from './applyloan/applyloan.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplyloanComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApplyloanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
