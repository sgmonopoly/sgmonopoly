'use strict'
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

    getSubComponent(componentName){
        if(!componentName){
            return this.subComponent
        }else{
            return this.subComponent[componentName]
        }

    }

    componentWillMount(){}
    render(){}
    componentDidMount(){}

}
