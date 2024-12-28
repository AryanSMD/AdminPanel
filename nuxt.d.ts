interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profileImageId: string,
    profileImageUrl: string,
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
    imageId: string|null,
    imageUrl: string,
}


interface Student {
    id: string,
    studentId: string,
    email: string,
    mobile: string,
    firstName: string,
    lastName: string,
    nickName: string,
    fatherName: string,
    address: {
      country: string,
      city: string,
      state: string,
      postcode: string,
      streetAddress: string,
      latitude: number,
      longitude: number
    },
    profileImageId: string|null,
    profileImageUrl: string|null,
    dateOfBirth: string|Date,
    gender: number,
    nativeLanguageId: string
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