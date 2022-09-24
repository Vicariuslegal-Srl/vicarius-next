import axios from "axios";
import {useState, useEffect, useRef, Fragment} from "react";
import {constants} from "../constants/constants";
import {FlexBox, FlexItemContainer} from "./Typography";
import {ClipLoader} from "react-spinners";

const window = {localStorage: {}};
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const fbApiRequest = (url, f, method="GET", args={}) => {
    return window.FB.api(
        url,
        method,
        args,
        response => {
            if (!response || response.error) {
                alert('Attenzione, qualcosa non va');
            } else {
                f(response);
            }
        }
    );
}

export const browserLog = mess => console.log(mess);

export const useFetchedData = (url, slug) => {

    const cache = useRef({});
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setIsLoading(true);
            return await API(url).then(response => {
                setData(response.data);
                setIsLoading(false);
                cache.current[url] = response.data;
            });
        };
        if (!cache[url]){
            fetchData();
        } else {
            setData(cache.current[url]);
        }
    }, [url, slug]);

    const Loading = ({ children }) => {

        return isLoading ? <FlexItemContainer>
            <FlexBox justify='center'>
                <ClipLoader color='#038b79' />
            </FlexBox>
        </FlexItemContainer> : <Fragment>{children}</Fragment>
    }

    return { data, Loading };
};

const storeUser = (user) => user;
const getUser = () => null;
const deleteUser = () => null;

export const saveUser = (user, f=null) => {
    if (user){
        const _user = {
            isLogged: true,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            picture: user.picture,
            id: user.id
        }
        storeUser(_user);
        window.requestUser = _user;
    }
    if (f){
        return f();
    }
    return window.requestUser;
}

export const loadUser = (f) => {
    const user = getUser();
    window.requestUser = user;
    f(user);
}

export const useRequestUser = () => {
    const [requestUser, setRequestUser] = useState(getUser());
    if (!requestUser) {

        API(constants.userCheckingUrl).then(response => {

            if (response && response.data){

                const _user = saveUser(response.data);
                setRequestUser(_user);
            }
        })
    }
    const logoutUser = () => {
        deleteUser();
        setRequestUser(null);
        delete window.requestUser;
    }
    return { requestUser, logoutUser }
}

export const API = async (endpoint, method='get', data=null) => {

    const url = constants.remoteAPIBaseUrl + endpoint;
    try {
        return await axios({url, method: method.toLowerCase(), data});
    } catch (e) {
        if (!constants.debug){
            return window.location.href = `/app/${e.response.status}`;
        }
    }
}

export const cutString = str => {

    const maxStrLength = 120;
    let finalStr = str;

    if (str.length > maxStrLength){
        finalStr = str.substring(0, maxStrLength) + "...";
    }
    return finalStr;
}

export const formatTextWithLink = (content) => {
    const expMatch = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const newExpMatch = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    const element_content = content.replace(expMatch, "<a style='color: #3B5998' href='$1'>$1</a>");
    return element_content.replace(newExpMatch, '$1<a style="color: #3B5998" target="_blank" href="http://$2">$2</a>');
}

export const formatTextWithBolder = (content) => {
    const expMatch = /^[0-9]\..*$/gim;
    return content.replace(expMatch, '<div><br/><b style="font-size: 18px;">$&</b><br/><br/></div>');
}
