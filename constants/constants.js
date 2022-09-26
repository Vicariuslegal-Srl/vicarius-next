const requestedPermissions = ["email","name","picture"];
const groupId = `1042268625926090`;

export const constants = {
    debug: process.env.NODE_ENV === "development",
    remoteBaseUrl: 'https://www.vicariuslegal.it/',
    requestUserStorageKey: 'vicarius_request_user',
    remoteAPIBaseUrl: 'https://www.vicariuslegal.it/api/v1/',
    amazonUrlDesktop: "https://rcm-eu.amazon-adsystem.com/e/cm?o=29&p=14&l=ur1&category=amazon_business&banner=1RFD5ZJTXCCWAX5VS602&f=ifr&linkID=52bdef3916fdae1a5edd850a24165ed0&t=vicariuslegal-21&tracking_id=vicariuslegal-21",
    amazonUrlMobile: "https://rcm-eu.amazon-adsystem.com/e/cm?o=29&p=12&l=ur1&category=amazon_business&banner=190TMXTRHHQ1MSA8Y002&f=ifr&linkID=8898d639ee3838e5d9a3df327089c317&t=vicariuslegal-21&tracking_id=vicariuslegal-21",
    fiverrUrlDesktop: "https://fiverr.ck-cdn.com/tn/serve/geoGroup/?rgid=9&bta=324061",
    fiverrUrlMobile: "https://www.fiverr.com/embed_gigs?id=U2FsdGVkX18MBCdIFexIcMY0yKA1nz4eqYziwHf+hN83Gpxld6s+YJH1zc0QlK217T/NINADxSyYjolrP68jMCCpuLKWBTqtOSalHfcmEMsOHyqDqUcBBXPTFpaqkPy3soaPRTXmUGIcHwZCqKgUgxwEFJL6Vt8rD4TOSeDjSHywuIiiBaE3LbrblcqMHJLXuGe5htEd774Ler+yYskl5wTk6H6/TtECdsk6du3+gktHvTZY3Rdh39sM8aVAwQhaQQTTXmti4Hq1vjebNoIaFKYcaFRnraxGNJJyUrwFGWMZ61jDv4geYtmoNdd5DWGpe+u5pmyZeTDnf7D1PNXAPGLx/qtKcE6lfCFyUZze9RAw8pvILcHx4z3W6CTLaB3+AoFGVlc0ccHFH8MLlapYI/V0z41tU2QEOk2c8BfM0MtV9upAKH1UFkV+o84HFpo7CvVMIxJUohaMg4wP0pjgyU8AtpAjTmGYoW5mnCECCgC68qYapnTFSOBuJ1o4McqZ8eSE1BJOdPkufvPPpv7FAlQ4KZCeLGLlLNYvc6qSIx0=&affiliate_id=324061&strip_google_tagmanager=true",
    termsPaths: ['/termini', '/privacy', '/cookies'],
    FBLoginUrl: `/me?fields=${requestedPermissions.join(",")}`,
    loginUrl: 'login',
    logoutUrl: 'logout/',
    userCheckingUrl: 'user/current',
    publishToGroupUrl: `${groupId}/feed`,
    groupPostMessageTemplate: body => `Cerco un collega sostituto a ${body.location} disponibile per il giorno ${body.date}.\nPer info visitare il link: ${body.permalink}`,
    user: 'https://www.vicariuslegal.it/api/v1/user',
    searchUsersParams: ['first_name', 'last_name', 'dati_utente__citta'],
    courts: ['Agrigento', 'Alessandria', 'Ancona', 'Aosta', 'Arezzo', 'Ascoli Piceno', 'Asti', 'Avellino', 'Avezzano', 'Barcellona Pozzo di Gotto', 'Bari', 'Belluno', 'Benevento', 'Bergamo', 'Biella', 'Bologna', 'Bolzano', 'Brescia', 'Brindisi', 'Busto Arsizio', 'Cagliari', 'Caltagirone', 'Caltanissetta', 'Campobasso', 'Cassino', 'Castrovillari', 'Catania', 'Catanzaro', 'Chieti', 'Civitavecchia', 'Como', 'Cosenza', 'Cremona', 'Crotone', 'Cuneo', 'Enna', 'Fermo', 'Ferrara', 'Firenze', 'Foggia', 'Forlì', 'Frosinone', 'Gela', 'Genova', 'Gorizia', 'Grosseto', 'Imperia', 'Isernia', 'Ivrea', 'Lagonegro', 'La Spezia', 'Lamezia Terme', 'Lanciano', 'Lanusei', "L'Aquila", 'Larino', 'Latina', 'Lecce', 'Lecco', 'Livorno', 'Locri', 'Lodi', 'Lucca', 'Macerata', 'Mantova', 'Marsala', 'Massa', 'Matera', 'Messina', 'Milano', 'Modena', 'Monza', 'Napoli', 'Napoli Nord', 'Nocera Inferiore', 'Nola', 'Novara', 'Nuoro', 'Oristano', 'Padova', 'Palermo', 'Palmi', 'Paola', 'Parma', 'Patti', 'Pavia', 'Perugia', 'Pesaro', 'Pescara', 'Piacenza', 'Pisa', 'Pistoia', 'Pordenone', 'Potenza', 'Prato', 'Ragusa', 'Ravenna', 'Reggio Calabria', 'Reggio Emilia', 'Rieti', 'Rimini', 'Roma', 'Rovereto', 'Rovigo', 'Salerno', 'Santa Maria Capua Vetere', 'Sassari', 'Savona', 'Sciacca', 'Siena', 'Siracusa', 'Sondrio', 'Spoleto', 'Sulmona', 'Taranto', 'Tempio Pausania', 'Teramo', 'Termini Imerese', 'Terni', 'Tivoli', 'Torino', 'Torre Annunziata', 'Trani', 'Trapani', 'Trento', 'Treviso', 'Trieste', 'Udine', 'Urbino', 'Vallo della Lucania', 'Varese', 'Velletri', 'Venezia', 'Verbania', 'Vercelli', 'Verona', 'Vibo Valentia', 'Vicenza', 'Viterbo'],
}
