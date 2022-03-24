class ApiModel {
    constructor() {
        this.api = new API()
        console.log('ApiModel.constructor()')
    }

    async getUsers() {
        try {
            return await this.api.getUsers()
        } catch {
            return undefined
        }
    }
}