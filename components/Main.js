import { Component } from 'react'
import Card from './Card'
import request from 'superagent'
import moment from 'moment'

export default class Main extends Component {

  readyToUpload = false
  state = {
    testItems: [],
    currentItemIndex: 0,
    currentId: 0,
  }

  componentDidMount() {
    if (typeof window == 'undefined') {
      return
    }

    request.get('/api/db/get').query({ path: '/' }).then((res) => {
      const { data } = res.body
      if (Object.keys(data).length) {
        this.setState(data)
      } else {
        this.uploadData()
      }
      this.readyToUpload = true
    })
  }

  componentDidUpdate() {
    if (this.readyToUpload) {
      this.uploadData()
    }
  }

  uploadData() {
    request.post('/api/db/push').query({ path: '/' }).send(this.state).then(() => { })
  }

  addTestItem() {
    const { testItems, currentId } = this.state
    const newId = currentId + 1
    this.setState({
      testItems: [{
        id: newId,
        name: `test ${newId} ${moment().format('YYYYMMDD_HHmmss')}`,
        editing: true,
      }].concat(testItems),
      currentId: newId,
      currentItemIndex: 0,
    })
  }

  updateItem(item, index) {
    const { testItems, } = this.state
    const tmp = [...testItems]
    tmp[index] = item
    this.setState({
      testItems: tmp,
    })
  }

  removeItem(index) {
    const { testItems, } = this.state
    const tmp = [...testItems]
    tmp.splice(index, 1)
    this.setState({
      testItems: tmp,
    })
  }

  render() {
    const { testItems, currentItemIndex, } = this.state
    const currentItem = testItems.length && testItems[currentItemIndex]
    return (<div className="row" style={{ minHeight: '600px' }}>
      <div className="col s12 m4 l3">
        <div className="collection">
          <a onClick={() => this.addTestItem()} className="collection-item"><i className="material-icons">add</i></a>
          {testItems.map((item, i) => {
            const className = `collection-item ${i == currentItemIndex ? 'active' : ''}`
            return (<a key={item.id} onClick={() => this.setState({ currentItemIndex: i })} className={className}>{item.id}#{item.name}</a>)
          })}
        </div>
      </div>
      <div className="col s12 m8 l9">
        {currentItem ? (<Card
          item={currentItem}
          update={(item) => this.updateItem(item, currentItemIndex)}
          remove={() => this.removeItem(currentItemIndex)}
        />) : (<div>
          <p>select from left list or ... | 从左侧列表选择测试用例或...</p>
          <a onClick={() => this.addTestItem()} className="waves-effect waves-light btn"><i className="material-icons right">add</i>add test|添加新用例</a>
        </div>)}
      </div>
    </div>)
  }
}