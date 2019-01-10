import * as React from 'react'
import { Slider } from 'antd'
import * as CSS from 'csstype'

import { smin, smax, umax } from './slider'

interface IGraphProps {
    unsigned: boolean
    pow: number
    value: Array<number>
    onChange(value: Array<number>): void
}
export const Graph: React.SFC<IGraphProps> = (props) => {
    const send = (new_field) => {
        let value = Object.assign(props.value, new_field)
        props.onChange(value)
    }
    const onChange = (index, value) => {
        let new_props = Object.assign([], props.value)
        new_props[index] = value
        props.onChange(new_props)
    }
    const style: CSS.Properties = {
        float: 'left',
        height: '200',
        marginLeft: '50',
    };
    const {unsigned, pow, value} = props;
    const min = unsigned ? 0 : smin(pow);
    const max = unsigned ? umax(pow) : smax(pow);

    const sliders = [];
    for (let i = 0; i < value.length; i++) {
        sliders.push(
            <div key={i} style={style}>
                <Slider vertical min={min} max={max} value={value[i]} onChange={val => onChange(i, val)} />
            </div>
        )
    }

    return (
        <div style={{height: '200'}}> {sliders} </div>
    )
}
