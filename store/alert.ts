import Swal from "sweetalert2";

interface States {
    bgColor: string|null,
    textColor: string|null,
}

interface showAlertInput {
    type: string,
    msg: string,
    func(): any,
}

export const useAlert = defineStore('useAlert', {
    state: (): States => ({
        bgColor: null,
        textColor: null,
    }),
    actions: {
        showAlert({ type, msg, func }: showAlertInput): void {
            defaults().getDarkMode ?
                (this.bgColor = '#292F45' , this.textColor = 'white') :
                (this.bgColor = 'white' , this.textColor = '#3a4045')

            const toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 5000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            })

            if (type === 'error') {
                toast.fire({
                    icon: "error",
                    background: "#b91c1c",
                    color: "white",
                    iconColor: 'white',
                    title: msg,
                });

            } else if (type === 'welcome') {
                toast.fire({
                    icon: "success",
                    background: "#2B5DFF",
                    color: "white",
                    iconColor: 'white',
                    title: msg,
                });

            } else if (type === 'success') {
                toast.fire({
                    icon: "success",
                    background: "#15803d",
                    color: "white",
                    iconColor: 'white',
                    title: msg,
                });

            } else if (type === 'info') {
                toast.fire({
                    icon: "info",
                    background: "#0891b2",
                    color: "white",
                    iconColor: 'white',
                    title: msg,
                });

            } else if (type === 'delete') {
                Swal.fire({
                    // width: "auto",
                    title: "Warning!",
                    text: 'Are you sure, Delete ' + msg + '?',
                    icon: 'warning',
                    background: this.bgColor,
                    color: this.textColor,
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    confirmButtonColor: "#b91c1c",
                    cancelButtonColor: "var(--grey)",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        func();
                    }
                })
            }
        },
    },
})