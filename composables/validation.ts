import * as yup from 'yup'

export const validation =  {
    login: yup.object({
        name: yup.string().required('Enter Username'),
        password: yup.string().required('Enter password'),
    }),
    
    profile: yup.object({
        name: yup.string().required('Enter first name'),
        family: yup.string().required('Enter last name'),
        email: yup.string().email('email is not valid').required('enter email'),
        birthdate: yup.string().required('Enter birthdate'),
    }),

    addUser: yup.object({
        name: yup.string().required('Enter first name'),
        family: yup.string().required('Enter last name'),
        email: yup.string().email('email is not valid').required('enter email'),
        role: yup.string().required('Enter user role'),
        date: yup.string().required('Enter user birthdate'),
    }),

    addStudent: yup.object({
        studentId: yup.string().required('Enter student ID'),
        email: yup.string().email().required('Enter email'),
        mobile: yup.string().required('Enter phone number'),
        firstName: yup.string().required('Enter first name'),
        lastName: yup.string().required('Enter last name'),
        nickName: yup.string().required('Enter nickname'),
        fatherName: yup.string().required('Enter father name'),
        country: yup.string().required('Enter country'),
        city: yup.string().required('Enter city'),
        state: yup.string().required('Enter state'),
        postcode: yup.string().required('Enter post code'),
        streetAddress: yup.string().required('Enter street address'),
        dateOfBirth: yup.string().required('Enter birthdate'),
        gender: yup.string().required('Enter gender'),
        nativeLanguageId: yup.string().required('Enter native language')
    }),

    addAudience: yup.object({
        name: yup.string().required('Enter audience name'),
    }),

    addCategory: yup.object({
        name: yup.string().required('Enter category name'),
    }),

    addLanguage: yup.object({
        name: yup.string().required('Enter Language name'),
        code: yup.string().required('Enter Language code'),
        slug: yup.string().strict().uppercase().required('Enter Language slug'),
    }),

    addCourse: yup.object({
        name: yup.string().required('Enter name'),
        category: yup.string().required('Enter category'),
        audience: yup.string().required('Enter audience'),
        language: yup.string().required('Enter Language'),
        price: yup.string().required('Enter price'),
    }),
}