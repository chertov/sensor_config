import * as React from 'react';
import { SliderValueU16 } from './slider';

export interface IMwbAttr {
    u16Rgain: number
    u16Grgain: number
    u16Gbgain: number
    u16Bgain: number
}
export const MwbAttrDefault = () : IMwbAttr => ({
    u16Rgain: 0, u16Grgain: 0, u16Gbgain: 0, u16Bgain: 0,
})

export interface IMwbAttrProps {
    value: IMwbAttr
    onChange(value: IMwbAttr): void
}
export class MwbAttr extends React.Component<IMwbAttrProps> {
    send = (new_field) => {
        let new_props = Object.assign(this.props.value, new_field)
        this.props.onChange(new_props)
    }
    render() {
        return (
            <div>
                Defines the manual AWB attributes of the ISP.
                <div>
                    <div>
                        u16Rgain - Red channel gain for manual AWB (8-bit decimal precision)
                        <SliderValueU16 value={this.props.value.u16Rgain} onChange={u16Rgain => this.send({u16Rgain})} />
                    </div>
                    <div>
                        u16Grgain - Green channel gain for manual AWB (8-bit decimal precision)
                        <SliderValueU16 value={this.props.value.u16Grgain} onChange={u16Grgain => this.send({u16Grgain})} />
                    </div>
                    <div>
                        u16Gbgain - Green channel gain for manual AWB (8-bit decimal precision)
                        <SliderValueU16 value={this.props.value.u16Gbgain} onChange={u16Gbgain => this.send({u16Gbgain})} />
                    </div>
                    <div>
                        u16Bgain - Blue channel gain for manual AWB (8-bit decimal precision)
                        <SliderValueU16 value={this.props.value.u16Bgain} onChange={u16Bgain => this.send({u16Bgain})} />
                    </div>
                </div>
            </div>
        );
    }
}