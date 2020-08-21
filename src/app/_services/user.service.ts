import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { Fitness } from '../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    // public static BaseUrl = "http://localhost:4444/";
    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) { }
    postfitnessdata(data){
      return this.http.post(UserService.BaseUrl+'allfriends',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
    getfitnessdata(): Observable<Fitness[]>{
      return this.http.get(UserService.BaseUrl+'allfriends',httpOptions).pipe(map((response: Response) => <Fitness[]>response.json()));
    }
    getfitnessdatabyid(id){
      return this.http.get(UserService.BaseUrl+'allfriends' + '/' + id).pipe(map((response: Response) => response.json()));
    }
    deletefitnessdata(data){
      return this.http.delete(UserService.BaseUrl+'allfriends/'+data.id).pipe(map((response: Response) => response.json()));
    }
    updatefitnessdata(dataforid,data){
      return this.http.put(UserService.BaseUrl+'allfriends/' + dataforid.id,data).pipe(map((response: Response) => response.json()));
    }
    postcontactdata(data)
    {
      return this.http.post(UserService.BaseUrl+'contact',data,httpOptions).pipe(map((response: Response) => response.json()));
    }
}