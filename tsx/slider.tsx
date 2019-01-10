import * as React from 'react';
import {InputNumber, Slider} from 'antd';

interface ISliderValueSizedProps {
    min: number
    max: number
    value: number
    onChange(value: number): void
}
const SliderValue: React.SFC<ISliderValueSizedProps> = (props) => {
    return (
        <div>
            <InputNumber min={props.min} max={props.max} value={props.value} onChange={props.onChange} />
            <Slider min={props.min} max={props.max} value={props.value} onChange={props.onChange} />
        </div>
    )
}


interface ISliderValueProps {
    value: number
    onChange(value: number): void
}

export const umax = (pow: number): number => Math.pow(2, pow)-1
export const smin = (pow: number): number => -(Math.pow(2, pow)/2)
export const smax = (pow: number): number => Math.pow(2, pow)/2-1

export const SliderValueU8: React.SFC<ISliderValueProps> = (props) => <SliderValue min={0} max={umax(8)} {...props} />
export const SliderValueS8: React.SFC<ISliderValueProps> = (props) => <SliderValue min={smin(8)} max={smax(8)} {...props} />

export const SliderValueU16: React.SFC<ISliderValueProps> = (props) => <SliderValue min={0} max={umax(16)} {...props} />
export const SliderValueS16: React.SFC<ISliderValueProps> = (props) => <SliderValue min={smin(16)} max={smax(16)} {...props} />

export const SliderValueU32: React.SFC<ISliderValueProps> = (props) => <SliderValue min={0} max={umax(32)} {...props} />
export const SliderValueS32: React.SFC<ISliderValueProps> = (props) => <SliderValue min={smin(32)} max={smax(32)} {...props} />

export const SliderValueU64: React.SFC<ISliderValueProps> = (props) => <SliderValue min={0} max={umax(64)} {...props} />
export const SliderValueS64: React.SFC<ISliderValueProps> = (props) => <SliderValue min={smin(64)} max={smax(64)} {...props} />