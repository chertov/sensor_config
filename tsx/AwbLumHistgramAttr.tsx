import * as React from 'react'
import { Checkbox } from 'antd'
import { OpType, OpTypeEditor } from './OpTypeEnum'
import { Graph } from './graph';

export interface IAwbLumHistgramAttr {
    bEnable: boolean
    enOpType: OpType
    au8HistThresh: Array<number>    // u8[6]
    au16HistWt: Array<number>       // u16[6]
}
export const AwbLumHistgramAttrDefault = () : IAwbLumHistgramAttr => ({
    bEnable: true,
    enOpType: OpType.OP_TYPE_AUTO,
    au8HistThresh:  [0,0,0,0,0,0],
    au16HistWt:     [0,0,0,0,0,0],
})


interface IAwbLumHistgramAttrProps {
    value: IAwbLumHistgramAttr
    onChange(value: IAwbLumHistgramAttr): void
}
export const AwbLumHistgramAttr: React.SFC<IAwbLumHistgramAttrProps> = (props) => {
    const send = (new_field) => {
        let value = Object.assign(props.value, new_field)
        props.onChange(value)
    }
    return (
        <div>
            Defines the AWB attributes of the ISP.
            <div>
                bEnable
                <Checkbox checked={props.value.bEnable} onChange={e => send({bEnable: e.target.checked})} />
            </div>
            <div>
                enOpType
                <OpTypeEditor value={props.value.enOpType} onChange={enOpType => send({enOpType})} />
            </div>
            <div>
                au8HistThresh
                <Graph unsigned pow={8} value={props.value.au8HistThresh} onChange={au8HistThresh => send({au8HistThresh})} />
            </div>
            <div>
                au16HistWt
                <Graph unsigned pow={16} value={props.value.au16HistWt} onChange={au16HistWt => send({au16HistWt})} />
            </div>
        </div>
    )
}
