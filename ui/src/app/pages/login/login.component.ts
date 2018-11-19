import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service'
import { first } from 'rxjs/operators';
import { MenuRestService } from '../../services/menu.rest.service'
import { Menu } from '../../theme/components/menu/menu.model'
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;

    constructor(
        router: Router,
        fb: FormBuilder,
        private menu: MenuRestService,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService,
    ) {
        this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.authenticationService.login(this.form.get('email').value, this.form.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('userName', data.parameters.user);
                    localStorage.setItem('userRole', data.parameters.role);
                    if (data.headers[environment.HEADER_SERVICE_CODE] === environment.SUCCESS_CODE) {
                        this.menu.getMenu(data.parameters.idRole).subscribe(menus => {
                            const listmenus: Menu[] = this._menus(menus); // divide y venceras
                            console.log('menus');
                            localStorage.setItem('menus', JSON.stringify(listmenus));
                            this.router.navigate(['dashboard']); // redirección a la pagina deseada cuando se logra el inicio de sesión
                        }, error => { console.log(error) })
                    } else {
                        console.log('login falso');
                    }
                },
                error => {
                    this.toastr.error(environment.INVALID_LOGIN, 'Error');
                }
            );
        }
    }

    private _menus(menus) {
        let listmenus: Menu[] = [];
        let id = 1;
        menus.listModule.forEach(module => {
            const moduleid = id;
             listmenus.push( new Menu (id, module.name, null, null, 'tachometer', null, true, 0));
             const subMenus = this._subMenus(listmenus, id, module, moduleid);
             listmenus = subMenus.listmenus;
             id = subMenus.id;
             id++;
        });
        return listmenus;
    }

    private _subMenus(listmenus, id, module, moduleid) {
        module.listResource.forEach(resource => {
            const resourceid = id;
            id++;
            listmenus.push( new Menu (id, resource.name,resource.menu?null: module.baseUrl+resource.uri, null, resource.iconImage?resource.iconImage:'tachometer', null, resource.menu, moduleid));
            if (resource.menu === true) {
                const resourceid1 = id;
                id++;
                resource.listResource.forEach(resource2 => {
                    listmenus.push( new Menu (id, resource2.name, resource2.menu?null:module.baseUrl+resource2.uri, null, resource2.iconImage?resource2.iconImage:'tachometer', null, resource2.menu, resourceid1));
                    if (resource2.menu === true) {
                        const resourceid2 = id;
                        id++;
                        resource2.listResource.forEach(resource3 => {
                            listmenus.push( new Menu (id, resource3.name,module.baseUrl+resource3.uri, null, resource3.iconImage?resource3.iconImage:'tachometer', null, resource3.menu, resourceid2));
                        });
                    }
                    id++;
                });
            }
            id++;
        });
        return {listmenus: listmenus, id: id};
    }

    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}
