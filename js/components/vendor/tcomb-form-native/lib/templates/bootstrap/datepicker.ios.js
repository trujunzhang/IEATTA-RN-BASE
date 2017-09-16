import React, {PropTypes} from 'react';
import {Animated, View, TouchableOpacity, Text, DatePickerIOS} from 'react-native';

const UIPICKER_HEIGHT = 216;

const moment = require('moment')
const Events = require('../../../../../../lib/events').default

class CollapsibleDatePickerIOS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCollapsed: true,
            height: new Animated.Value(0),
            currentDateMode: 'date'
        };
    }

    getFormattedValue() {
        const locals = this.props.locals;

        let formattedValue = Events.toDateString(locals.value)
        console.log("data: " + locals.value)

        return formattedValue;
    }

    render() {
        const locals = this.props.locals;
        const stylesheet = locals.stylesheet;
        let touchableStyle = stylesheet.dateTouchable.normal;
        let datepickerStyle = stylesheet.datepicker.normal;
        let dateValueStyle = stylesheet.dateValue.normal;
        if (locals.hasError) {
            touchableStyle = stylesheet.dateTouchable.error;
            datepickerStyle = stylesheet.datepicker.error;
            dateValueStyle = stylesheet.dateValue.error;
        }

        let formattedValue = this.getFormattedValue()

        let animation = Animated.timing;
        let animationConfig = {
            duration: 200
        };
        if (locals.config) {
            if (locals.config.format) {
                formattedValue = locals.config.format(locals.value);
            }
            if (locals.config.animation) {
                animation = locals.config.animation;
            }
            if (locals.config.animationConfig) {
                animationConfig = locals.config.animationConfig;
            }
        }
        const height = (this.state.isCollapsed) ? 0 : UIPICKER_HEIGHT;
        const current = moment(locals.value).toDate()

        return (
            <View>
                <TouchableOpacity
                    style={touchableStyle}
                    disabled={locals.disabled}
                    onPress={() => {
                        animation(this.state.height, Object.assign({
                            toValue: (this.state.isCollapsed) ? UIPICKER_HEIGHT : 0
                        }, animationConfig)).start();
                        this.setState({isCollapsed: !this.state.isCollapsed});
                        if (this.state.isCollapsed) {
                            this.setState({currentDateMode: this.state.currentDateMode === "date" ? "time" : 'date'});
                        }
                    }}>
                    <Text style={dateValueStyle}>
                        {formattedValue}
                    </Text>
                </TouchableOpacity>
                <Animated.View style={{height: this.state.height, overflow: 'hidden'}}>
                    <DatePickerIOS
                        ref="input"
                        accessibilityLabel={locals.label}
                        date={current}
                        maximumDate={locals.maximumDate}
                        minimumDate={locals.minimumDate}
                        minuteInterval={locals.minuteInterval}
                        mode={this.state.currentDateMode}
                        onDateChange={(value) => locals.onChange(value)}
                        timeZoneOffsetInMinutes={locals.timeZoneOffsetInMinutes}
                        style={[datepickerStyle, {height: height}]}
                    />
                </Animated.View>
            </View>
        );
    }
}

CollapsibleDatePickerIOS.propTypes = {
    locals: PropTypes.object.isRequired
};

function datepicker(locals) {
    if (locals.hidden) {
        return null;
    }

    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    const error = locals.hasError && locals.error ?
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
        <View style={formGroupStyle}>
            {label}
            <CollapsibleDatePickerIOS locals={locals}/>
            {help}
            {error}
        </View>
    );
}

module.exports = datepicker;
