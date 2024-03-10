import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { LandmarkDetailComponent } from './landmark-detail/landmark-detail.component';

// Define the application routes
const routes: Routes = [
  { path: '', component: LandmarksListComponent },        // Home route
  { path: 'detail/:id', component: LandmarkDetailComponent },  // Landmark detail route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
