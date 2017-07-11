import $ from 'jquery'

export default class Component {
    constructor(id){
        this.id = id
    }

    addToDom(){
        this.refresh()
    }

    setState(obj = {}){
        let oldState = JSON.parse(JSON.stringify(this.state))
        let newState = JSON.parse(JSON.stringify(obj))
        this.state = {...oldState, ...newState}
        this.refresh()
    }

    refresh(){
        $(`#${this.id}`).html(this.render())
    }
}
