import { AssignmentsComponent } from "./assignments.component";

export class Assignment {
  nom!:string;
  dateDeRendu!:string;
  rendu?:boolean;
  nomDevoir!:string;
  id!:number;
  remarque!:string;
  note!:number;
  matiere!:[{
    nomMatiere?:string,
    imageProf?:string,
    imageMatiere?:string,
  }];
  _id?:string
}


