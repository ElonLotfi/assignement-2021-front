import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';


/**
 * @title Card with multiple sections
 */

@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})


export class CardComponent implements OnInit{


  @Input()
  nomAssignemnt?: string;
  @Input()
  nom?: string;
  @Input()
  dateRendu?: string;
  @Input()
  rendu?: boolean;
  @Input()
  nomMatiere?: string;
  @Input()
  imageProf?: string;
  @Input()
  imageMatiere?: string;

  

  

  ngOnInit(): void {
  }

  constructor() { }

}