import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios, { AxiosResponse } from 'axios';
import { User } from '../store/reducers';
import { logOut } from '../store/action';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {


  

  public axios () {
    const headers = localStorage.getItem('token') ? 
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    :
    {
      'Content-Type': 'application/json',
    }
    return axios.create({
      baseURL: 'http://localhost:5205',
      timeout: 1000,
      headers: headers
    });
  }

  public async getReq <T>(path: string) : Promise<T> {
    return await this.axios().get(path)
      .then(res => this.responseFunc(res))
      .catch(err => this.errorFunc(err))
      
  }

  public async postReq <T>(path: string, body?: {}) : Promise<T> {
    return await this.axios().get(path, body)
      .then(res => this.responseFunc(res))
      .catch(err => this.errorFunc(err))
      
  }

  private responseFunc (res : AxiosResponse<any, any>) {
    if (res.status === 200 || res.status === 201) {
      return res.data 
    } else {          
      return null;
    }
  }

  private errorFunc (err : any) {
    console.log(err);    
    if (err.response) {
      if (err.response.status === 401) {
        localStorage.removeItem('token');
        this.store.dispatch(logOut());
      }
    }
  }


  constructor(private store: Store<{user: User}>,) { }
}

export const APIroutes  = {
  login: '/auth/login'
}


