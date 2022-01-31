import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/** @title Select with multiple selection */
@Component({
  selector: 'select-multiple',
  templateUrl: 'select-multiple-component.html',
  styleUrls: ['select-multiple-component.css'],
})
export class Select {
  toppings = new FormControl();

  toppingList = ['JavaScript', 'Java', 'Database', 'Iot'];
  selectedToppings!:string;
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
