const __icondir = 'assets/icons'

class Icon {
    constructor(name) {
        this._name = name
        this._src = `${__icondir}/${name}.svg`
    }

    set name(a) {
        throw "name is a `read-only` property"
    }
    get name() {
        return this._name
    }
    get src() {
        return this._src

    }
    set src(a) {
        throw "src is a `read-only` property"
    }
}