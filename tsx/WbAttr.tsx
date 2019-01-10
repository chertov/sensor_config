import * as React from 'react';
import { Checkbox } from 'antd';

import { OpType, OpTypeEditor } from './OpTypeEnum'
import { MwbAttr, IMwbAttr, MwbAttrDefault } from './MwbAttr';
import { AwbAttr, IAwbAttr, AwbAttrDefault } from './AwbAttr';

export interface IWbAttr {
    bByPass: boolean
    enOpType: OpType
    stManual: IMwbAttr
    stAuto: IAwbAttr
}
export const WbAttrDefault = () : IWbAttr => ({
    bByPass: true,
    enOpType: OpType.OP_TYPE_AUTO,
    stManual: MwbAttrDefault(),
    stAuto: AwbAttrDefault()
})

export interface IWbAttrProps {
    value: IWbAttr
    onChange(value: IWbAttr): void
}
export class WbAttr extends React.Component<IWbAttrProps> {
    send = (new_field) => {
        let new_props = Object.assign(this.props.value, new_field)
        this.props.onChange(new_props)
    }
    render() {
        return (
            <div>
                Defines the manual AWB attributes of the ISP.
                <div>
                    bByPass <Checkbox checked={this.props.value.bByPass} onChange={e => this.send({bByPass: e.target.checked})} />
                </div>
                <div>
                    enOpType
                    Automatic/Manual WB switch.
                    Defines the running status of the ISP module.
                    <OpTypeEditor value={this.props.value.enOpType} onChange={enOpType => this.send({enOpType})} />
                </div>
                <div>
                    Manual AWB parameter
                    <MwbAttr value={this.props.value.stManual} onChange={(stManual) => this.send({stManual})} />
                </div>
                <div>
                    AWB parameter
                    <AwbAttr value={this.props.value.stAuto} onChange={(stAuto) => this.send({stAuto})} />
                </div>
            </div>
        );
    }
}