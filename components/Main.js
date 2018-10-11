import { Component } from 'react'

export default class Main extends Component {

  testItems = []
  currentItemIndex = 0

  render() {
    return (<div className="row">
      <div className="col s12 m4 l3">
        <div className="collection">
          <a href="#!" className="collection-item"><i className="material-icons">add</i></a>
          <a href="#!" className="collection-item">Alvin</a>
          <a href="#!" className="collection-item active">Alvin</a>
          <a href="#!" className="collection-item">Alvin</a>
        </div>
      </div>
      <div className="col s12 m8 l9">
        <div className="card">
          <div className="card-image">
            <img src="/images/default.webp" />
            <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.          I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">update|更新</a>
            <a href="#">test|测试</a>
            <a href="#">code|代码</a>
            <a href="#" className="right"><i className="material-icons">delete</i></a>
          </div>
        </div>

      </div>
    </div>)
  }
}