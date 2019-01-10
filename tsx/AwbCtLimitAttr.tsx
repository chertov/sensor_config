import * as React from 'react';
import { Checkbox, Radio } from 'antd';
import {OpType, OpTypeEditor} from './OpTypeEnum'
import { SliderValueU16 } from './slider';

export interface IAwbCtLimitAttr {
    bEnable: boolean
    enOpType: OpType
    u16HighRgLimit: number
    u16HighBgLimit: number
    u16LowRgLimit: number
    u16LowBgLimit: number
}
export const AwbCtLimitAttrDefault = () : IAwbCtLimitAttr => ({
    bEnable: true,
    enOpType: OpType.OP_TYPE_AUTO,
    u16HighRgLimit: 0,
    u16HighBgLimit: 0,
    u16LowRgLimit: 0,
    u16LowBgLimit: 0
})


export interface IAwbAttrProps {
    value: IAwbCtLimitAttr
    onChange(value: IAwbCtLimitAttr): void
}
export class AwbCtLimitAttr extends React.Component<IAwbAttrProps> {
    send = (new_field) => {
        let new_props = Object.assign(this.props.value, new_field)
        this.props.onChange(new_props)
    }
    render() {
        return (
            <div>
                <div>
                    bEnable
                    <Checkbox checked={this.props.value.bEnable} onChange={e => this.send({bEnable: e.target.checked})} />
                </div>
                <div>
                    enOpType
                    <OpTypeEditor value={this.props.value.enOpType} onChange={enOpType => this.send({enOpType})} />
                </div>
                <div>
                    u16HighRgLimit
                    <SliderValueU16 value={this.props.value.u16HighRgLimit} onChange={u16HighRgLimit => this.send({u16HighRgLimit})} />
                </div>
                <div>
                    u16HighBgLimit
                    <SliderValueU16 value={this.props.value.u16HighBgLimit} onChange={u16HighBgLimit => this.send({u16HighBgLimit})} />
                </div>
                <div>
                    u16LowRgLimit
                    <SliderValueU16 value={this.props.value.u16LowRgLimit} onChange={u16LowRgLimit => this.send({u16LowRgLimit})} />
                </div>
                <div>
                    u16LowBgLimit
                    <SliderValueU16 value={this.props.value.u16LowBgLimit} onChange={u16LowBgLimit => this.send({u16LowBgLimit})} />
                </div>
            </div>
        );
    }
}