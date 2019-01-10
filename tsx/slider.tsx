import * as React from 'react';
import {InputNumber, Slider} from 'antd';

interface ISliderValueSizedProps {
    min: number
    max: number
    value: number
    onChange(value: number): void
}
class SliderValue extends React.Component<ISliderValueSizedProps> {
    render() {
        return (
            <div>
                <InputNumber min={this.props.min} max={this.props.max} value={this.props.value} onChange={this.props.onChange} />
                <Slider min={this.props.min} max={this.props.max} value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
    }
}

interface ISliderValueProps {
    value: number
    onChange(value: number): void
}

export const umax = (pow: number): number => Math.pow(2, pow)-1
export const smin = (pow: number): number => -(Math.pow(2, pow)/2)
export const smax = (pow: number): number => Math.pow(2, pow)/2-1

export class SliderValueU8 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={0} max={umax(8)} {...this.props} />) }
}
export class SliderValueS8 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={smin(8)} max={smax(8)} {...this.props} />) }
}

export class SliderValueU16 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={0} max={umax(16)} {...this.props} />) }
}
export class SliderValueS16 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={smin(16)} max={smax(16)} {...this.props} />) }
}

export class SliderValueU32 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={0} max={umax(32)} {...this.props} />) }
}
export class SliderValueS32 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={smin(32)} max={smax(32)} {...this.props} />) }
}

export class SliderValueU64 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={0} max={umax(64)} {...this.props} />) }
}
export class SliderValueS64 extends React.Component<ISliderValueProps> {
    render() { return (<SliderValue min={smin(64)} max={smax(64)} {...this.props} />) }
}