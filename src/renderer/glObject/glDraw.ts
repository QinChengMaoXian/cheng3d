export class glDraw {
    constructor(public _mode: number, public _offset: number, public _count: number, public _type: number) {
    }

    public apply(gl) {
        gl.drawArrays(this._mode, this._offset, this._count);
    }
}

export class glDrawWithIndex extends glDraw {
    constructor(mode: number, offset: number, count: number, type: number, public _ibo: number) {
        super(mode, offset, count, type);
    }

    public apply(gl) {
        gl.drawElements(this._mode, this._count, this._type, this._offset);
    }
}
