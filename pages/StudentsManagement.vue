<template>
    <div class="container" data-aos="fade-in" data-aos-duration="700">
        <button class="btn-add head" @click="showModal = true">
            Add Student
        </button>
        <div class="box">
            <div class="search-box">
                <div class="top">
                    <select v-model="filter.gender">
                        <option :value="null" selected disabled>Select Gender ...</option>
                        <option :value="0">{{ getGender(0) }}</option>
                        <option :value="1">{{ getGender(1) }}</option>
                    </select>
                </div>
                <div class="bottom">
                    <input type="text" placeholder="Search by name ..." v-model="filter.keyword">
                    <button class="btn-search" @click="search()"></button>
                    <button class="btn-reset" @click="clearFilters()"></button>
                </div>
            </div>
            <div class="card">
                <div class="header">
                    <svg xmlns="http://www.w3.org/2000/svg" class="svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                    </svg>
                    Students
                </div>
                <div class="import-file">
                    <input type="file" ref="importFile" accept=".csv, .pdf">
                    <button @click="$refs.importFile.click()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg">
                            <path d="M12 13v8"/>
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                            <path d="m8 17 4-4 4 4"/>
                        </svg>
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th class="img"></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th class="last"></th>
                            <th class="last"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in studentsApi().getStudents" :key="student.id">
                            <td class="img">
                                <img :src="setProfileImg(student)" ref="profImg">
                            </td>
                            <td>
                                {{ `${student.firstName} ${student.lastName}` }}
                            </td>
                            <td>{{ student.email }}</td>
                            <td>{{ getGender(student.gender) }}</td>
                            <td>{{ getTime(student.dateOfBirth) }}</td>
                            <td>
                                <button class="btn-edit" @click="edit(student.id)"></button>
                            </td>
                            <td>
                                <button class="btn-del" @click="removeStudent(student.id)"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    :numOfData="studentsApi().getTotal" 
                    :func="async () => await getStudents()"
                />
            </div>
        </div>
    </div>
    <transition name="modal">
        <div class="modal" v-if="showModal">
            <div class="card">
                <div class="header">Add Student</div>
                <svg class="close" @click="closeModal()"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
                <VeeForm as="div" :validation-schema="validation.addStudent"
                    v-slot="{ submitCount, errors, handleSubmit }">
                    <div class="form">
                        <div class="inputs">
                            <label>Name</label>
                            <VeeInput type="text" name="firstName" v-model="newStudent.firstName"
                                :class="errors.firstName && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.firstName }}</div>
                            <label>Nickname</label>
                            <VeeInput type="text" name="nickName" v-model="newStudent.nickName"
                                :class="errors.nickName && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.nickName }}</div>
                            <label>Father's Name</label>
                            <VeeInput type="text" name="fatherName" v-model="newStudent.fatherName"
                                :class="errors.fatherName && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.fatherName }}</div>
                            <label>Country</label>
                            <VeeInput type="text" name="country" v-model="newStudent.address.country"
                                :class="errors.country && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.country }}</div>
                            <label>State</label>
                            <VeeInput type="text" name="state" v-model="newStudent.address.state"
                                :class="errors.state && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.state }}</div>
                            <label>Student ID</label>
                            <VeeInput type="text" name="studentId" v-model="newStudent.studentId"
                                :class="errors.studentId && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.studentId }}</div>
                            <label>Gender</label>
                            <VeeInput name="gender" as="select" v-model="newStudent.gender"
                                :class="errors.gender && submitCount > 0 && 'input-err'">
                                <option :value="0">{{ getGender(0) }}</option>
                                <option :value="1">{{ getGender(1) }}</option>
                            </VeeInput>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.gender }}</div>
                        </div>
                        <div class="inputs">
                            <label>Family</label>
                            <VeeInput type="text" name="lastName" v-model="newStudent.lastName"
                                :class="errors.lastName && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.lastName }}</div>
                            <label>BirthDate</label>
                            <VeeInput type="date" name="dateOfBirth" v-model="newStudent.dateOfBirth"
                                :class="errors.dateOfBirth && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.dateOfBirth }}</div>
                            <label>Email</label>
                            <VeeInput type="email" name="email" v-model="newStudent.email"
                                :class="errors.email && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.email }}</div>
                            <label>City</label>
                            <VeeInput type="text" name="city" v-model="newStudent.address.city"
                                :class="errors.city && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.city }}</div>
                            <label>Post Code</label>
                            <VeeInput type="text" name="postcode" v-model="newStudent.address.postcode"
                                :class="errors.postcode && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.postcode }}</div>
                            <label>Native Language</label>
                            <VeeInput name="nativeLanguageId" class="hidden" v-model="newStudent.nativeLanguageId" />
                            <Dropdown
                                :placeHolder="''"
                                :list="languagesApi().getLanguages"
                                :listKey="'id'"
                                :listValue="'name'"
                                :valueProp="newStudent.nativeLanguageId"
                                @valueEmit="e => newStudent.nativeLanguageId = e"
                                :class="errors.nativeLanguageId && submitCount > 0 && 'input-err'"
                            >
                            </Dropdown>
                            <div class="label-err" v-if="submitCount > 0">{{ errors.nativeLanguageId }}</div>
                            <label>Phone Number</label>
                            <VeeInput type="text" name="mobile" v-model="newStudent.mobile"
                                :class="errors.mobile && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.mobile }}</div>
                        </div>
                        <div class="image-container">
                            <div class="image">
                                <img :src="setProfileImg(newStudent)" class="img" ref="previewImg">
                            </div>
                            <input type="file" style="display: none;" accept=".jpg, .jpeg"
                                ref="chooseFile"
                                @change="selectImg()"
                            >
                            <button class="btn-addImg" @click="$refs.chooseFile.click()">add image</button>
                        </div>
                        <div class="inputs xl:col-span-3">
                            <label>Street Address</label>
                            <VeeInput type="text" name="streetAddress" v-model="newStudent.address.streetAddress"
                                :class="errors.streetAddress && submitCount > 0 && 'input-err'" />
                            <div class="label-err" v-if="submitCount > 0">{{ errors.streetAddress }}</div>
                        </div>
                    </div>
                    <div class="footer">
                        <button class="btn-cancel" @click="closeModal()">Cancel</button>
                        <button class="btn-save" @click="handleSubmit($event, save)">Save</button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </transition>
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';


