type props = {
  darkModeHandler: () => void;
};

export default function ToggleButton({ darkModeHandler }: props) {
  return <button onClick={darkModeHandler}>토글토글</button>;
}
