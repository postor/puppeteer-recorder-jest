import { Component } from 'react'
import ImageMode from './ImageMode'
import CodeMode from './CodeMode'

export default class Card extends Component {
  render() {
    const { item = {}, update, remove } = this.props
    const { editing, code, name } = item
    const onlyCodeMode = !code || !name;

    let actions = []
    if (!onlyCodeMode) {
      actions.push(<a key={0} href="#">generate|生成截图</a>)
      actions.push(<a key={1} href="#">compare|对比测试</a>)
      if (editing) {
        actions.push(<a key={2} href="#">show image|显示图片</a>)
      }
    }
    if (!editing) {
      actions.push(<a key={3} href="#">edit code|编辑代码</a>)
    }
    if (!actions.length) {
      actions.push(<span key={4}><i className="material-icons">warning</i> copy puppeteer recorder code first|请先从puppeteer-recorder拷贝代码 </span>)
    }

    return (<div className="card">
      {(editing || onlyCodeMode) ? (<CodeMode item={item} update={(item) => update(item)} />) : (<ImageMode item={item} />)}
      <div className="card-action">
        {actions}
        <a onClick={() => remove()} className="right"><i className="material-icons">delete</i></a>
      </div>
    </div>)
  }
}
