export async function toast(msg: string, duration = 2000) {
    const toast = document.createElement('ion-toast')
    toast.message = msg
    toast.duration = duration

    document.body.appendChild(toast)
    return toast.present()
}