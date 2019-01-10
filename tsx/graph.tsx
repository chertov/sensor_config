import * as React from 'react'
import { Slider } from 'antd'
import * as CSS from 'csstype'

import { smin, smax, umax } from './slider'

export interface IGraphProps {
    unsigned: boolean
    pow: number
    value: Array<number>
    onChange(value: Array<number>): void
}
export class Graph extends React.Component<IGraphProps> {
    send = (new_field) => {
        let new_props = Object.assign(this.props.value, new_field)
        this.props.onChange(new_props)
    }

    onChange = (index, value) => {
        let new_props = Object.assign([], this.props.value)
        new_props[index] = value
        this.props.onChange(new_props)
    }
    render() {
        const style: CSS.Properties = {
            float: 'left',
            height: '200',
            marginLeft: '50',
        };
        const {unsigned, pow, value} = this.props;
        const min = unsigned ? 0 : smin(pow);
        const max = unsigned ? umax(pow) : smax(pow);

        const sliders = [];
        for (let i = 0; i < value.length; i++) {
            sliders.push(
                <div key={i} style={style}>
                    <Slider vertical min={min} max={max} value={value[i]} onChange={val => this.onChange(i, val)} />
                </div>
            )
        }

        return (
            <div style={{height: '200'}}> {sliders} </div>
        );
    }
}
