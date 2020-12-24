var dragDrop = require('drag-drop')

module.exports = function(callback) {
  dragDrop("body", function(files) {
    const buffers = []
    let pending = 0
    files.forEach((f) => {
      pending++
      const reader = new FileReader()
      reader.onload = () => {
        const fileDef = {
          name: f.name,
          fullPath: f.fullPath,
          type: f.type,
          dataURI: reader.result
        }
        buffers.push(fileDef)
        pending--
        if (pending == 0) finish()	
      }
      reader.readAsDataURL(f)
    })

    function finish() {
      callback(buffers);
    }

  })
}

