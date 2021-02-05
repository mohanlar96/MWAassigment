import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ProfileService} from '../services/profile.service';
import {Profile} from '../model/profile';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  constructor(private profileService : ProfileService) { }
  public profile: Profile={
    id:'',
    email:'',
    password:'',
    campusTakenCourse:[''],
    distanceTakenCourse:[''],
    aboutYourself:'',
    profile:{
        url:''
    },
    gender:'',
    courseType:['']
  };

  onSubmit=(f:NgForm)=>{
    this.profileService.addProfile(this.profile).subscribe(data=>console.log(data));
    
  }


  ngOnInit(): void {
    this.profileService.getProfiles().subscribe(data=>console.log(data));
  }

}
