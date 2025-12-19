import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";
import { of } from "rxjs";
import { PostsListComponent } from "./posts-list.component";
import { PostService } from "src/app/Services/post.service";
import { POSTS_MOCK } from "src/app/Models/post.mock";


describe('CategoriesListComponent Ex4', () => {
    let component: PostsListComponent;
    let fixture: ComponentFixture<PostsListComponent>;
    let postsServiceSpy: jasmine.SpyObj<PostService>;
    let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
    let sharedServiceSpy: jasmine.SpyObj<SharedService>;
    let routerSpy: jasmine.SpyObj<Router>;

    const mockUserId = '1';

    beforeEach(async () => {
        postsServiceSpy = jasmine.createSpyObj('PostService', ['getPostsByUserId']);
        localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);
        sharedServiceSpy = jasmine.createSpyObj('SharedService', ['errorLog']);
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        await TestBed.configureTestingModule({
            declarations: [PostsListComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: PostService, useValue: postsServiceSpy },
                { provide: LocalStorageService, useValue: localStorageServiceSpy },
                { provide: SharedService, useValue: sharedServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        }).compileComponents();

        localStorageServiceSpy.get.and.returnValue(mockUserId);
        postsServiceSpy.getPostsByUserId.and.returnValue(of(POSTS_MOCK));

        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call getPostsByUserId and assign the response to posts', fakeAsync(() => {

        tick(); // deberiamos usar loadCategories pero es privado, asi que hacemos esto para terminar la resolución del observable

        expect(localStorageServiceSpy.get).toHaveBeenCalledWith('user_id');
        expect(postsServiceSpy.getPostsByUserId).toHaveBeenCalledWith(mockUserId); // se lanza la llamada a getCategoriesByUserId

        expect(component.posts).toEqual(POSTS_MOCK); // la respuesta es la esperada
    }));

    it('should navigate to /user/post/ when creating a post', () => {
        component.createPost();
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/post/');
    });

    it('should navigate to /user/post/{postId} when updating a post', () => {
        const postId = 'testId';
        component.updatePost(postId);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/user/post/' + postId);
    });
});