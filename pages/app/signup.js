// import {termsRoutes} from "../../constants/routes";
// import {Link, useNavigate} from "react-router-dom";
import {FlexBox} from "../../shared/Typography";
import {Fragment, useEffect, useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import {defaultLoginRedirect, registrationURL} from "./config";
import {Form, Field, Formik} from "formik";
import {API} from "../../shared/utils";
// import {APIURL, resetPasswordURL} from "../config";
import Link from "next/link";

export default function LoginView(){

    // const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('/app/login')
    // const [registrationFormOpen, setRegistrationFormOpen] = useState(false);
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const {next} = Object.fromEntries(urlSearchParams.entries());

    // useEffect(() => {
    //     if (next){
            // setRedirectUrl(next)
    //     }
    // }, [next]);

    const saveUser = (user) => {
        setLoading(true);
        loadUser(user);
        navigate(redirectUrl);
    }

    return <div className="alert-login">
            <div>
                <p>
                    Per utilizzare il servizio Vicarius Legal, iscriviti inserendo i tuoi dati.
                    Iscrivendoti al network potrai:
                    <ol>
                        <li>Consultare i profili degli avvocati iscritti alla piattaforma</li>
                        <li>Trovare colleghi per sostituzioni in udienza</li>
                        <li>Rimanere aggiornato sulle nostre attività, anche pubblicistiche</li>
                    </ol>
                </p>
                {loading ? <FlexBox justify="center">
                    <ClipLoader />
                </FlexBox> : <Fragment>
                <div className="alert-form">
                        <Formik
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            onSubmit={values => {
                                    API("registration/", 'post', values)
                                        .then(response => {
                                            if (response.data.response.success){
                                                saveUser(response.data.response.user);
                                            } else {
                                                alert('attenzione, accesso fallito')
                                            }
                                        }).catch(err => alert('attenzione, accesso fallito'))
                                }
                            }>
                            <Form>
                                <label>Nome</label>
                                <Field type='string' name='first_name' />
                                <label>Cognome</label>
                                <Field type='string' name='last_name' />
                                <label>Email</label>
                                <Field type='email' name='username' />
                                <label>Password</label>
                                <Field type='password' name='password1' />
                                <label>Ripeti Password</label>
                                <Field type='password' name='password2' />
                                <br/><br/>
                                <FlexBox justify='center'>
                                    <button type="submit" className="regular-btn contained">
                                        INVIA
                                    </button>
                                </FlexBox>
                            </Form>
                        </Formik>
                    </div>
                    <p>sei già registrato?</p>
                    <FlexBox justify="center">
                        <Link href={'/app/signin'}>
                            <a className="regular-btn contained secondary">
                                ACCEDI
                            </a>
                        </Link>
                    </FlexBox>
                    {/*<p>
                        { termsRoutes.map((route, i) => <Link key={i} to={route.path} className='ref'>
                            {route.label}
                        </Link>) }
                    </p>*/}
                </Fragment>}
            </div>
    </div>
}