import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PostService } from "./post.service"
import { TestBed } from "@angular/core/testing";
import { POSTS_MOCK } from "../Models/post.mock";
import { PostDTO } from "../Models/post.dto";
import { CATEGORIES_MOCK } from "../Models/category.mock";
import { deleteResponse, updateResponse } from "./post.service";
import { NONE_TYPE } from "@angular/compiler";


describe('PostService', () => {
    let postService: PostService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService],
        });
        postService = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create a service instance', () => {
        expect(postService).toBeTruthy();
    });

    it('should return all the posts and use GET', () => {
        const initialLength = POSTS_MOCK.length;
        postService.getPosts().subscribe((posts) => {
            expect(posts.length).toEqual(initialLength);
            expect(posts).not.toBe(POSTS_MOCK);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts`);
        expect(req.request.method).toBe('GET');
    });

    it('should return all the posts by userId and use GET', () => {
        const userId = '1';
        const expectedPosts: PostDTO[] = POSTS_MOCK.filter(post => post.userId === userId);
        postService.getPostsByUserId(userId).subscribe((posts) => {
            expect(posts).toBe(expectedPosts);
        });
        const req = httpMock.expectOne(`http://localhost:3000/users/posts/${userId}`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedPosts);
    });

    it('should create a post and use POST', () => {
        const newPost: PostDTO = {
            title: 'example title',
            description: 'example description',
            userId: '1',
            num_likes: 0,
            num_dislikes: 0,
            postId: '9999',
            publication_date: new Date,
            categories: CATEGORIES_MOCK,
            userAlias: 'Manolo'
        }
        const post: PostDTO = { ...newPost };
        postService.createPost(post).subscribe((result) => {
            expect(result).toBe(post);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(newPost);
        req.flush(post);
    });

    it('should return posts by Id and use GET', () => {
        const postId = '1';
        const post: PostDTO = POSTS_MOCK.find(post => post.postId === postId)!;
        postService.getPostById(postId).subscribe((res) => {
            expect(res).toEqual(post);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
        expect(req.request.method).toBe('GET');
        req.flush(post);
    });

    it('should update the post and use PUT', () => {
        const postId = '1';
        const newPost: PostDTO = {
            title: 'example title',
            description: 'example description',
            userId: '1',
            num_likes: 0,
            num_dislikes: 0,
            postId: '9999',
            publication_date: new Date,
            categories: CATEGORIES_MOCK,
            userAlias: 'Manolo'
        }
        const post: PostDTO = { ...newPost };
        postService.updatePost(postId, post).subscribe((res) => {
            expect(res).toEqual(post);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(newPost);
        req.flush(post);
    });

    it('should delete the post and use DELETE', () => {
        const postId = '1';
        const expectedDeleteResponse: deleteResponse = { affected: 1 };
        postService.deletePost(postId).subscribe((res) => {
            expect(res).toEqual(expectedDeleteResponse);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts/${postId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(expectedDeleteResponse);
    });

    it('should like the post and use PUT', () => {
        const postId = '1';
        const expectedUpdateResponse: updateResponse = { affected: 1 };
        postService.likePost(postId).subscribe((res) => {
            expect(res).toEqual(expectedUpdateResponse);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts/like/${postId}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(NONE_TYPE);
        req.flush(expectedUpdateResponse);
    });

    it('should dislike the post and use PUT', () => {
        const postId = '1';
        const expectedUpdateResponse: updateResponse = { affected: 1 };
        postService.dislikePost(postId).subscribe((res) => {
            expect(res).toEqual(expectedUpdateResponse);
        });
        const req = httpMock.expectOne(`http://localhost:3000/posts/dislike/${postId}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(NONE_TYPE);
        req.flush(expectedUpdateResponse);
    });
});