/**
 * Created by yuanxiang on 12/28/17.
 */
import Component from './Component'
import $ from 'jquery'
export default class JqueryComponent extends Component{
  constructor(id){
    super()
    this.id = id
  }

  setState(obj = {}){
    super.setState(obj)
    this.refresh()
  }

  addToDom(){
    this.refresh()
  }

  refresh(){
    this.componentWillMount()
    $(`#${this.id}`).html(this.render())
    this.componentDidMount()
  }
}