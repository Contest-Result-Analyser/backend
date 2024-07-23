const axios = require('axios');
const cheerio = require('cheerio');
const Operator = require('../models/operator');

/**
 * Ruft Rufzeichen-Informationen basierend auf dem angegebenen Suchtext ab.
 * @param {string} searchText - Der Suchtext für die Abfrage.
 * @returns {Promise<Object>} - Ein Promise, das die abgerufenen Daten enthält.
 */
async function getCallsignBundesnetzagentur(callsign) {
    try {
        let operator = new Operator();

        // Schritt 1: Initiale GET-Anfrage
        const initialResponse = await axios.get('https://ans.bundesnetzagentur.de/amateurfunk/Rufzeichen.aspx');
        const $ = cheerio.load(initialResponse.data);

        // Schritt 2: POST-Anfrage mit den gesammelten Daten
        const postResponse = await axios.post('https://ans.bundesnetzagentur.de/amateurfunk/Rufzeichen.aspx', new URLSearchParams({
            __EVENTTARGET: $('input[name="__EVENTTARGET"]').val(),
            __VIEWSTATE: $('input[name="__VIEWSTATE"]').val(),
            __VIEWSTATEGENERATOR: $('input[name="__VIEWSTATEGENERATOR"]').val(),
            __EVENTVALIDATION: $('input[name="__EVENTVALIDATION"]').val(),
            Text1: callsign,
            Bt_Suche: 'Suche starten'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Schritt 3: Verarbeiten der Antwort
        const $post = cheerio.load(postResponse.data);
        const table = $post('#DG_RZ');

        if (table.length > 0) {
            const cells = table.find('tr').eq(1).find('td');
            operator.callsign = cells.eq(0).text().trim();
            operator.license = cells.eq(1).text().trim();
            operator.owner = cells.eq(3).text().trim();
            operator.residence = cells.eq(4).text().trim();

            return operator;
        } else {
            return { error: "Callsign not found" };
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

module.exports = {
    getCallsignBundesnetzagentur
};
