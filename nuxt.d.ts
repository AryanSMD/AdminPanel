interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string|Date,
    role: number,
    status: number,
}

interface Course {
    id: string,
    name: string,
    description: string,
    price: number,
    isDisabled: boolean,
    languageLearningId: string,
    categoryId: string,
    audienceId: string,
    imageUrl: string,
}

interface Audience {
    id: string,
    name: string,
    description: string,
    isDisabled: boolean,
}

interface Category {
    id: string,
    name: string,
    description: string,
    isDisabled: boolean,
}

interface Language {
    id: string,
    name: string,
    code: string,
    slug: string,
    isDisabled: boolean,
}