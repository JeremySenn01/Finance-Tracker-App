import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpendingsComponent } from './spendings/spendings.component';
import { NewSpendingComponent } from './new-spending/new-spending.component';
import { SummaryComponent } from './summary/summary.component';
import { SpendingOverviewComponent } from './spending-overview/spending-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    SpendingsComponent,
    NewSpendingComponent,
    SummaryComponent,
    SpendingOverviewComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
