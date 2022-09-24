const requestedPermissions = ["email","name","picture"];
const groupId = `1042268625926090`;

const remoteAPIBaseUrl = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000/api/v1/' : '/api/v1/';

export const constants = {
    debug: process.env.NODE_ENV === "development",
    remoteBaseUrl: 'https://www.vicariuslegal.it/',
    requestUserStorageKey: 'vicarius_request_user',
    remoteAPIBaseUrl: remoteAPIBaseUrl,
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
}