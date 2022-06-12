import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../iuser';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = "https://celliers-backend.courshybride.com/user/";

  etatConnexion:boolean = false;

  estConnecte:BehaviorSubject<boolean>;
  estConnecte$:Observable<boolean>;
  
  titrePage:BehaviorSubject<string>;
  titrePage$:Observable<string>;
  
  constructor(private http:HttpClient) {
    this.estConnecte = new BehaviorSubject<boolean>(false);
    this.estConnecte$ = this.estConnecte.asObservable();

    this.titrePage = new BehaviorSubject<string>("");
    this.titrePage$ = this.titrePage.asObservable();

    if(sessionStorage.getItem("estConnecte") === "true"){
      this.estConnecte.next(true);
    }
  }

  statut():Observable<boolean>{
    return this.estConnecte;
  }

  /** GET requête pour afficher les bouteilles du cellier */
  getLoggedUser():Observable<IUser>{
    return this.http.get<IUser>(this.url);
}

  login(data:any):Observable<any>{
    let httpOption = {
      headers : new HttpHeaders({
          'Content-type' : 'application/json',
          // 'Authorization' : 'Basic '+ btoa("biero:biero")
      })                                                                                                    
    };                                                                                                                  
    return this.http.put<IUser>(this.url,data,httpOption);
  }

  setConnexion(etatConnexion:boolean):void {
    this.etatConnexion = etatConnexion;
    sessionStorage.setItem("estConnecte", this.etatConnexion.toString());
    this.estConnecte.next(etatConnexion);
  }

  getConnexion():boolean {
    return this.etatConnexion;
  }

  setTitre(titre:string):void{
    this.titrePage.next(titre);
  }

  getTitre():Observable<string>{
    return this.titrePage;
  }

}
