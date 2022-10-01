import axios from 'axios';
import { constants } from "../constants/constants";
import { AppShell } from "../shared/AppShell";
import {Box} from "../shared/Typography";
import {AppList, AppListItem, AppListItemIcon, AppListItemText} from "../shared/AppList";
import Link from 'next/link';
import Image from 'next/image';
import { API } from '../shared/utils';
import { AppAside } from '../shared/AppAside';
// import { useRouter } from 'next/router';

const termsRoutes = [];
const courtList = constants.courts.map(court => {
    return {
        title: court,
        url: "/app/?dati_utente__citta=" + court
    }
})

export async function getServerSideProps(context) {
  const { ...params } = context.query;
  const query = Object.keys(params).map((key, i) => key + '=' + params[key]).join('&');
  const endpoint = 'user/?limit=100&page=0&' + query;
  try {
      const response = await API(endpoint);
      const blogResponse = await API('blog/?limit=5&order=creation_date');
      return {
          props: {
              data: response.data,
              articles: blogResponse.data || constants.test_blogs
          },
      };
  } catch (error) {
      return {
          props: {
              error: error
          },
      };
  }
}

export default function Home({ data, articles }) {
  return (
    <AppShell>
        <AppAside title='città' items={courtList} />
        <Box>
            <header>
                <div className="alert-title">
                    <h3>AVVOCATI</h3>
                </div>
            </header>
            <main>
                <AppList>
                    {Object.keys(data).map((key, i) => {
                        const user = data[key];
                        return (<AppListItem key={i} border href={'/app/user/' + user.id}>
                            <AppListItemIcon weight="large">
                                <Image alt={user.name} src={constants.remoteBaseUrl + user.picture} width='65' height='65' />
                            </AppListItemIcon>
                            <AppListItemText
                                title={user.name}
                                //subtitle={user.places}
                                subtitle={user.areas.map(e => e.area).join(', ')}
                            />
                        </AppListItem>)
                    })}
                </AppList>
            </main>
        </Box>
        <AppAside title='blog' items={articles} />
    </AppShell>
  )
}
