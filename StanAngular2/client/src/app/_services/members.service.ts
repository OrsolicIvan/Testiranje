import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { Apartment,ApartmentClass, RentApartmentClass } from '../_models/apartment';
import { IAdress,Adress } from '../_models/adress';
import { CommentClass, IComment } from '../_models/comment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer' + JSON.parse(localStorage.getItem('user'))
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  formData:Adress= new Adress();
  reApformData:RentApartmentClass= new RentApartmentClass();
  apformData:ApartmentClass= new ApartmentClass();
  comformData:CommentClass= new CommentClass()
  apartment: Apartment
  constructor(private http: HttpClient) { }
  getApartments(){
    return this.http.get<Apartment[]>(this.baseUrl + 'users/apartments', httpOptions);
  }
  refreshApCard(id : number){
    this.http.get(this.baseUrl + 'users/' + id +'rent', httpOptions)
    .toPromise()
    .then(res=>this.apartment = res as Apartment)
  }
  
  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
  }
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
    
  }
  getApartmentsById(id : number)
  {
    return this.http.get<Apartment[]>(this.baseUrl + 'users/' + id, httpOptions);
  }
  getReApartmentBy(id : number)
  {
    return this.http.get<Apartment[]>(this.baseUrl + 'users/' + id +'rent',httpOptions)
  }
  getCommentById(id : number){
    return this.http.get<IComment[]>(this.baseUrl+ 'users/' + id +'comments',httpOptions)
  }
  postAdress(){
    return this.http.post(`https://localhost:44329/api/Users/ApartmentAdress/`,this.formData)
  }
  postApartment(){
    return this.http.post(`https://localhost:44329/api/Users/OwnedApartment/`,this.apformData)
    
  } 
  rentApartment(){
    return this.http.put(`https://localhost:44329/api/Users/RentedApartment?apartmentId=${this.reApformData.apartmentId}`,this.reApformData)
  }
  unRentApartment(){
    return this.http.put(`https://localhost:44329/api/Users/CancelRent?apartmentId=${this.reApformData.apartmentId}`,this.reApformData)
  }
  updateApartment(apartmentForm){
    return this.http.put(`https://localhost:44329/api/Users/UpdateApartment?apartmentId=${this.apformData.id}`,apartmentForm)
  }
  postComment(){
    return this.http.post(`https://localhost:44329/api/Users/add-comment/`,this.comformData)
  }
}

