import React from 'react';
import t from 'tcomb-validation';

const SOURCE = 'tcomb-form-native';
const nooptions = Object.freeze({});
const noop = function () {
};
const noobj = Object.freeze({});
const noarr = Object.freeze([]);
const Nil = t.Nil;

import Component from '../Component';

class FormTextbox extends Component {

    getTransformer() {
        const options = this.props.options;
        return options.transformer ? options.transformer :
            this.typeInfo.innerType === t.Number ? FormTextbox.numberTransformer :
                FormTextbox.transformer;
    }

    getTemplate() {
        return this.props.options.template || this.props.ctx.templates.textbox;
    }

    getPlaceholder() {
        let placeholder = this.props.options.placeholder;
        if (Nil.is(placeholder) && this.getAuto() === 'placeholders') {
            placeholder = this.getDefaultLabel();
        }
        return placeholder;
    }

    getKeyboardType() {
        const keyboardType = this.props.options.keyboardType;
        if (t.Nil.is(keyboardType) && this.typeInfo.innerType === t.Number) {
            return 'numeric';
        }
        return keyboardType;
    }

    getLocals() {

        const locals = super.getLocals();
        locals.placeholder = this.getPlaceholder();
        locals.onChangeNative = this.props.options.onChange;
        locals.keyboardType = this.getKeyboardType();
        locals.underlineColorAndroid = (this.props.options.underlineColorAndroid || 'transparent');

        [
            'renderType',
            'textBoxBoarderColor',
            'help',
            'autoCapitalize',
            'autoCorrect',
            'autoFocus',
            'blurOnSubmit',
            'editable',
            'maxLength',
            'multiline',
            'onBlur',
            'onEndEditing',
            'onFocus',
            'onLayout',
            'onSelectionChange',
            'onSubmitEditing',
            'onContentSizeChange',
            'placeholderTextColor',
            'secureTextEntry',
            'selectTextOnFocus',
            'selectionColor',
            'numberOfLines',
            'clearButtonMode',
            'clearTextOnFocus',
            'enablesReturnKeyAutomatically',
            'keyboardAppearance',
            'onKeyPress',
            'returnKeyType',
            'selectionState',
            'editStyle'
        ].forEach((name) => locals[name] = this.props.options[name]);

        return locals;
    }


}

function toNull(value) {
    return (t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value;
}

function parseNumber(value) {
    const n = parseFloat(value);
    const isNumeric = (value - n + 1) >= 0;
    return isNumeric ? n : toNull(value);
}


FormTextbox.transformer = {
    format: value => Nil.is(value) ? '' : value,
    parse: toNull
};

FormTextbox.numberTransformer = {
    format: value => Nil.is(value) ? '' : String(value),
    parse: parseNumber
};

module.exports = FormTextbox;
