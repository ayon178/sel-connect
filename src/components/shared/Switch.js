const Switch = ({ enabled, setEnabled }) => {
  return (
    <label
      htmlFor="toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle"
        className="sr-only peer"
        checked={enabled}
        onChange={() => setEnabled && setEnabled(!enabled)}
      />
      <div className="w-11 h-5 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  )
}

export default Switch
