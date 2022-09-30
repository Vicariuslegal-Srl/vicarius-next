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

const LoginForm = ({ loadUser }) => {

    return <div className="alert-form">
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={values => {
                    API("login/", 'post', values)
                        .then(response => {
                            if (response.data.response.success){
                                loadUser(response.data.response.user);
                            } else {
                                alert('attenzione, accesso fallito')
                            }
                        }).catch(err => alert('attenzione, accesso fallito'))
                }
            }>
            <Form>
                <label>Email</label>
                <Field type='email' name='username' />
                <label>Password</label>
                <Field type='password' name='password' />
                <a href={'/app/reset-password'} className='password-link'>Password dimenticata?</a>
                <br/>
                <FlexBox justify='center'>
                    <button type="submit" className="regular-btn contained">
                        INVIA
                    </button>
                </FlexBox>
            </Form>
        </Formik>
    </div>
}

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
                    Per utilizzare il servizio Vicarius Legal, che ti consente di entrare in contatto
                    con centinaia di professionisti in tutto il territorio nazionale, inserisci le tue credenziali
                </p>
                {loading ? <FlexBox justify="center">
                    <ClipLoader />
                </FlexBox> : <Fragment>
                    <LoginForm loadUser={user => saveUser(user)}/>
                    <p>oppure</p>
                    <FlexBox justify="center">
                        <Link href={'/app/signup'}>
                            <a className="regular-btn contained secondary">
                                REGISTRATI
                            </a>
                        </Link>
                    </FlexBox>
                    {/*<p>
                        { termsRoutes.map((route, i) => <Link key={i} to={route.path} className='ref'>
                            {route.label}
                        </Link>) }
                    </p>*/}
                    {/*registrationFormOpen && <AppModal close={() => setRegistrationFormOpen(false)}>
                        <RegistrationForm />
                    </AppModal>*/}
                </Fragment>}
            </div>
    </div>
}