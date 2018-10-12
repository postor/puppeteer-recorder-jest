
import template from 'lodash.template'

const templateString = `
const Differencify = require('differencify')
const launchConfig = require('../getLaunchConfig')()

describe('visualtest' + <%= id %>, () => {
  it('<%= name %>', async () => {
    const differencify = new Differencify()
    const target = differencify.init({ testName: '<%= name %>', chain: false });
    const browser = await target.launch(launchConfig)
    const page = await browser.newPage()
    try{

    //----your code start----
    <%= codes %>
    //----your code end----

    }catch(e){
      console.log(e)
    }
    const image = await page.screenshot({ fullPage: true })
    const result = await target.toMatchSnapshot(image)
    await page.close()
    await browser.close()
    await differencify.cleanup()
    expect(result).toBe(true)
  }, 60000)
})
`

const compiled = template(templateString)
export default (config) => {
  if (!config.code) {
    return ''
  }
  const lines = config.code.split('\n')
  if (lines.length < 6) {
    return ''
  }
  lines.length = lines.length - 2
  lines.splice(0, 4)
  const codes = lines.join('\n')

  return compiled({
    ...config,
    codes,
  })
}