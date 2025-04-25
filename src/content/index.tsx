import { render } from 'preact'

import { Content } from './content'
import './style.css'

const div = document.createElement('div')
div.id = '__root'
document.body.appendChild(div)

const rootContainer = document.getElementById('__root')
if (!rootContainer) throw new Error("Can't find Content root element")

render(<Content />, rootContainer)

// function init() {
//   getKeywords().then((keywords) => {
//     if (keywords.length > 0) {
//       console.log('Keywords loaded, starting observation:', keywords)
//       // Initial processing of existing videos
//       observeVideosInDOM(keywords)

//       // Start observing DOM changes
//       observeDOMChanges(keywords)
//     }
//   })
// }

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', init)
// } else {
//   init()
// }
