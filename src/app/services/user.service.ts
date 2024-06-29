import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  AxiosService } from './axios.service';
import { Store } from '@ngrx/store';
import { User } from '../store/reducers';
import { logIn, logOut } from '../store/action';
import { UserData, UserLoginPayload } from '../types/user';


const routes = {
  login: '/auth/login',
  userData: '/user'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private axiosService : AxiosService,
    private store: Store<{user: User}>,
  ) {

  }

  setToken (token: string) {
    localStorage.setItem('token', token)
  }

  clearToken () {
    localStorage.removeItem('token')
  }

  logOut () {
    this.clearToken();
    this.store.dispatch(logOut())
  }

  async sendLogInRequest (payload : UserLoginPayload) : Promise<boolean> {
    let isSuccess = false;
    await this.axiosService.axios().post(routes.login, {
      email: payload.email,
      password: payload.password
    }).then(res => {
      if (res.status === 200) {
        const data = res.data
        this.store.dispatch(logIn({name: data.username}));
        this.setToken(data.token);
        isSuccess = true;
      }
    }).catch(err => console.log(err))
    return isSuccess;
  }

  async getUserData () : Promise<UserData> {
    return await this.axiosService.getReq<UserData>(routes.userData)
      .then(data => {        
        console.log(data);
        return data
      })
  }
}

