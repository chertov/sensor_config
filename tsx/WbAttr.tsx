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

interface IWbAttrProps {
    value: IWbAttr
    onChange(value: IWbAttr): void
}
export const WbAttr: React.SFC<IWbAttrProps> = (props) => {
    const send = (new_field) => {
        let value = Object.assign(props.value, new_field)
        props.onChange(value)
    }
    return (
        <div>
            Defines the manual AWB attributes of the ISP.
            <div>
                bByPass <Checkbox checked={props.value.bByPass} onChange={e => send({bByPass: e.target.checked})} />
            </div>
            <div>
                enOpType
                Automatic/Manual WB switch.
                Defines the running status of the ISP module.
                <OpTypeEditor value={props.value.enOpType} onChange={enOpType => send({enOpType})} />
            </div>
            <div>
                Manual AWB parameter
                <MwbAttr value={props.value.stManual} onChange={(stManual) => send({stManual})} />
            </div>
            <div>
                AWB parameter
                <AwbAttr value={props.value.stAuto} onChange={(stAuto) => send({stAuto})} />
            </div>
        </div>
    )
}