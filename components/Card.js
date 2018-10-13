import { Component } from 'react'
import request from 'superagent'
import CodeMode from './CodeMode'

export default class Card extends Component {

  removeFile() {
    const { item } = this.props
    const { file, uri } = item
    setTimeout(()=>{
      if (file) {
        request.delete('/api/file').query({
          uri,
        }).then(()=>{})
      }
    },500)    
  }

  render() {
    const { item = {}, update, remove } = this.props

    return (<div className="card">
      <CodeMode item={item} update={(item) => update(item)} />
      <div className="card-action">
        <a onClick={() => {
          this.removeFile()
          remove()
        }}>remove|删除</a>
      </div>
    </div>)
  }
}
