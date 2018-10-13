import { Component } from 'react'
import request from 'superagent'
import p2t from './utils/puppeteer2test'

export default class CodeMode extends Component {



  generateTestFile(code) {

  }

  update(item) {
    this.props.update(item)
    const { codeGenerated, id, name } = item
    if (codeGenerated) {
      request.put('/api/file').send({
        uri: `tests/${id}-${name}.test.js`,
        content: codeGenerated,
      }).then(res => {
        const { file,uri } = res.body
        if (file) {
          const { item } = this.props
          this.props.update({
            ...item,
            file,
            uri,
          })
        }
      })
    }
  }

  onCodeChange(code) {
    const { item } = this.props
    const { id, name } = item
    this.update({
      ...item,
      code,
      codeGenerated: p2t({
        id, name, code
      }),
    })
  }

  render() {
    const { item, } = this.props
    const { id, name, code, file, codeGenerated } = item

    return (<div>
      <div className="card-content">
        <span className="card-title" style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}>#{id}</span>
          <input value={name} onChange={(e) => this.update({
            ...item,
            name: e.target.value,
          })}
            style={{
              fontSize: '20px',
              paddingLeft: '60px',
            }}
          />
        </span>
        <p>code from puppeteer recorder|请填入puppeteer recorder生成的代码:</p>
        <textarea value={code}
          onInput={(e) => this.onCodeChange(e.target.value)}
          onBlur={(e) => this.onCodeChange(e.target.value)}
          style={{
            height: '20em',
          }}
        />
        <div>
          <p>code for test file: {file} {!file&&(<a onClick={()=>this.update(item)}>generate|生成</a>)}</p>
          <textarea value={codeGenerated} style={{
            height: '20em',
          }} />
        </div>
      </div>
    </div>)
  }
}