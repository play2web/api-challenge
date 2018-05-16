import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CharactersService } from '../characters.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/do';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {
    characters: any = [];
    p = 1;
    perPage = 20;
    bookmarkedCharacter: string;

    constructor(private charactersService: CharactersService,
        private localStorageService: LocalStorageService, private _titleService: Title) { }

    ngOnInit() {
        this._titleService.setTitle('Marvel Challenge');
        this.getCharacters(0, 20);
        this.bookmarkedCharacter = this.getbookmarkItem();
        this.getCharactersSearch(this.bookmarkedCharacter);
    }

    getCharacters(offset: number, limit: number) {
        this.charactersService.getAllCharacters(offset, limit)
            .subscribe(characters => {
                this.characters = characters;
            }, message => {
                console.log(message);
            });
    }
    getCharactersSearch(query: string) {
        this.charactersService.getCharacterByName(query)
            .subscribe(characters => {
                this.characters = characters;
            }, message => {
                console.log(message);
            });
    }
    getPageData($event) {
        const limit = 20;
        const offset = ($event - 1) * limit;
        this.p = $event;
        this.getCharacters(offset, limit);
    }

    bookmarkItem(name: string) {
        this.localStorageService.setData('character', name);
        this.bookmarkedCharacter = name;
    }

    getbookmarkItem() {
        const character = this.localStorageService.getData('character');
        return character;
    }
}
