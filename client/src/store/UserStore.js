import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userNamee =''
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setUserNamee(userNamee) {
        this._userNamee = userNamee
    }

    get isAuth() {
        return this._isAuth 
    }

    get user() {
        return this._user 
    }

    get userNamee() {
        return this._userNamee
    }
}