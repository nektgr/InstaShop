import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandmarkDetailComponent } from './landmark-detail/landmark-detail.component';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPopupComponent } from './photo-popup/photo-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    LandmarkDetailComponent,
    LandmarksListComponent,
    NavbarComponent,
    LoginModalComponent,
    PhotoPopupComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
