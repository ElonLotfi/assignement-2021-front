import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
})

export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments :';
  //ajoutActive = false;
  pageEvent?: PageEvent;
  assignmentSelectionne?: Assignment;
  assignments: Assignment[] = [];
  // proprietes de pagination
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;
  assignment?: Assignment
  // pour filtrer les assignement par rendu et non rendu
  rendu = new Column('Rendu', [])
  nonRendu = new Column('Non Rendu', [])
  // Le board qui contient les assignement rendu et non rendu  
  board: Board = new Board('Test Board', [
    this.rendu,
    this.nonRendu
  ]);
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private toastr: ToastrService,


  ) { }
  ngOnInit(): void {
    this.getAssignments(this.page, this.limit);
    console.log('APPEL à getAssignments terminé');
    console.log(localStorage.getItem('JWT_TOKEN'));

  }

  // Methode responsable de drag et drop des assignement
  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      this.toastr.success("assignment updated")
      this.getAssignment(event.previousContainer.data[event.previousIndex]['id'])
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  // Get Assignement via id 
  getAssignment(id: number) {
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;
        this.assignment?.rendu ? this.onSaveAssignmentRendu(false) : this.onSaveAssignmentRendu(true)
  

      });
  }

  // Quand on deplace un assignement depuis rendu vers non rendu , on stock son nouveau etat
  onSaveAssignmentRendu(rendu: boolean) {
    if (!this.assignment) return;
    this.assignment.rendu = rendu
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      });
  }
  getAssignments(page: number, limit: number) {
    this.assignmentsService
      .getAssignmentsPagine(page, limit)
      .subscribe((data) => {
        console.log("limite ", limit)
        this.assignments = data.docs; // les assignments
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.renduCase()
      });
  }

  // Permet de recuperer les assignement paginer 
  getServerData(event: PageEvent) {
    this.assignmentsService
      .getAssignmentsPagine(event?.pageIndex + 1, event?.pageSize)
      .subscribe((data) => {
        this.assignments = data.docs; // les assignments
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.initRendu()
        this.renduCase()
      });
    return this.pageEvent
  }

  // utiliser pour la pagination
  handlePageChange(event: number) {
    this.page = event;
    this.getAssignments(this.page, this.limit);
  }
  // initialiser la liste des assignements rendu et non rendu
  initRendu() {
    this.rendu.tasks = [];
    this.nonRendu.tasks = [];
  }
  // Filtrer les assignements vers rendu et non rendu
  renduCase() {
    this.assignments.forEach(
      it => it.rendu ? this.rendu.tasks.push(it) : this.nonRendu.tasks.push(it)
    )
  }

  onDeleteAssignment(assignment: Assignment) {
    // on supprime cet assignment
    this.assignmentsService
      .deleteAssignment(assignment)
      .subscribe((message) => {
        console.log(message);
      });
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      this.router.navigate(['/home'], { replaceUrl: true });
    });
  }
}
