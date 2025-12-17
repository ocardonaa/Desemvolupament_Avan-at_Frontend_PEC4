import { TestBed } from "@angular/core/testing";
import { CategoryService, deleteResponse } from "./category.service";
import { CATEGORIES_MOCK } from "../Models/category.mock";
import { CategoryDTO } from "../Models/category.dto";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService],
        });
        categoryService = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should return categories by userId and use GET', () => {
        const userId = '1';
        const expectedCategories: CategoryDTO[] = CATEGORIES_MOCK.filter(cat => cat.userId === userId);
        categoryService.getCategoriesByUserId(userId).subscribe((categories) => {
            expect(categories).toEqual(expectedCategories);
        });
        const req = httpMock.expectOne(`http://localhost:3000/users/categories/${userId}`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedCategories);
    });

    it('should create a category use POST', () => {
        const newCategory: CategoryDTO = {
            title: 'example title',
            description: 'example description',
            css_color: '#000000',
            userId: '1',
            categoryId: '111'
        }
        const category: CategoryDTO = { ...newCategory };
        categoryService.createCategory(category).subscribe((result) => {
            expect(result).toBe(category);
        });
        const req = httpMock.expectOne(`http://localhost:3000/categories`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newCategory);
        req.flush(category);
    });

    it('should return categories by Id and use GET', () => {
        const categoryId = '1';
        const category: CategoryDTO = CATEGORIES_MOCK.find(cat => cat.categoryId === categoryId)!;
        categoryService.getCategoryById(categoryId).subscribe((res) => {
            expect(res).toEqual(category);
        });
        const req = httpMock.expectOne(`http://localhost:3000/categories/${categoryId}`);
        expect(req.request.method).toBe('GET');
        req.flush(category);
    });

    it('should update the category and use PUT', () => {
        const categoryId = '1';
        const newCategory: CategoryDTO = {
            title: 'new title',
            description: 'new description',
            css_color: '#FFFFFF',
            userId: '1',
            categoryId: '111'
        }
        const category: CategoryDTO = { ...newCategory };
        categoryService.updateCategory(categoryId, category).subscribe((res) => {
            expect(res).toEqual(category);
        });
        const req = httpMock.expectOne(`http://localhost:3000/categories/${categoryId}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(newCategory);
        req.flush(category);
    });

    it('should delete the category and use DELETE', () => {
        const categoryId = '1';
        const expectedDeleteResponse: deleteResponse = { affected: 1 };
        categoryService.deleteCategory(categoryId).subscribe((res) => {
            expect(res).toEqual(expectedDeleteResponse);
        });
        const req = httpMock.expectOne(`http://localhost:3000/categories/${categoryId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(expectedDeleteResponse);
    });
});