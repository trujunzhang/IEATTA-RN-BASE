let React = require('react');
let {View, Text, DatePickerAndroid, TimePickerAndroid, TouchableNativeFeedback} = require('react-native');

const moment = require('moment')
const Events = require('../../../../../../lib/events').default

function datepicker(locals) {
    if (locals.hidden) {
        return null;
    }

    let stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let datepickerStyle = stylesheet.datepicker.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    let errorBlockStyle = stylesheet.errorBlock;
    let dateValueStyle = stylesheet.dateValue.normal;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        controlLabelStyle = stylesheet.controlLabel.error;
        datepickerStyle = stylesheet.datepicker.error;
        helpBlockStyle = stylesheet.helpBlock.error;
        dateValueStyle = stylesheet.dateValue.error;
    }

    // Setup the picker mode
    let datePickerMode = 'date';
    if (locals.mode === 'date' || locals.mode === 'time') {
        datePickerMode = locals.mode;
    }

    /**
     * Check config locals for Android datepicker.
     * ``locals.config.background``: `TouchableNativeFeedback` background prop
     * ``locals.config.format``: Date format function
     */
        // let formattedValue = String(locals.value);

    let formattedValue = Events.toDateString(locals.value)
    let current = moment(locals.value)

    let background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
    if (locals.config) {
        if (locals.config.format) {
            formattedValue = locals.config.format(locals.value);
        }
        if (locals.config.background) {
            background = locals.config.background;
        }
    }

    let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    let help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    let error = locals.hasError && locals.error ?
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;
    let value = locals.value ? <Text style={dateValueStyle}>{formattedValue}</Text> : null;


    return (
        <View style={formGroupStyle}>
            <TouchableNativeFeedback
                accessible={true}
                disabled={locals.disabled}
                ref="input"
                background={background}
                onPress={function () {


                    if (datePickerMode === 'time') {
                        TimePickerAndroid.open({is24Hour: true, hour: current.hours(), minute: current.minutes()})
                            .then(function (time) {
                                if (time.action !== TimePickerAndroid.dismissedAction) {
                                    const newTime = Events.updateDate(locals.value, time, 'time')
                                    // const newTime = new Date();
                                    // newTime.setHours(time.hour);
                                    // newTime.setMinutes(time.minute);
                                    locals.onChange(newTime);

                                    if (locals.onComponentPress) {
                                        locals.onComponentPress();
                                    }
                                }
                            });
                    } else {
                        let config = {
                            date: moment(locals.value).toDate() || new Date()
                        };
                        if (locals.minimumDate) {
                            config.minDate = locals.minimumDate;
                        }
                        if (locals.maximumDate) {
                            config.maxDate = locals.maximumDate;
                        }
                        DatePickerAndroid.open(config)
                            .then(function (date) {
                                if (date.action !== DatePickerAndroid.dismissedAction) {
                                    const newDate = Events.updateDate(locals.value, date, 'date')
                                    // let newDate = new Date(date.year, date.month, date.day);
                                    locals.onChange(newDate);

                                    if (locals.onComponentPress) {
                                        locals.onComponentPress();
                                    }
                                }
                            });
                    }
                }}>
                <View>
                    {label}
                    {value}
                </View>
            </TouchableNativeFeedback>
            {help}
            {error}
        </View>
    );
}

module.exports = datepicker;
