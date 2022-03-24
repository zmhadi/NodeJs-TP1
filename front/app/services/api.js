class API {
    constructor() {
        this.baseurl = "localhost:3000"
        this.myHeaders = new Headers(undefined)
        console.log('API.constructor()')
    }

    myFetch(url) {
        return new Promise(((resolve, reject) => {
            fetch(`${this.baseurl}/${url}`, {headers: this.myHeaders})
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.json())
                    } else {
                        reject(response.status)
                    }
                })
                .catch(err => reject(err))
        }))
    }

    getUsers() {
        return this.myFetch(`users`)
    }
}