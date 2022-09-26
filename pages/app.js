import axios from 'axios';
import { constants } from "../constants/constants";
import { AppShell } from "../shared/AppShell";
import {Box} from "../shared/Typography";
import {AppList, AppListItem, AppListItemIcon, AppListItemText} from "../shared/AppList";
import Link from 'next/link';
import Image from 'next/image';
import { API } from '../shared/utils';
// import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { ...params } = context.query;
  const query = Object.keys(params).map((key, i) => key + '=' + params[key]).join('&');
  const endpoint = 'user/?limit=100&page=0&' + query;
  try {
      const response = await API(endpoint);
      return {
          props: {
              data: response.data
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

export default function Home({ data }) {
  return (
    <AppShell>
      <div>
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
                      return (<Link key={i} href={'/app/user/' + user.id}>
                        <a>
                          <AppListItem border>
                              <AppListItemIcon weight="large">
                                  <Image alt={user.name} src={constants.remoteBaseUrl + user.picture} width='65' height='65' />
                              </AppListItemIcon>
                              <AppListItemText
                                  title={user.name}
                                  //subtitle={user.places}
                                  subtitle={user.areas.map(e => e.area).join(', ')}
                              />
                          </AppListItem>
                        </a>
                      </Link>)
                  })}
              </AppList>
            </main>
        </Box>
    </div>
    </AppShell>
  )
}
