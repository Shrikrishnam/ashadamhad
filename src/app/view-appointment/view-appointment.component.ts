import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  public fitnessData = [];
  constructor(private router: Router, private userservice: UserService){}

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.userservice.getfitnessdata().subscribe(data => this.fitnessData = data);
  }

  deletefitness(fitness){
    if(confirm("Are you sure you want to delete?")){
      this.userservice.deletefitnessdata(fitness).subscribe(() => this.getfitness());
    }
  }

  editfitness(fitness){
      this.router.navigate(['place-fitness-trainer-appointment'],{ queryParams: { id: fitness.id }});
  }
}
