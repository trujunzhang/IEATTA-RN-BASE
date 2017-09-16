let React = require('react');
let { View, Text, Switch } = require('react-native');

function checkbox(locals) {
  if (locals.hidden) {
    return null;
  }

  let stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let checkboxStyle = stylesheet.checkbox.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  let errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  let help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  let error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <Switch
        accessibilityLabel={locals.label}
        ref="input"
        disabled={locals.disabled}
        onTintColor={locals.onTintColor}
        thumbTintColor={locals.thumbTintColor}
        tintColor={locals.tintColor}
        style={checkboxStyle}
        onValueChange={(value) => locals.onChange(value)}
        value={locals.value}
      />
      {help}
      {error}
    </View>
  );
}

module.exports = checkbox;
