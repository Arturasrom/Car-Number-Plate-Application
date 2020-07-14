import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { EditOwnerComponent } from './components/edit-owner/edit-owner.component';
import { OwnersListComponent } from './components/owners-list/owners-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-owner' },
  { path: 'add-owner', component: AddOwnerComponent },
  { path: 'edit-owner/:id', component: EditOwnerComponent },
  { path: 'owners-list', component: OwnersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
