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

interface IAwbAttrProps {
    value: IAwbCtLimitAttr
    onChange(value: IAwbCtLimitAttr): void
}
export const AwbCtLimitAttr: React.SFC<IAwbAttrProps> = (props) => {
    const send = (new_field) => {
        let value = Object.assign(props.value, new_field)
        props.onChange(value)
    }
    return (
        <div>
            <div>
                bEnable
                <Checkbox checked={props.value.bEnable} onChange={e => send({bEnable: e.target.checked})} />
            </div>
            <div>
                enOpType
                <OpTypeEditor value={props.value.enOpType} onChange={enOpType => send({enOpType})} />
            </div>
            <div>
                u16HighRgLimit
                <SliderValueU16 value={props.value.u16HighRgLimit} onChange={u16HighRgLimit => send({u16HighRgLimit})} />
            </div>
            <div>
                u16HighBgLimit
                <SliderValueU16 value={props.value.u16HighBgLimit} onChange={u16HighBgLimit => send({u16HighBgLimit})} />
            </div>
            <div>
                u16LowRgLimit
                <SliderValueU16 value={props.value.u16LowRgLimit} onChange={u16LowRgLimit => send({u16LowRgLimit})} />
            </div>
            <div>
                u16LowBgLimit
                <SliderValueU16 value={props.value.u16LowBgLimit} onChange={u16LowBgLimit => send({u16LowBgLimit})} />
            </div>
        </div>
    )
}
