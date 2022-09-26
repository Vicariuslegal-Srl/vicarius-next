import Head from "next/head";
import Image from "next/image";
import { API } from "../../../shared/utils";
import { constants } from "../../../constants/constants";
import { AppShell } from "../../../shared/AppShell";
import { Box } from "../../../shared/Typography";
import { AppList, AppListItem, AppListItemIcon, AppListItemText } from "../../../shared/AppList";

export async function getServerSideProps(context) {
    const { id } = context.query;
    try {
        const response = await API('user/' + id);
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

export default function UserDetailView({ data }) {

    return <AppShell>
        <Head>
            <title>{`Avv. ${data.name}`}</title>
            <meta name="description" content={data.summary || "Nessuna descrizione presente"} />
        </Head>
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
                    {data.cv && <AppListItem>
                        <AppListItemText
                            title="Curriculum"
                            subtitle={<a href={data.cv} download={true}>download</a>}
                        />
                    </AppListItem>}
                    <AppListItem>
                        <AppListItemText
                            title="Contatti"
                            subtitle={data.email + (data.phone && data.show_phone ? ', ' + data.phone : '')}
                        />
                    </AppListItem>
                </AppList>
            </main>
        </Box>
    </AppShell>
}