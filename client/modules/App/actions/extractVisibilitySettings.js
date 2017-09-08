// A custom function for performing some logic
export default function extractVisibilitySettings({ props }) {
  // It gets props from the previous functions or input
  const layers = props.response.value.reduce((acc, line) => {
    acc[line.id] = true;
    return acc;
  }, {});

  // And return some object that is merged with the next functions input
  return { settings: layers };
}
