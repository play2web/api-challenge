import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Md5 } from 'ts-md5/dist/md5';
import { CharactersService } from './characters/characters.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CharactersListComponent } from './characters/characters-list/characters-list.component';


@NgModule({
    declarations: [
        AppComponent,
        CharactersListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        Ng2OrderModule,
        NgxPaginationModule
    ],
    providers: [CharactersService, Md5, LocalStorageService, Title],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
