import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarPanelComponent } from './components/toolbar-panel/toolbar-panel.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, MainComponent, NotFoundComponent, ProfileComponent, TableComponent, ToolbarPanelComponent, FilterPanelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
