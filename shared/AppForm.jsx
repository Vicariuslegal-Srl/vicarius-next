import {Field, Form, Formik} from "formik";
import {API} from "./utils";
import {Fragment, useState} from "react";

export const AppForm = ({values, url, callback}) => {

    const [formErrors, setFormErrors] = useState({});

    return <Formik
        initialValues={values}
        onSubmit={values1 => API(url, 'post', values1)
            .then(response => callback(response))
            .catch(reason => setFormErrors(reason.response.data))
        }
    >
        <Form>
            {Object.keys(values).map((item, i) => <Fragment key={i}>
                <label>{item}</label>
                <Field
                    name={item}
                    type={values[item].type}
                    as={values[item].component || 'is'}
                    value={values[item].value}
                    placeholder={values[item].placeholder}
                >
                    {values[item].options && values[item].options.map((option, i) => <option key={i} value={option.value}>
                        {option.label}
                    </option>)}
                </Field>
                {formErrors[item] && <div className='danger-text form-box'>formErrors[item]</div>}
            </Fragment>)}
        </Form>
    </Formik>
}