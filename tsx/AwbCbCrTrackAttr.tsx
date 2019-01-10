import * as React from 'react'
import { Checkbox } from 'antd'
import { Graph } from './graph'

export interface IAwbCbCrTrackAttr {
    bEnable: boolean
    au16CrMax: Array<number> // u16[ISP_AUTO_ISO_STENGTH_NUM];
    au16CrMin: Array<number> // u16[ISP_AUTO_ISO_STENGTH_NUM];
    au16CbMax: Array<number> // u16[ISP_AUTO_ISO_STENGTH_NUM];
    au16CbMin: Array<number> // u16[ISP_AUTO_ISO_STENGTH_NUM];
}

const ISP_AUTO_ISO_STENGTH_NUM = 16
export const AwbCbCrTrackAttrDefault = () : IAwbCbCrTrackAttr => {
    const arr = []
    for (let i = 0; i < ISP_AUTO_ISO_STENGTH_NUM; i++) arr.push(0)
    return {
        bEnable: true,
        au16CrMax: arr,
        au16CrMin: arr,
        au16CbMax: arr,
        au16CbMin: arr,
    };
}

interface IAwbCbCrTrackAttrProps {
    value: IAwbCbCrTrackAttr
    onChange(value: IAwbCbCrTrackAttr): void
}
export const AwbCbCrTrackAttr: React.SFC<IAwbCbCrTrackAttrProps> = (props) => {
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
                au16CrMax
                <Graph unsigned pow={16} value={props.value.au16CrMax} onChange={au16CrMax => send({au16CrMax})} />
            </div>
            <div>
                au16CrMin
                <Graph unsigned pow={16} value={props.value.au16CrMin} onChange={au16CrMin => send({au16CrMin})} />
            </div>
            <div>
                au16CbMax
                <Graph unsigned pow={16} value={props.value.au16CbMax} onChange={au16CbMax => send({au16CbMax})} />
            </div>
            <div>
                au16CbMin
                <Graph unsigned pow={16} value={props.value.au16CbMin} onChange={au16CbMin => send({au16CbMin})} />
            </div>
        </div>
    )
}
