import Head from "next/head";
import Image from "next/image";
import ReactWhatsapp from 'react-whatsapp';
import { constants } from "../../../constants/constants";
import { API } from "../../../shared/utils";
import { AppShell } from "../../../shared/AppShell";
import { Box, FlexBox } from "../../../shared/Typography";
import { AppList, AppListItem, AppListItemIcon, AppListItemText } from "../../../shared/AppList";
import { AppAside } from "../../../shared/AppAside";

export async function getServerSideProps(context) {
    const { id } = context.query;
    try {
        const [response, response_related_users] = await Promise.all([
            API('user/' + id),
            API('user/?limit=5&dati_utente__citta=milano')
        ]);
        console.log(response_related_users.data)
        return {
            props: {
                data: response.data,
                related_users: response_related_users.data.map(user => {
                    return {
                        name: user.name,
                        avatar: user.picture,
                        url: '/app/user/' + user.id
                    }
                })
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

const ContactForm = () => {

    return <form>
        <div>
            <FlexBox>
                <label>EMAIL</label>
                <input type='email' />
            </FlexBox>
            <FlexBox>
                <label>MESSAGGIO</label>
                <textarea></textarea>
            </FlexBox>
            <FlexBox>
                <button>INVIA</button>
            </FlexBox>
        </div>
    </form>
}

export default function UserDetailView({ data, related_users }) {

    return <AppShell>
        <Head>
            <title>{`Avv. ${data.name}`}</title>
            <meta name="description" content={data.summary || "Nessuna descrizione presente"} />
        </Head>
        <AppAside title='utenti correlati' items={related_users} />
        <Box>
            <header>
                <div className="alert-title">
                    <h3>{data.name}</h3>
                </div>
            </header>
            <main>
                <AppList>
                    <AppListItem>
                        <AppListItemIcon weight="large">
                            <Image alt={data.name} src={constants.remoteBaseUrl + data.picture} width='65' height='65' />
                        </AppListItemIcon>
                        <AppListItemText
                            title={"Avvocato del Foro di " + data.albo}
                            subtitle={data.places}
                        />
                    </AppListItem>
                    <AppListItem>
                        {data.show_phone && data.phone && <ReactWhatsapp 
                            number={data.phone.replace(/[\(\)\s\-\.]/g, '')} 
                            message={"Egregio avv. " + data.name}
                            className="waBtn">
                                whatsapp
                        </ReactWhatsapp>}
                        {data.cv && data.cv !== '/media/default.svg' && <a href={data.cv} download={true} className="cvBtn">curriculum</a>}
                    </AppListItem>
                    <AppListItem>
                        <AppListItemText
                            title="Tribunali"
                            subtitle={data.jobs && data.jobs.map((job, i) => {

                                return job.tribunale + ((i + 1) !== data.jobs.length ? ', ' : '')
                            })}
                        />
                    </AppListItem>
                    <AppListItem>
                        <AppListItemText
                            title="Materie"
                            subtitle={data.areas && data.areas.map((area, i) => {

                                return area.area + ((i + 1) !== data.areas.length ? ', ' : '')
                            })}
                        />
                    </AppListItem>
                    <AppListItem>
                        <AppListItemText
                            title="Presentazione"
                            subtitle={data.summary ? data.summary : "Nessuna descrizione presente"}
                        />
                    </AppListItem>
                    <AppListItem>
                        <AppListItemText
                            title="Contatti"
                            subtitle={data.email + (data.phone && data.show_phone ? ', ' + data.phone : '')}
                        />
                    </AppListItem>
                </AppList>
            </main>
        </Box>
        <AppAside title='contatta'>
            <ContactForm />
        </AppAside>
    </AppShell>
}