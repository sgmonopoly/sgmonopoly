export default class Component {
    constructor(){}

    setState(obj = {}){
        let oldState = JSON.parse(JSON.stringify(this.state))
        let newState = JSON.parse(JSON.stringify(obj))
        this.state = {...oldState, ...newState}
    }

    getState(){
        return this.state
    }

    getSubComponent(){
        return this.subComponent
    }

    componentWillMount(){}
    render(){}
    componentDidMount(){}

}
