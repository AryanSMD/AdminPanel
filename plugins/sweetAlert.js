import Swal from 'sweetalert2'

window.swal = window.$swal = Swal;

export default defineNuxtPlugin(async nuxtApp => {
    nuxtApp.provide(Swal)
})