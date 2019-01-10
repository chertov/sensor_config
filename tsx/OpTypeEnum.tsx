import * as React from 'react';
import { Radio } from 'antd';

export enum OpType {
    OP_TYPE_AUTO = 0,
    OP_TYPE_MANUAL = 1,
}

interface IOpTypeEditorProps {
    value: OpType
    onChange(value: OpType): void
}
export class OpTypeEditor extends React.Component<IOpTypeEditorProps> {
    render() {
        return (
            <Radio.Group value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
                <Radio value={0}>OP_TYPE_AUTO</Radio>
                <Radio value={1}>OP_TYPE_MANUAL</Radio>
            </Radio.Group>
        );
    }
}