const showModal = ref <boolean> (false);
const editMode = ref <boolean> (false);
const searchMode = ref <boolean> (false);
const chooseFile = ref ();
const previewImg = ref ();
const filter = ref ({
    gender: null,
    keyword: null,
})
const newStudent = ref <Student> ({
    id: '',
    studentId: '',
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    nickName: '',
    fatherName: '',
    address: {
      country: '',
      city: '',
      state: '',
      postcode: '',
      streetAddress: '',
      latitude: 0,
      longitude: 0
    },
    profileImageId: null,
    profileImageUrl: '',
    dateOfBirth: '',
    gender: 0,
    nativeLanguageId: ''
});


function setProfileImg(student: Student): string {
    if (student.profileImageUrl) {
        const url = useRuntimeConfig().public.StorageURL + student.profileImageUrl;
        return url;
    } else {
        return defaults().deafultProfImg;
    }
}

async function selectImg(): Promise<void> {
    const file = chooseFile.value.files[0]; 
    // const response = await fileManagementApi().upload({
    //     properties: {
    //         fileName: file?.name,
    //         fileType: 0
    //     },
    //     file
    // })
    // if (response.status === 200) {
    //     newStudent.value.profileImageId = response.data.id;
    //     newStudent.value.profileImageUrl = response.data.url;
    //     if (editMode.value) {
    //         newStudent.value.dateOfBirth = setTime(newStudent.value.dateOfBirth);
    //         const updateRes = await studentsApi().updateStudent(newStudent.value);
    //         if (updateRes.status === 200) {
    //             previewImg.value.src = setProfileImg(newStudent.value);
    //             newStudent.value.dateOfBirth = getTime(newStudent.value.dateOfBirth);
    //             await getStudents();
    //         }

    //     } else {
    //         previewImg.value.src = setProfileImg(newStudent.value);
    //     }        
    // }
}

async function getStudents(): Promise<void> {
    if (!searchMode.value) {
        await studentsApi().searchStudents({
            page: defaults().pagination.currentPage,
            pageSize: defaults().pagination.dataPerPage 
        });
    }
}

async function search(): Promise<void> {
    searchMode.value = true;
    defaults().resetPagination();
    await studentsApi().searchStudents({
        page: defaults().pagination.currentPage,
        pageSize: defaults().pagination.dataPerPage,
        ...filter.value,
    });
    searchMode.value = false;
}

async function save(): Promise<void> {
    newStudent.value.dateOfBirth = setTime(newStudent.value.dateOfBirth);
    if (editMode.value) {
        const res = await studentsApi().updateStudent(newStudent.value);
        if (res.status === 200) {
            await getStudents();
            closeModal();
        }

    } else {
        const res = await studentsApi().createStudent(newStudent.value);
        if (res.status === 200) {
            await getStudents();
            closeModal();
        }
    }
}

function closeModal(): void {
    newStudent.value = {
        id: '',
        studentId: '',
        email: '',
        mobile: '',
        firstName: '',
        lastName: '',
        nickName: '',
        fatherName: '',
        address: {
        country: '',
        city: '',
        state: '',
        postcode: '',
        streetAddress: '',
        latitude: 0,
        longitude: 0
        },
        profileImageId: '',
        profileImageUrl: '',
        dateOfBirth: '',
        gender: 0,
        nativeLanguageId: ''
    };
    editMode.value && (editMode.value = false);
    showModal.value = false;
}

function edit(id: string): void {
    const selectedStudent = studentsApi().getStudents.filter(e => e.id === id)[0];
    newStudent.value = { ...selectedStudent };
    newStudent.value.dateOfBirth = getTime(newStudent.value.dateOfBirth);
    showModal.value = true;
    editMode.value = true;
}

async function removeStudent(id: string): Promise<void> {
    const selectedStudent = studentsApi().getStudents.filter(e => e.id === id)[0];
    const msg = `"${selectedStudent.firstName} ${selectedStudent.lastName}"`;
    alerts().showAlert({type:'delete', msg, func: async ()=>{
        await studentsApi().removeStudent(id);
        await getStudents();
    }})
}

function clearFilters(): void {
    filter.value = {
        gender: null,
        keyword: null,
    };
}


onBeforeMount(async () => {
    defaults().resetPagination();
    await getStudents();
    await languagesApi().searchLanguages({
        page: 0,
        pageSize: 0,
    })
})
</script>


<style scoped></style>