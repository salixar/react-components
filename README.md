### Test Kit - Component Library

**Dropdowns**

...
const [value, setValue] = useState('');
const numbers = ['One', 'Two', 'Three'];

// Пример
`<Dropdown 
  options={numbers}
  className="my-class"
  placeholder="Выберите из списка"
  onClick={(e) => setValue(e)}
  value={value}
 />`

