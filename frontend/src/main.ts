/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

*/
/*ANTES DE ADD RECIPE QU ENO SE RCARGA
 import { bootstrapApplication } from '@angular/platform-browser';
 import { AppComponent } from './app/app.component';
 import { appConfig } from './app/app.config';
 import { provideToastr } from 'ngx-toastr';
 import { provideHttpClient } from '@angular/common/http';
 
 bootstrapApplication(AppComponent, {
   ...appConfig,
   providers: [
     provideHttpClient(),
     ...appConfig.providers!,
     provideToastr({
       timeOut: 3000,
       positionClass: 'toast-top-right',
     }),
   ]
   
 })
   .catch((err) => console.error(err));*/

/*import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
  ]
})
  .catch((err) => console.error(err));*/

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    ...appConfig.providers!,
    importProvidersFrom(BrowserAnimationsModule), // Asegura que las animaciones estén disponibles
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
  ]
});



