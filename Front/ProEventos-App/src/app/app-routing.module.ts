import { ContatosComponent } from './components/contatos/contatos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'eventos', component: EventosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'palestrantes', component: PalestrantesComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'contatos', component: ContatosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
