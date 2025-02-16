import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradesComponent } from './components/trades/trades.component';
import { MinecraftHomeComponent } from './components/minecraft-home/minecraft-home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/admin/auth/auth.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PlayerListComponent } from './components/admin/players/players.component';
import { TradeComponent } from './components/admin/trades/trades.component';
import { TradingComponent } from './components/admin/trading/trading.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { UserTradesComponent } from './components/profile/user-trades/user-trades.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: MinecraftHomeComponent },
  { path: 'trades', component: TradesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: MinecraftHomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'otp', component: OtpComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'admin/auth', component: AuthComponent, canActivate: [AdminGuard] },
  {
    path: 'admin-dashboard', component: DashboardComponent, children: [
      { path: 'players', component: PlayerListComponent },
      { path: 'trades', component: TradeComponent },
      { path: 'dashboard', component: TradingComponent },
    ]
  },
  {
    path: 'dashboard',
    component: ProfileComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'trades', component: UserTradesComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }