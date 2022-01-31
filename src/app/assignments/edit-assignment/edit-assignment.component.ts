import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment?: Assignment;
  nomAssignment?: string;
  // dateDeRendu?: Date;
  dateDeRendu?: string;
  nomEtudiant?:string;

  toppingList = ['JavaScript', 'Java', 'Database', 'Iot'];
  profsList = ['Philippe Renevier', "Philippe Collet", "Michel buffa", "MOPOLO"]

  bindingInfoCourse = [
    { nomProf: this.profsList[2], nomMatiere: this.toppingList[0], imageMatiere: "https://wallpapercave.com/wp/wp2465927.jpg", imageProf: "https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg" },
    { nomProf: this.profsList[1], nomMatiere: this.toppingList[3], imageMatiere: "https://wallpapercave.com/wp/wp4902400.jpg", imageProf: "https://static9.depositphotos.com/1070812/1091/i/950/depositphotos_10916856-stock-photo-teacher-on-background-of-blackboard.jpg" },
    { nomProf: this.profsList[3], nomMatiere: this.toppingList[2], imageMatiere: "https://wallpapercave.com/wp/wp2347580.jpg", imageProf: "https://image.shutterstock.com/image-photo/asian-senior-male-calculus-professor-260nw-1891943233.jpg" },
    { nomProf: this.profsList[0], nomMatiere: this.toppingList[1], imageMatiere: "https://wallpapercave.com/wp/wp7472020.jpg", imageProf: "https://media-exp1.licdn.com/dms/image/C5603AQHg13iSRaqznA/profile-displayphoto-shrink_200_200/0/1516485131056?e=1645660800&v=beta&t=soZc1p-xu_Mec6Y9hI4hGJqldfWMhHR5xosz12t1KhM" }

  ]
  matiere?:Object;
  selectedToppings!: [];
  selectedProfs!: [];
  note ?:number;
  remarque? :string;
  isChecked = true;



  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log("-----------")
    // Récupération des queryParams et fragment (ce qui suit le ? et le # dans l'URL)
    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment d'URL (ce qui suit le #) :");
    console.log(this.route.snapshot.fragment);
    console.log("-----------")

    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService
      .getAssignment(id)
      .subscribe((assignment) => {
        this.assignment = assignment;
        this.nomAssignment = assignment?.nomDevoir;
        this.nomEtudiant = assignment?.nom;
        this.dateDeRendu = assignment?.dateDeRendu;
        this.remarque = assignment?.remarque;
        this.note = assignment?.note;

      });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nomDevoir = this.nomAssignment;
    }
    if (this.nomEtudiant) {
      this.assignment.nom = this.nomEtudiant;
    }
    if (this.matiere) {
      this.assignment.matiere[0] = this.matiere;
    }
 
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.remarque) {
      this.assignment.remarque = this.remarque;
    }
    if (this.note) {
      this.assignment.note = this.note;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        if(reponse.message="updated"){
          this.toastr.info(" La mise à jour de l'assignement est effectuée avec succès ")
          this.router.navigate(['/home']);
        }
      });
  }
}
