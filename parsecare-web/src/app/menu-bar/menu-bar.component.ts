/*import { Component, Input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'menu-bar-component',
    templateUrl: 'menu-bar.component.html',
    styleUrls: ['menu-bar.component.css']
})

export class MenubarComponent{
    constructor(private router: Router, public snackBar: MatSnackBar){}
    @Input('header') header: string;
    @Input('username') nickname: string;
    @Input('color') color: string = 'accent';
    @Input('error') error: boolean = false;
    @Input('isAdmin')isAdmin: boolean = false; 
    
    usrname: string;
    password: string;


}