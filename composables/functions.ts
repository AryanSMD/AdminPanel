export function getRole(val: number): string {
    const role = [
        {
            key: 0,
            value: 'Admin',
        },
        {
            key: 1,
            value: 'Teacher',
        },
    ]

    return role.filter(e => e.key === val)[0].value;
}

export function getStatus(val: number): string {
    const status = [
        {
            key: 0,
            value: 'Active',
        },
        {
            key: 1,
            value: 'Deactive',
        },
    ]
    
    return status.filter(e => e.key === val)[0].value;
}

export function getTime(date: string|Date): string {
    const newDate = new Date(date);
    const pad = (num: number) => `${ num < 10 ? '0' : '' }${ num }`;

    return pad(newDate.getFullYear()) +
        '-' + pad(newDate.getMonth() + 1) +
        '-' + pad(newDate.getDate());
}