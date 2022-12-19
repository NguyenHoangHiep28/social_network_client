import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class HomeModel {

    constructor() { }

    private _data: any;
    private _form: any;

    set data(value: any) {
        this._data = value
    }

    get data() {
        if (this._data) {
            return this._data;
        } else {
            return '';
        }
    }

    set form(value: any) {
        this._form = value
    }

    get form() {
        if (this._form) {
            return this._form;
        } else {
            return '';
        }
    }

}