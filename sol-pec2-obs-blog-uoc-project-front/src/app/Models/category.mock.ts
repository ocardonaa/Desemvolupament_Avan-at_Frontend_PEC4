import { CategoryDTO } from "./category.dto";

export const CATEGORIES_MOCK: CategoryDTO[] = [
    {
        categoryId: '1',
        title: 'category_mock1',
        description: 'category_mock_description1',
        css_color: '#0000FF',
        userId: '2',
    },
    {
        categoryId: '2',
        title: 'category_mock2',
        description: 'category_mock_description2',
        css_color: '#00FF00',
        userId: '1',
    },
    {
        categoryId: '3',
        title: 'category_mock3',
        description: 'category_mock_description3',
        css_color: '#FF0000',
        userId: '1',
    },
]