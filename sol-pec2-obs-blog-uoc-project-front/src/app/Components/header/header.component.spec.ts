import { Router } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

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