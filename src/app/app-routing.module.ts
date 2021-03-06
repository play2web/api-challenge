import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';

const routes: Routes = [
    { path: '', component: CharactersListComponent },
    { path: '**', redirectTo: '',  }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
