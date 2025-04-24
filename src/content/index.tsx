import { render } from 'preact'

import { Content } from './content'
import './style.css'

const div = document.createElement('div')
div.id = '__root'
document.body.appendChild(div)

const rootContainer = document.getElementById('__root')
if (!rootContainer) throw new Error("Can't find Content root element")

render(<Content />, rootContainer)
