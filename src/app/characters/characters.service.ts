import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CharactersService {
    private _marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    private _publicKey = 'c4b5296bc35888971631d22848916410';
    private _privateKey = 'fddd97e16368b2fee706a1f6de69f30f191467d3';
    constructor(private _httpService: HttpClient, private _md5: Md5) { }
    private getHash(timeStamp: string): string {
        const hashGenerator: Md5 = new Md5();
        hashGenerator.appendStr(timeStamp);
        hashGenerator.appendStr(this._privateKey);
        hashGenerator.appendStr(this._publicKey);
        const hash: string = hashGenerator.end().toString();
        return hash;
    }
    private getTimeStamp(): string {
        return new Date().valueOf().toString();
    }
    getAllCharacters(offset: number, limit: number) {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        const requestUrl = this._marvelCharacterUrl + '?orderBy=name'
            + '&ts=' + timeStamp + '&offset=' + offset + '&limit='
            + limit + '&apikey=' + this._publicKey + '&hash=' + hash;
        return this._httpService.get(requestUrl);
    }

    getTotalResults(offset: number, limit: number) {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        const requestUrl = this._marvelCharacterUrl + '?orderBy=name'
            + '&ts=' + timeStamp + '&offset=' + offset + '&limit='
            + limit + '&apikey=' + this._publicKey + '&hash=' + hash;
        return this._httpService.get(requestUrl);
    }

    getCharacterByName(name: string) {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        const requestUrl = this._marvelCharacterUrl + '?orderBy=name'
            + '&nameStartsWith=' + name + '&ts=' + timeStamp + '&apikey='
            + this._publicKey + '&hash=' + hash;
        return this._httpService.get(requestUrl);
    }

}
