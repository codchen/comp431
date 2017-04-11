export const url = 'https://hw7-backend.herokuapp.com'

// fetch wrapper that can also handle form data
export const resource = (method, endpoint, payload, formData = false) => {
    const options = { method, credentials: 'include' }
    if (!formData) {
        options.headers = { 'Content-Type': 'application/json' }
    }
    if (payload) {
        if (formData) {
            const fd = new FormData()
            fd.append('text', payload.message)
            fd.append('image', payload.file)
            options.body = fd
        } else {
            options.body = JSON.stringify(payload)
        }
    }

    return fetch(`${url}/${endpoint}`, options)
        .then((r) => {
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json()
                } else {
                    return r.text()
                }
            } else {
                return r.text()
            }
        })
        .then((payload) => {
            if (typeof payload === 'string' && payload !== 'OK') {
                throw new Error(payload)
            } else {
                return payload
            }
        })
}
