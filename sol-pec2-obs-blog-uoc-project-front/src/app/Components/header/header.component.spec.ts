import { Router } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderMenusService } from "src/app/Services/header-menus.service";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { BehaviorSubject } from "rxjs";
import { HeaderMenus } from "src/app/Models/header-menus.dto";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

describe('HeaderComponent', () => {
    let header: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;
    let spy: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                Router
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        header = fixture.componentInstance;
        router = TestBed.inject(Router);
        spy = spyOn(router, 'navigateByUrl');
    });

    it('should create a header instance', () => {
        expect(header).toBeTruthy();
    });

    it('should redirect to home', () => {
        header.navigateTo('home');
        expect(spy).toHaveBeenCalledWith('home');
    });

    it('should redirect to dashboard', () => {
        header.navigateTo('dashboard');
        expect(spy).toHaveBeenCalledWith('dashboard');
    });

    it('should redirect to login', () => {
        header.navigateTo('login');
        expect(spy).toHaveBeenCalledWith('login');
    });

    it('should redirect to register', () => {
        header.navigateTo('register');
        expect(spy).toHaveBeenCalledWith('register');
    });

    it('should redirect to admin posts', () => {
        header.navigateTo('adminPosts');
        expect(spy).toHaveBeenCalledWith('adminPosts');
    });

    it('should redirect to admin categories', () => {
        header.navigateTo('adminCategories');
        expect(spy).toHaveBeenCalledWith('adminCategories');
    });

    it('should redirect to profile', () => {
        header.navigateTo('profile');
        expect(spy).toHaveBeenCalledWith('profile');
    });
});

describe('HeaderComponent Behaviour Ex5', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let headerMenusServiceSpy: jasmine.SpyObj<HeaderMenusService>;
    let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let headerMenusSubject: BehaviorSubject<HeaderMenus>;

    beforeEach(async () => {
        headerMenusSubject = new BehaviorSubject<HeaderMenus>({
            showAuthSection: false,
            showNoAuthSection: true,
        });

        headerMenusServiceSpy = jasmine.createSpyObj('HeaderMenusService', [], {
            headerManagement: headerMenusSubject,
        });

        localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['remove']);
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: HeaderMenusService, useValue: headerMenusServiceSpy },
                { provide: LocalStorageService, useValue: localStorageServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display authenticated menu items when user is authenticated', () => {
        const authHeaderInfo: HeaderMenus = {
            showAuthSection: true,
            showNoAuthSection: false,
        };
        headerMenusSubject.next(authHeaderInfo);
        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const buttonTexts = buttons.map(btn => btn.nativeElement.innerText.trim());

        expect(buttonTexts).toContain('Dashboard');
        expect(buttonTexts).toContain('Home');
        expect(buttonTexts).toContain('Admin posts');
        expect(buttonTexts).toContain('Admin categories');
        expect(buttonTexts).toContain('Profile');
        expect(buttonTexts).toContain('Logout');

        expect(buttonTexts).not.toContain('Login');
        expect(buttonTexts).not.toContain('Register');
    });

    it('should display non-authenticated menu items when user is not authenticated', () => {
        const noAuthHeaderInfo: HeaderMenus = {
            showAuthSection: false,
            showNoAuthSection: true,
        };
        headerMenusSubject.next(noAuthHeaderInfo);
        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const buttonTexts = buttons.map(btn => btn.nativeElement.innerText.trim());

        expect(buttonTexts).toContain('Dashboard');
        expect(buttonTexts).toContain('Home');
        expect(buttonTexts).toContain('Login');
        expect(buttonTexts).toContain('Register');

        expect(buttonTexts).not.toContain('Admin posts');
        expect(buttonTexts).not.toContain('Admin categories');
        expect(buttonTexts).not.toContain('Profile');
        expect(buttonTexts).not.toContain('Logout');
    });
});