import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OnBoardingComponent } from './on-boarding/on-boarding.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'onboarding',
    component: OnBoardingComponent,
    children: [
      {
        path: '',
        component: StepOneComponent
      },
      {
        path: 'step-two',
        component: StepTwoComponent
      },
      {
        path: 'step-three',
        component: StepThreeComponent
      }
    ]
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
