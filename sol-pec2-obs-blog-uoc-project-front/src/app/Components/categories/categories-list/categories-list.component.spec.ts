import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CategoriesListComponent } from "./categories-list.component";
import { CategoryService } from "src/app/Services/category.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";
import { CATEGORIES_MOCK } from "src/app/Models/category.mock";
import { of } from "rxjs";


describe('CategoriesListComponent Ex4', () => {
    let component: CategoriesListComponent;
    let fixture: ComponentFixture<CategoriesListComponent>;
    let categoriesServiceSpy: jasmine.SpyObj<CategoryService>;
    let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
    let sharedServiceSpy: jasmine.SpyObj<SharedService>;
    let routerSpy: jasmine.SpyObj<Router>;

    const mockUserId = '1';

    beforeEach(async () => {
        categoriesServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoriesByUserId']);
        localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);
        sharedServiceSpy = jasmine.createSpyObj('SharedService', ['errorLog']);
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        await TestBed.configureTestingModule({
            declarations: [CategoriesListComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: CategoryService, useValue: categoriesServiceSpy },
                { provide: LocalStorageService, useValue: localStorageServiceSpy },
                { provide: SharedService, useValue: sharedServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        }).compileComponents();

        localStorageServiceSpy.get.and.returnValue(mockUserId);
        categoriesServiceSpy.getCategoriesByUserId.and.returnValue(of(CATEGORIES_MOCK));

        fixture = TestBed.createComponent(CategoriesListComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getCategoriesByUserId and assign the response to categories', fakeAsync(() => {

        tick(); // deberiamos usar loadCategories pero es privado, asi que hacemos esto para terminar la resolución del observable

        expect(localStorageServiceSpy.get).toHaveBeenCalledWith('user_id');
        expect(categoriesServiceSpy.getCategoriesByUserId).toHaveBeenCalledWith(mockUserId); // se lanza la llamada a getCategoriesByUserId

        expect(component.categories).toEqual(CATEGORIES_MOCK); // la respuesta es la esperada
    }));

    it('should navigate to /user/category/ when creating a category', () => {
        component.createCategory();
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/category/');
    });

    it('should navigate to /user/category/{categoryId} when updating a category', () => {
        const categoryId = 'testId';
        component.updateCategory(categoryId);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/category/' + categoryId);
    });
});