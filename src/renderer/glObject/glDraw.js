export class glDraw {
    constructor(mode, offset, count, type) {
        Object.assign(this, {
            _mode: mode,
            _offset: offset,
            _count: count,
            _type: type,
        });
    }

    apply(gl) {
        gl.drawArrays(this._mode, this._offset, this._count);
    }
}

export class glDrawWithIndex extends glDraw {
    constructor(mode, offset, count, type, ibo) {
        super(mode, offset, count, type);
        this._ibo = ibo;
    }

    apply(gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._ibo);
        gl.drawElements(this._mode, this._count, this._type, this._offset);
    }
}
