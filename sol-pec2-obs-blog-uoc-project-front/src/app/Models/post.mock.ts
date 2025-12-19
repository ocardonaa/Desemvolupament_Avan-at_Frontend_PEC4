import { CATEGORIES_MOCK } from "./category.mock";
import { PostDTO } from "./post.dto";

export const POSTS_MOCK: PostDTO[] = [
    {
        postId: '1',
        title: 'example_title_post1',
        description: 'example_description_post2',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date,
        categories: [CATEGORIES_MOCK[0], CATEGORIES_MOCK[1]],
        userId: '1',
        userAlias: 'Manolo',
    },
    {
        postId: '2',
        title: 'example_title_post2',
        description: 'example_description_post2',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date,
        categories: [CATEGORIES_MOCK[0], CATEGORIES_MOCK[2]],
        userId: '1',
        userAlias: 'Manolo',
    },
    {
        postId: '3',
        title: 'example_title_post3',
        description: 'example_description_post3',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date,
        categories: [CATEGORIES_MOCK[1], CATEGORIES_MOCK[2]],
        userId: '1',
        userAlias: 'Manolo',
    },
]