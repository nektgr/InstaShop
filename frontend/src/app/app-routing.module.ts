import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandamarksListComponent } from './landamarks-list/landamarks-list.component';

const routes: Routes = [
  {path:'',component: LandamarksListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
