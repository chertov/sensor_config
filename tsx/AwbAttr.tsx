import * as React from 'react';
import { Checkbox, Radio } from 'antd';

import { SliderValueU16, SliderValueU8 } from './slider';
import { Graph } from './graph';
import { IAwbCtLimitAttr, AwbCtLimitAttr, AwbCtLimitAttrDefault } from './AwbCtLimitAttr';
import { IAwbCbCrTrackAttr, AwbCbCrTrackAttr, AwbCbCrTrackAttrDefault } from './AwbCbCrTrackAttr';
import { IAwbLumHistgramAttr, AwbLumHistgramAttr, AwbLumHistgramAttrDefault } from './AwbLumHistgramAttr';

enum AwbAlgType {
    AWB_ALG_LOWCOST = 0,
    AWB_ALG_ADVANCE = 1
}
export interface IAwbAttr {
    bEnable: boolean
    u16RefColorTemp: number
    au16StaticWB: Array<number>     // HI_U16 au16StaticWB[4];
    as32CurvePara: Array<number>    // HI_S32 as32CurvePara[6];
    enAlgType: AwbAlgType
    u8RGStrength: number
    u8BGStrength: number
    u16Speed: number
    u16ZoneSel: number
    u16HighColorTemp: number
    u16LowColorTemp: number
    stCTLimit: IAwbCtLimitAttr
    bShiftLimitEn: boolean
    u8ShiftLimit: number
    bGainNormEn: boolean
    stCbCrTrack: IAwbCbCrTrackAttr
    stLumaHist: IAwbLumHistgramAttr
}
export const AwbAttrDefault = () : IAwbAttr => ({
    bEnable: true,
    u16RefColorTemp: 0,
    au16StaticWB: [0,0,0,0],     // HI_U16 au16StaticWB[4];
    as32CurvePara: [0,0,0,0,0,0],    // HI_S32 as32CurvePara[6];
    enAlgType: AwbAlgType.AWB_ALG_LOWCOST,
    u8RGStrength: 0,
    u8BGStrength: 0,
    u16Speed: 0,
    u16ZoneSel: 0,
    u16HighColorTemp: 0,
    u16LowColorTemp: 0,
    stCTLimit: AwbCtLimitAttrDefault(),
    bShiftLimitEn: true,
    u8ShiftLimit: 0,
    bGainNormEn: true,
    stCbCrTrack: AwbCbCrTrackAttrDefault(),
    stLumaHist: AwbLumHistgramAttrDefault(),
})

export interface IAwbAttrProps {
    value: IAwbAttr
    onChange(value: IAwbAttr): void
}
export class AwbAttr extends React.PureComponent<IAwbAttrProps> {
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
                    u16RefColorTemp
                    <SliderValueU16 value={this.props.value.u16RefColorTemp} onChange={u16RefColorTemp => this.send({u16RefColorTemp})} />
                </div>
                <div>
                    au16StaticWB
                    <Graph unsigned pow={16} value={this.props.value.au16StaticWB} onChange={au16StaticWB => this.send({au16StaticWB})} />
                </div>
                <div>
                    as32CurvePara
                    <Graph unsigned pow={32} value={this.props.value.as32CurvePara} onChange={as32CurvePara => this.send({as32CurvePara})} />
                </div>
                <div>
                    enAlgType
                    <Radio.Group value={this.props.value.enAlgType} onChange={e => this.send({enAlgType: e.target.value})}>
                        <Radio value={0} >AWB_ALG_LOWCOST</Radio>
                        <Radio value={1} >AWB_ALG_ADVANCE</Radio>
                    </Radio.Group>
                </div>
                <div>
                    u8RGStrength
                    <SliderValueU8 value={this.props.value.u8RGStrength} onChange={u8RGStrength => this.send({u8RGStrength})} />
                </div>
                <div>
                    u8BGStrength
                    <SliderValueU8 value={this.props.value.u8BGStrength} onChange={u8BGStrength => this.send({u8BGStrength})} />
                </div>
                <div>
                    u16Speed
                    <SliderValueU16 value={this.props.value.u16Speed} onChange={u16Speed => this.send({u16Speed})} />
                </div>
                <div>
                    u16ZoneSel
                    <SliderValueU16 value={this.props.value.u16ZoneSel} onChange={u16ZoneSel => this.send({u16ZoneSel})} />
                </div>
                <div>
                    u16HighColorTemp
                    <SliderValueU16 value={this.props.value.u16HighColorTemp} onChange={u16HighColorTemp => this.send({u16HighColorTemp})} />
                </div>
                <div>
                    u16LowColorTemp
                    <SliderValueU16 value={this.props.value.u16LowColorTemp} onChange={u16LowColorTemp => this.send({u16LowColorTemp})} />
                </div>
                <div>
                    stCTLimit
                    <AwbCtLimitAttr value={this.props.value.stCTLimit} onChange={stCTLimit => this.send({stCTLimit})} />
                </div>
                <div>
                    bShiftLimitEn
                    <Checkbox checked={this.props.value.bShiftLimitEn} onChange={e => this.send({bShiftLimitEn: e.target.checked})} />
                </div>
                <div>
                    u8ShiftLimit
                    <SliderValueU8 value={this.props.value.u8ShiftLimit} onChange={u8ShiftLimit => this.send({u8ShiftLimit})} />
                </div>
                <div>
                    bGainNormEn
                    <Checkbox checked={this.props.value.bGainNormEn} onChange={e => this.send({bGainNormEn: e.target.checked})} />
                </div>
                <div>
                    stCbCrTrack
                    <AwbCbCrTrackAttr value={this.props.value.stCbCrTrack} onChange={stCbCrTrack => this.send({stCbCrTrack})} />
                </div>
                <div>
                    stLumaHist
                    <AwbLumHistgramAttr value={this.props.value.stLumaHist} onChange={stLumaHist => this.send({stLumaHist})} />
                </div>
            </div>
        );
    }
}