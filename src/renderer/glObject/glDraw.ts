export class glDraw {
    constructor(public _mode, public _offset, public _count, public _type) {
    }

    apply(gl) {
        gl.drawArrays(this._mode, this._offset, this._count);
    }
}

export class glDrawWithIndex extends glDraw {
    constructor(mode, offset, count, type, public _ibo) {
        super(mode, offset, count, type);
    }

    apply(gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.drawElements(this._mode, this._count, this._type, this._offset);
    }
}
