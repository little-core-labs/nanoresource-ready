const Resource = require('nanoresource')
const ready = require('./')

const resource = new Resource()
const opening = new Resource()
const opened = new Resource()
const mixed = ready.mixin(new Resource())

opening.open()

ready(opening, { opening: true }, (err) => {
  console.log('opening ready', opening.opening)
})

opened.open(() => {
  ready(opened, (err) => {
    console.log('opened ready')
  })
})

// `ready()` will call `resource.open()`
ready(resource, (err) => {
  console.log('resource ready')
})

mixed.ready((err) => {
  console.log('mixed ready')
})
