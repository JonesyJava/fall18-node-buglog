let id = 100
module.exports = class Bug {
  constructor(message, creator) {
    if (!message || !creator) { throw new Error("Invalid bug creation must provide message and creator name") }
    this._id = id
    this.created = Date.now()
    this.message = message
    this.creator = creator
    id++
  }
}