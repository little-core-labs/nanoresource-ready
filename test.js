const Resource = require('nanoresource')
const test = require('tape')

const ready = require('./')

test('ready(resouce[, opts], callback)', (t) => {
  t.plan(9)

  const resource = new Resource()
  const opening = new Resource()
  const opened = new Resource()

  ready(resource, (err) => {
    t.notOk(err)
    t.ok(resource.opened, 'resource ready')
  })

  opening.open()
  t.ok(opening.opening)

  opened.open((err) => {
    t.notOk(err)
    t.ok(opened.opened)
    ready(opened, (err) => {
      t.notOk(err)
      t.pass('opened ready')
    })
  })

  ready(opening, { opening: true }, (err) => {
    t.notOk(err)
    t.ok(opening.opening, 'ready when opening')
    //t.end()
  })
})

test('ready.mixin(resource)', (t) => {
  const resource = new Resource()
  ready.mixin(resource)
  resource.ready((err) => {
    t.notOk(err)
    t.ok(resource.opened)
    t.notOk(resource.opening)
    t.end()
  })
})

test('ready.mixin(resource) - fast opening', (t) => {
  const resource = new Resource()
  ready.mixin(resource)
  resource.open()
  resource.ready({ opening: true }, (err) => {
    t.notOk(err)
    t.notOk(resource.opened)
    t.not(resource.opening)
    t.end()
  })
})

test('ready(resource, callback) - after close', (t) => {
  const closed = new Resource()
  const closing = new Resource({
    close(callback) {
      process.nextTick(callback, null)
    }
  })

  closed.open(() => {
    closed.close(() => {
      ready(closed, (err) => {
        t.ok(err)
        closing.open(() => {
          closing.close()
          t.ok(closing.closing)
          ready(closing, (err) => {
            t.ok(err)
            t.end()
          })
        })
      })
    })
  })
})
