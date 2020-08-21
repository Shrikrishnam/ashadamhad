import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../_services/user.service";
import { ActivatedRoute , Router } from '@angular/router';


export class Fitness {
  constructor(
    // public id: number,
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string,
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  FitnessObj: Fitness;
  isEdit = false;
  idtoupdate;

  constructor(private userService:UserService, private route: ActivatedRoute, private router: Router) { }

  fitnessForm = new FormGroup({
    // id: new FormControl(this.FitnessObj.id),
    firstname: new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]+$")]),
    lastname: new FormControl('',[Validators.required, Validators.pattern("^[A-Za-z]+$")]),
    age: new FormControl('',[Validators.required,Validators.min(18),Validators.max(60)]),
    phonenumber: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$")]),
    streetaddress: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    pincode: new FormControl('',[Validators.required,Validators.pattern("[0-9]{6}")]),
    trainerpreference: new FormControl(''),
    physiotherapist: new FormControl(''),
    packages: new FormControl(''),
    inr: new FormControl('',Validators.required),
    paisa: new FormControl('',Validators.required)
  });


  get firstname()
  {
    return this.fitnessForm.get('firstname');
  }
  get lastname()
  {
    return this.fitnessForm.get('lastname');
  }
  get age()
  {
    return this.fitnessForm.get('age');
  }
  get email()
  {
    return this.fitnessForm.get('email');
  }
  get pincode()
  {
    return this.fitnessForm.get('pincode');
  }
  get trainerpreference(){
    return this.fitnessForm.get('trainerpreference');
  }
  get packages(){
    return this.fitnessForm.get('packages');
  }
  get physiotherapist()
  {
    return this.fitnessForm.get("physiotherapist");
  }
  get inr()
  {
    return this.fitnessForm.get('inr');
  }
  get paisa()
  {
    return this.fitnessForm.get('paisa');
  }
  get phonenumber(){
    return this.fitnessForm.get('phonenumber');
  }
  

  ngOnInit() {
    this.fitnessForm.reset();
    this.idtoupdate = this.route.snapshot.queryParams.id;
    if(this.idtoupdate != undefined)
    {
      this.getData();
    }
  }
  getData(){
    
    return this.userService.getfitnessdatabyid(this.idtoupdate).subscribe(
      (data) =>{
        this.FitnessObj = data;
        this.fitnessForm.patchValue({firstname: this.FitnessObj.firstname,
        lastname: this.FitnessObj.lastname,
        age: this.FitnessObj.age,
        email: this.FitnessObj.email,
        phonenumber: this.FitnessObj.phonenumber,
        streetaddress: this.FitnessObj.streetaddress,
        city: this.FitnessObj.city,
        state: this.FitnessObj.state,
        country: this.FitnessObj.country,
        pincode: this.FitnessObj.pincode,
        trainerpreference: this.FitnessObj.trainerpreference,
        physiotherapist: this.FitnessObj.physiotherapist,
        packages: this.FitnessObj.packages,
        inr: this.FitnessObj.inr,
        paisa: this.FitnessObj.paisa,
        });
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    console.log(this.fitnessForm.value);
    this.userService.postfitnessdata(this.fitnessForm.value).subscribe(response => console.log("Success!", response),error => console.error("Error!",error));
    this.fitnessForm.reset();
    this.router.navigateByUrl('view-appointment');
  }
  onEdit(){
    console.log("Editing");
    this.userService.updatefitnessdata(this.FitnessObj,this.fitnessForm.value).subscribe(()=>{
      this.getData();
    })
    this.fitnessForm.reset();
    this.router.navigateByUrl('view-appointment');
  }
    
  calculate(value: string){
    switch(value){
      case "Opt1": this.fitnessForm.patchValue({
        packages: '500',
        inr: '500',
        paisa: '00'
      });
        break;
      case "Opt2":this.fitnessForm.patchValue({
        packages: '400',
        inr: '2400',
        paisa: '00'
      });
        break;
      case "Opt3": this.fitnessForm.patchValue({
        packages: '300',
        inr: '3600',
        paisa: '00'
      });
    }
  }
}
