import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Dashboard', '/dashboard', null, 'tachometer', null, false, 0),
    // new Menu (1, 'Dashboard', null, null, 'tachometer', null, true, 0),
    // new Menu(2,  'interno', '/dashboard', null, 'tachometer', null, false, 1)
]

export const horizontalMenuItems = [ 
    new Menu (1, 'Dashboard', '/pages/dashboard', null, 'tachometer', null, false, 0),
    new Menu (40, 'Pages', null, null, 'file-text-o', null, true, 0),
    new Menu (43, 'Login', '/login', null, 'sign-in', null, false, 0),    
    new Menu (44, 'Register', '/register', null, 'registered', null, false, 0),
    new Menu (45, 'Blank', '/pages/blank', null, 'file-o', null, false, 40),
    new Menu (46, 'Error', '/pagenotfound', null, 'exclamation-circle', null, false, 40),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'external-link', '_blank', false, 0)
]