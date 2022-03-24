class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new ApiModel()
        this.displayUsers()
        console.log('IndexController.constructor()')
    }

    displayUsers() {
        const users = await this.model.getUsers()
        if (users !== undefined) {
            $("#container").innerText="eeeeee"
            console.log('yes')
        } 
        else {
            console.log('no')
            this.toast("errorLoading")
        }
    }

}

window.indexController = new IndexController()
