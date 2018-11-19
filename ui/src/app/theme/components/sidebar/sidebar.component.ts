import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { MenuRestService } from '../../../services/menu.rest.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidebarComponent implements OnInit {
  public settings: Settings;
  public menuItems: Array<any>;
  constructor(public appSettings: AppSettings, public menuService: MenuService, private menuRestService: MenuRestService) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getVerticalMenuItems();
   //
   // console.log("SidebarComponent")
   //
  }

  ngOnInit() {

    /*if(sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
      });
      this.menuItems = newArr;
    }*/
  }

  public closeSubMenus() {
    const menu = document.querySelector('#menu0');
    for (let i = 0; i < menu.children.length; i++) {
        const child = menu.children[i].children[1];
        if (child) {
            if (child.classList.contains('show')) {
              child.classList.remove('show');
              menu.children[i].children[0].classList.add('collapsed');
            }
        }
    }
  }


}
