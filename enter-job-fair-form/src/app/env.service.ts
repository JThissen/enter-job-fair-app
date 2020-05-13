import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvService 
{
  public base_url: string;

  public constructor()
  {
    this.base_url = environment.urlAddress;
  }
}
