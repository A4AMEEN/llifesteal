import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MinecraftHomeComponent } from './components/minecraft-home/minecraft-home.component';
import { TradesComponent } from './components/trades/trades.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { OtpComponent } from './components/otp/otp.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/admin/auth/auth.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PlayerListComponent } from './components/admin/players/players.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { TradeComponent } from './components/admin/trades/trades.component';
import { TradeDialogComponent } from './components/trade-dialog/trade-dialog.component';
import { TradeSuccessPopupComponent } from './components/trade-success-popup/trade-success-popup.component';
import { TradingComponent } from './components/admin/trading/trading.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { UserTradesComponent } from './components/profile/user-trades/user-trades.component';

@NgModule({
  declarations: [
    AppComponent,
    MinecraftHomeComponent,
    TradesComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    HeaderComponent,
    AuthComponent,
    DashboardComponent,
    PlayerListComponent,
    SidebarComponent,TradeComponent, TradeDialogComponent, TradeSuccessPopupComponent, TradingComponent, ProfileComponent, UserProfileComponent, UserTradesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
