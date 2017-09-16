import React from 'react';
import {
    humanize,
    merge,
    getTypeInfo,
    getOptionsOfEnum,
    move,
    UIDGenerator,
    getTypeFromUnion,
    getComponentOptions
} from './util';

import t from 'tcomb-validation';

const SOURCE = 'tcomb-form-native';
const nooptions = Object.freeze({});
const noop = function () {
};
const noobj = Object.freeze({});
const noarr = Object.freeze([]);
const Nil = t.Nil;


class Component extends React.Component {

    constructor(props) {
        super(props);
        this.typeInfo = getTypeInfo(props.type);
        this.state = {
            hasError: false,
            value: this.getTransformer().format(props.value)
        };
    }

    getTransformer() {
        return this.props.options.transformer || this.constructor.transformer;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const should = (
            nextState.value !== this.state.value ||
            nextState.hasError !== this.state.hasError ||
            nextProps.options !== this.props.options ||
            nextProps.type !== this.props.type
        );
        return should;
    }

    componentWillReceiveProps(props) {
        if (props.type !== this.props.type) {
            this.typeInfo = getTypeInfo(props.type);
        }
        this.setState({value: this.getTransformer().format(props.value)});
    }

    onChange(value) {
        this.setState({value}, () => this.props.onChange(value, this.props.ctx.path));
    }

    getValidationOptions() {
        return {
            path: this.props.ctx.path,
            context: t.mixin(t.mixin({}, this.props.context || this.props.ctx.context), {options: this.props.options})
        };
    }

    getValue() {
        return this.getTransformer().parse(this.state.value);
    }

    isValueNully() {
        return Nil.is(this.getValue());
    }

    removeErrors() {
        this.setState({hasError: false});
    }

    pureValidate() {
        return t.validate(this.getValue(), this.props.type, this.getValidationOptions());
    }

    validate() {
        const result = this.pureValidate();
        this.setState({hasError: !result.isValid()});
        return result;
    }

    getAuto() {
        return this.props.options.auto || this.props.ctx.auto;
    }

    getI18n() {
        return this.props.options.i18n || this.props.ctx.i18n;
    }

    getDefaultLabel() {
        const ctx = this.props.ctx;
        if (ctx.label) {
            return ctx.label + (this.typeInfo.isMaybe ? this.getI18n().optional : this.getI18n().required);
        }
    }

    getLabel() {
        let label = this.props.options.label || this.props.options.legend;
        if (Nil.is(label) && this.getAuto() === 'labels') {
            label = this.getDefaultLabel();
        }
        return label;
    }

    getError() {
        if (this.hasError()) {
            const error = this.props.options.error || this.typeInfo.getValidationErrorMessage;
            if (t.Function.is(error)) {
                const validationOptions = this.getValidationOptions();
                return error(this.getValue(), validationOptions.path, validationOptions.context);
            }
            return error;
        }
    }

    hasError() {
        return this.props.options.hasError || this.state.hasError;
    }

    getConfig() {
        return merge(this.props.ctx.config, this.props.options.config);
    }

    getStylesheet() {
        return this.props.options.stylesheet || this.props.ctx.stylesheet;
    }

    getLocals() {
        return {
            path: this.props.ctx.path,
            error: this.getError(),
            hasError: this.hasError(),
            label: this.getLabel(),
            onChange: this.onChange.bind(this),
            config: this.getConfig(),
            value: this.state.value,
            hidden: this.props.options.hidden,
            stylesheet: this.getStylesheet()
        };
    }

    render() {
        const locals = this.getLocals();
        // getTemplate is the only required implementation when extending Component
        t.assert(t.Function.is(this.getTemplate), `[${SOURCE}] missing getTemplate method of component ${this.constructor.name}`);
        const template = this.getTemplate();
        return template(locals);
    }

}

Component.transformer = {
    format: value => Nil.is(value) ? null : value,
    parse: value => value
};

module.exports = Component;