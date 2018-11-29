import { Component, ViewEncapsulation, HostListener, ElementRef  } from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { Spinkit } from 'ng-http-loader';

import { UserIdleService } from 'angular-user-idle';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogoutService } from './services/logout.service';
import { environment } from '../environments/environment';
import { RefreshTokenService } from './services/refresh-token.service';

import { setTheme } from 'ngx-bootstrap/utils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public spinkit = Spinkit;
    public settings: Settings;
    public idle: boolean;

    constructor(
        public appSettings: AppSettings,
        private userIdle: UserIdleService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _toastr: ToastrService,
        private _elementRef: ElementRef,
        private logoutService: LogoutService,
        private _refreshTokenService: RefreshTokenService
    ) {
        this.settings = this.appSettings.settings;
        this.idle = false;
        setTheme('bs4');
    }

    /**
     *
     */
    ngOnInit() {
        if (environment.production === true) {

            /**
             * @description
             * Start idle
             */
            this.userIdle.startWatching();
        }
        // this.userIdle.ping$.subscribe(() => console.log("PING"));

        /**
         *
         */
        this.userIdle.onTimerStart().subscribe(count => console.log(count));

        /**
         * @description
         * When idle time out
         */
        this.userIdle.onTimeout().subscribe(() =>
            this.redirect()
        );

        /**
         * @description
         * Remove ng-version="*.0.0"
         */
        this._elementRef.nativeElement.removeAttribute('ng-version');
        /**
         * @description
         * Set new token to browser's local storage
         */
        this._refreshTokenService.setNewToken();
    }

    /**
     * ->
     */
    stop() {
        this.userIdle.stopTimer();
    }

    /**
     *  ->
     */
    stopWatching() {
        this.userIdle.stopWatching();
    }

    /**
     *  ->
     */
    startWatching() {
        this.userIdle.startWatching();
    }

    /**
     *
     */
    restart() {
        this.userIdle.resetTimer();
    }

    /**
     * @description
     * Redirect to login in case of
     * user idle
     */
    redirect() {
        if (this._router.url !== '/login') {
            this.logoutService.logOut().subscribe(
                data => {
                    this.idle = true;
                    this._toastr.info('Se ha redirigido a el login por motivos de seguridad', 'Información', {
                        disableTimeOut: true
                    });
                    // console.log(data);
                    this._router.navigate(['/login']);
                    localStorage.removeItem('menus');
                    localStorage.removeItem('token');
                    // localStorage.removeItem('tokenLife');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('logout');
                    localStorage.setItem('logout', 'yes');

                    console.log(' logout for security options')
                },
                error => {
                    this._router.navigate(['/login']);
                    /**
                     * in server error
                     */
                    console.log({
                        message: 'cannot logout'
                    });
            });
        }
    }
    /**
     * @description
     * detect user interaction with the web
     * and restart idle timer
     */
    @HostListener('click', ['$event']) onClick() {
        this.restart();
    }

    /**
     * @description
     * detect user interaction with the web
     * and restart idle timer
     */
    @HostListener('mouseover', ['$event']) onHover() {
        this.restart();
    }
}
