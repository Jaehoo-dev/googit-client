
export default function onKeyDownHandler(event, value, setValue) {
  event.preventDefault();
  console.log(value, 'init');
  if (value.length === 1) return;
  console.log(event, 'after h1');
  if (event.key === 'z' && event.ctrlKey) {
    console.log('here');
  }

}

