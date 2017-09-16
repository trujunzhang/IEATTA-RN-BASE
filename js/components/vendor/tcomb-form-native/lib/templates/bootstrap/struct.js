let React = require('react');
let { View, Text } = require('react-native');

function struct(locals) {
  if (locals.hidden) {
    return null;
  }

  let stylesheet = locals.stylesheet;
  let fieldsetStyle = stylesheet.fieldset;
  let controlLabelStyle = stylesheet.controlLabel.normal;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  let error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>{locals.error}</Text> : null;

  let rows = locals.order.map(function (name) {
    return locals.inputs[name];
  });

  return (
    <View style={fieldsetStyle}>
      {label}
      {error}
      {rows}
    </View>
  );
}

module.exports = struct;
