import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandmarksListComponent } from './landmarks-list/landmarks-list.component';
import { LandmarkDetailComponent } from './landmark-detail/landmark-detail.component';
const routes: Routes = [
  {path:'',component: LandmarksListComponent},
  {path:'detail/:id', component: LandmarkDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
