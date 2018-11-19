import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { verticalMenuItems } from '../menu/menu';
import { Router } from '@angular/router';

import { MenuRestService } from '../../../services/menu.rest.service';
import { LogoutService } from '../../../services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public menuItems:Array<any>;
  public userName;
  public userRole;

  constructor(
    public appSettings:AppSettings, 
    public menuService:MenuService,
    public menuRest:MenuRestService,
    private router : Router,
    private logoutService:LogoutService
  ) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getHorizontalMenuItems();
  
     
  }
  
  ngOnInit() {
    if(window.innerWidth <= 768) 
      this.showHorizontalMenu = false;

    this.userName = this.gettingUserName();
    this.userRole = this.gettingUserRole();
  }

  public gettingUserName():string{
    return localStorage.getItem('userName');
  }

  public gettingUserRole():string{
    return localStorage.getItem('userRole');
  }  


  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
      for (let i = 0; i < menu.children.length; i++) {
          let child = menu.children[i].children[1];
          if(child){          
              if(child.classList.contains('show')){            
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed'); 
              }             
          }
      }
    }
  }

  public logOut(){
    this.logoutService.logOut().subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
        /**
         * Remove sensitive data from browser
         */
        localStorage.removeItem('menus');
        localStorage.removeItem('token');
        //localStorage.removeItem('tokenLife');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        //localStorage.removeItem('logout');
        localStorage.setItem('logout', 'yes');
      }, 
      error => {
        console.log({
          message: "cannot logout"
        });
        this.router.navigate(['/login']);
      });
  }


  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 768){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }
  
}
