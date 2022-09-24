import {Field, useField} from "formik";
import {Fragment, useState} from "react";

const mdInputSettings = {

    types: {

        text: 'text',
        textArea: 'textarea',
        select: 'select',
        date: 'date',
        password: 'password',
        email: 'email'
    }
}

const BaseMDStructure = ({isActive, children, isOutlined = true, setFocusOut}) => {

    return <div
        className={`md-component ${isActive ? 'active' : ''} ${isOutlined ? 'outlined' : ''}`}
        onFocus={() => console.log('focused on')}
        onBlur={() => {
            setFocusOut && setFocusOut(false)
        }}
    >
        {children}
    </div>
}

const BaseInput = ({name, label, value, required, onChangeHandler, displayValue = null, disabled = false}) => {

    const inputID = `id_${name}_${Date.now()}`;
    const [field, meta] = useField({name, value});
    field.value = value;

    return <Fragment>
        <input
            type='hidden'
            value={value}
            required={required}
            name={name}
            autoComplete='off'
        />
        <input
            id={inputID}
            required={required}
            value={displayValue || value}
            onChange={event => onChangeHandler && onChangeHandler(event)}
            disabled={disabled}
        />
        <label htmlFor={inputID}>
            {label || name}
        </label>
    </Fragment>
}

export const MDInput = ({
    name,
    value = null,
    required = false,
    label = null,
    isOutlined = true,
    ...props
}) => {

    const type = mdInputSettings.types.text;
    const [isActive, setIsActive] = useState(!!value);
    const [inputValue, setInputValue] = useState(value);
    const [displayValue, setDisplayValue] = useState(null);

    const onChangeHandler = event => {
        setInputValue(event.target.value);
        setDisplayValue(event.target.value);
        setIsActive(!!event.target.value);
    }

    return (<BaseMDStructure
        isOutlined={isOutlined}
        isActive={isActive}
        onClick={() => setIsActive(true)}
    >
        <BaseInput
            name={name}
            label={label}
            type={type}
            value={inputValue}
            displayValue={displayValue}
            required={required}
            onChangeHandler={event => onChangeHandler(event)}
        />
    </BaseMDStructure>)
}

export const MDEmail = ({
    name,
    value = null,
    required = false,
    label = null,
    isOutlined = true
}) => {

    const type = mdInputSettings.types.email;

    return <MDInput
        name={name}
        value={value}
        required={required}
        label={label}
        isOutlined={isOutlined}
    />
}

export const MDInputSelect = ({
    name,
    // value = null,
    required = false,
    label = null,
    isOutlined = true,
    options = []
}) => {

    const type = mdInputSettings.types.select;
    const [isActive, setIsActive] = useState(!!options[0].value);
    const [inputValue, setInputValue] = useState(options[0].value);
    const [inputOnFocus, setInputOnFocus] = useState(false);
    const [displayValue, setDisplayValue] = useState(options[0].label);

    const optionSelectHandler = ({value, label}) => {
        setInputOnFocus(false);
        setDisplayValue(label);
        setInputValue(value);
        setIsActive(true);
    }

    return (<BaseMDStructure
        isOutlined={isOutlined}
        isActive={isActive}
        setFocusOut={(val) => setInputOnFocus(val)}
    >
        <BaseInput
            name={name}
            label={label}
            type={type}
            value={inputValue}
            displayValue={displayValue}
            required={required}
            disabled
        />
        <span
            className={`md-component__icon fas fa-caret-${inputOnFocus ? 'up' : 'down'}`}
            onClick={() => setInputOnFocus(!inputOnFocus)}
        />
        {options && inputOnFocus && <div className='md-component__options-container'>
             {options.map((option, i)  => <option
                 key={i}
                 value={option.value}
                 onClick={() => optionSelectHandler(option)}
             >
                 {option.label}
             </option>)}
        </div>}
    </BaseMDStructure>)
}

export const MDAutocompleteInput = ({
    name,
    value = null,
    required = false,
    label = null,
    isOutlined = true,
    options = []
}) => {

    const type = mdInputSettings.types.select;
    const [isActive, setIsActive] = useState(!!value);
    const [inputValue, setInputValue] = useState(value);
    const [inputOnFocus, setInputOnFocus] = useState(false);
    const [displayValue, setDisplayValue] = useState(null);

    const filterOptions = options => {
        return options.filter(option => (
            inputValue && typeof inputValue === "string")
            ? option.label.toLowerCase().includes(inputValue.toLowerCase())
            : option
        ).slice(0, 4)
    }

    const optionSelectHandler = ({value, label}) => {
        setInputOnFocus(false);
        setDisplayValue(label);
        setInputValue(value);
        setIsActive(true);
    }

    const onChangeHandler = event => {
        setInputValue(event.target.value);
        setDisplayValue(event.target.value);
        setIsActive(!!event.target.value);
        setInputOnFocus(!!event.target.value);
    }

    return (<BaseMDStructure
        isOutlined={isOutlined}
        isActive={isActive}
        setFocusOut={(val) => setInputOnFocus(val)}
    >
        <BaseInput
            name={name}
            label={label}
            type={type}
            value={inputValue}
            displayValue={displayValue}
            required={required}
            onChangeHandler={event => onChangeHandler(event)}
        />
        {options && inputOnFocus && <div className='md-component__options-container'>
             {filterOptions(options).map((option, i)  => <option
                 key={i}
                 value={option.value}
                 onClick={() => optionSelectHandler(option)}
             >
                 {option.label}
             </option>)}
        </div>}
    </BaseMDStructure>)
}
