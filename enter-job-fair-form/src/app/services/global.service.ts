import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService 
{
  public loading: boolean;
  public logged_in: boolean;

  public constructor()
  {
    this.loading = false;
    this.logged_in = false;
  }
}
