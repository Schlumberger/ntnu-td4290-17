export default function extractVisibilitySettings({ state, props }) {
  const layers = props.response.value.reduce((acc, line) => {
    acc[line.id] = true;
    return acc;
  }, {});

  return { settings: layers };
}
