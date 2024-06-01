import {makeAutoObservable} from "mobx";

export default class PictureStore {
    constructor() {
        this._themes = []
        this._pictures = []
        this._collections = []
        this._comments = []
        this._amount = 0
        this._selectedTheme = {themeID: 0, name: 'Any'}
        this._selectedCollection = {}
        this._uploadTheme = {}
        this._addToCol={}
        makeAutoObservable(this)
    }

    setThemes(themes) {
        this._themes = themes
    }

    setUploadTheme(uploadTheme) {
        this._uploadTheme = uploadTheme
    }

    setPictures(pictures) {
        this._pictures = pictures
    }

    setCollections(collections) {
        this._collections = collections
    }

    setSelectedTheme(theme) {
        this._selectedTheme = theme
    }

    setSelectedCollection(theme) {
        this._selectedTheme = theme
    }

    setAmount(amount) {
        this._amount = amount
    } 

    setComments(comments) {
        this._comments = comments
    }

    setAddToCol(collection) {
        this._addToCol = collection
    }
    get themes() {
        return this._themes
    }

    get uploadTheme() {
        return this._uploadTheme
    }

    get pictures() {
        return this._pictures
    }

    get collections() {
        return this._collections
    }

    get selectedTheme() {
        return this._selectedTheme
    }

    get selectedCollection() {
        return this._selectedCollection
    }

    get amount() {
        return this._amount
    }

    get comments() {
        return this._comments
    }

    get addToCol(){
        return this._addToCol
    }
}