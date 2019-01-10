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


export interface IAwbLumHistgramAttrProps {
    value: IAwbLumHistgramAttr
    onChange(value: IAwbLumHistgramAttr): void
}
export class AwbLumHistgramAttr extends React.Component<IAwbLumHistgramAttrProps> {
    send = (new_field) => {
        let new_props = Object.assign(this.props.value, new_field)
        this.props.onChange(new_props)
    }
    render() {
        return (
            <div>
                Defines the AWB attributes of the ISP.
                <div>
                    bEnable
                    <Checkbox checked={this.props.value.bEnable} onChange={e => this.send({bEnable: e.target.checked})} />
                </div>
                <div>
                    enOpType
                    <OpTypeEditor value={this.props.value.enOpType} onChange={enOpType => this.send({enOpType})} />
                </div>
                <div>
                    au8HistThresh
                    <Graph unsigned pow={8} value={this.props.value.au8HistThresh} onChange={au8HistThresh => this.send({au8HistThresh})} />
                </div>
                <div>
                    au16HistWt
                    <Graph unsigned pow={16} value={this.props.value.au16HistWt} onChange={au16HistWt => this.send({au16HistWt})} />
                </div>
            </div>
        );
    }
}