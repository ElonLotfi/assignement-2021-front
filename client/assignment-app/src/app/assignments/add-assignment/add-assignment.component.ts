import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ToastrService } from 'ngx-toastr';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // stepper implementation
  completed = false;
  stepOne: FormGroup
  matiereForm: FormGroup
  renduForm: FormGroup
  detailsForm: FormGroup



  constructor(private builder: FormBuilder, private assignmentsService: AssignmentsService, private toastr: ToastrService,
    private router: Router) {

    this.stepOne = builder.group({
      nameAssignementCtrl: ['', Validators.required],
      studentNameCtrl: ['', Validators.required]

    })
    this.matiereForm = builder.group({
      matiereCtrl: ['', Validators.required],
    })
    this.renduForm = builder.group({
      rendu: ['', Validators.required],
    })
    this.detailsForm = builder.group({
      note: ['', Validators.required],
      remarque: ['', Validators.required],
      date: ['', Validators.required],


    })


  }


  completStep() {
    this.completed = true;
  }

  toppingList = ['JavaScript', 'Java', 'Database', 'Iot'];
  profsList = ['Philippe Renevier', "Philippe Collet", "Michel buffa", "MOPOLO"]

  bindingInfoCourse = [
    { nomProf: this.profsList[2], nomMatiere: this.toppingList[0], imageMatiere: "https://wallpapercave.com/wp/wp2465927.jpg", imageProf: "https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg" },
    { nomProf: this.profsList[1], nomMatiere: this.toppingList[3], imageMatiere: "https://wallpapercave.com/wp/wp4902400.jpg", imageProf: "https://static9.depositphotos.com/1070812/1091/i/950/depositphotos_10916856-stock-photo-teacher-on-background-of-blackboard.jpg" },
    { nomProf: this.profsList[3], nomMatiere: this.toppingList[2], imageMatiere: "https://wallpapercave.com/wp/wp2347580.jpg", imageProf: "https://image.shutterstock.com/image-photo/asian-senior-male-calculus-professor-260nw-1891943233.jpg" },
    { nomProf: this.profsList[0], nomMatiere: this.toppingList[1], imageMatiere: "https://wallpapercave.com/wp/wp7472020.jpg", imageProf: "https://media-exp1.licdn.com/dms/image/C5603AQHg13iSRaqznA/profile-displayphoto-shrink_200_200/0/1516485131056?e=1645660800&v=beta&t=soZc1p-xu_Mec6Y9hI4hGJqldfWMhHR5xosz12t1KhM" }

  ]

  nomDevoir = ""; // champ du formulaire
  dateDeRendu!: Date;
  studentName = ""
  matiere = []
  selectedToppings = "";
  selectedProfs!: [];
  note = 0
  remarque = ""
  isChecked = true;






  ngOnInit(): void {


  }

  showToaster(studentName: string, assignmentName: string) {
    this.toastr.success("L'assignement " + assignmentName + " est ajouter pour l'etudiant " + studentName + " !")
  }
  onSubmit(): void {

    const newAssignment: Assignment = new Assignment();
    newAssignment.nom = this.stepOne.controls['studentNameCtrl'].value;
    newAssignment.nomDevoir = this.stepOne.controls['nameAssignementCtrl'].value;
    console.log("newAssignment.nomDevoir" + newAssignment.nomDevoir)
    if (this.detailsForm.controls['date'].value) {
      newAssignment.dateDeRendu = this.detailsForm.controls['date'].value.toISOString().split('T')[0]
    } else {
      newAssignment.dateDeRendu = new Date().toISOString().split('T')[0]
    }
    newAssignment.rendu = this.renduForm.controls['rendu'].value;
    newAssignment.note = this.detailsForm.controls['note'].value;
    newAssignment.remarque = this.detailsForm.controls['remarque'].value;
    newAssignment.matiere = [{}]
    newAssignment.matiere.pop()
    let matiereObject = {
      nomMatiere: this.selectedToppings,
      imageProf: this.bindingInfoCourse.find(course => course.nomMatiere === this.selectedToppings.toString())?.imageProf,
      imageMatiere: this.bindingInfoCourse.find(course => course.nomMatiere === this.selectedToppings.toString())?.imageMatiere,
    }
    newAssignment.matiere.push(matiereObject)

    if (this.stepOne.invalid || this.matiereForm.invalid || this.renduForm.invalid || this.detailsForm.invalid) {
      this.toastr.error("Tout les champs sont obligatoires")
    }
    if (newAssignment.nom && newAssignment.dateDeRendu && newAssignment.matiere && newAssignment.remarque && newAssignment.rendu && newAssignment.nomDevoir && newAssignment.note) {
      this.assignmentsService.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
          this.showToaster(newAssignment.nomDevoir, newAssignment.nom)
          this.router.navigate(['/home']);
        })
    }
    if (newAssignment.nom && newAssignment.dateDeRendu && newAssignment.matiere && newAssignment.nomDevoir && newAssignment.rendu == false) {

      this.assignmentsService.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);
          this.router.navigate(['/home']);
        })
      this.toastr.info("L'assignement non rendue vient d'être ajoutée")

    }
  }

}
