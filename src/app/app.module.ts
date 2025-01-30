import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {AuthService} from "./demo/service/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./demo/components/auth/auth.interceptor";
import {LoginComponent} from "./demo/components/auth/login/login.component";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
    declarations: [AppComponent, NotfoundComponent,LoginComponent],
    imports: [AppRoutingModule, AppLayoutModule, PasswordModule, FormsModule, CheckboxModule],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },

        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
