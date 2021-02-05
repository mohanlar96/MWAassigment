export interface Profile{
   id:string,
   email:string,
   password:string,
   campusTakenCourse:[string],
   distanceTakenCourse:[string],
   aboutYourself:String,
   profile:{
       url:string
   },
   gender:string,
   courseType:[string]

}