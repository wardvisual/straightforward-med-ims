import "./input.style.scss";
import { Checkbox } from "antd";

const Input = (prop: any) => {
  return (
    <div>
      {prop.type === "textarea" ? (
        <div className="field">
          <label htmlFor={prop.name}>
            <p>{prop.label}</p>
          </label>
          <textarea
            rows={prop.rows}
            required={prop?.required}
            name={prop.name}
            id={prop.name}
            defaultValue={prop.defaultValue}
            value={prop.value}
            onChange={prop.onChange}
          />
        </div>
      ) : prop.type === "select" ? (
        <div className="field">
          <label htmlFor={prop.name}>
            <p>{prop.label}</p>
          </label>
          <select name={prop.name} id={prop.name} onChange={prop.onChange}>
            {prop?.selectItems.map((el: any, i: number) => (
              <option
                value={el.value}
                selected={el.value === el.defaultValue}
                key={i}
              >
                {el.name}
              </option>
            ))}
          </select>
        </div>
      ) : prop.type === "checkbox" ? (
        <div className="field checkbox">
          <Checkbox
            type={prop.type}
            name={prop.name}
            id={prop.name}
            value={prop.value}
            disabled={prop?.disabled}
            onChange={prop.onChange}
          >
            <p>{prop.label}</p>
          </Checkbox>
        </div>
      ) : (
        <div className="field">
          <label htmlFor={prop.name}>
            <p>{prop.label}</p>
          </label>
          <input
            type={prop.type}
            required={prop.required}
            name={prop.name}
            id={prop.name}
            defaultValue={prop?.defaultValue}
            value={prop?.value}
            disabled={prop?.disabled}
            min={prop?.min}
            max={prop?.max}
            onChange={prop.onChange}
            readOnly={prop.readOnly}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
