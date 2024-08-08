import axios from 'axios';
import * as cheerio from 'cheerio';
import Operator from '../models/operator';

class CallsignService {
    /**
     * Fetches callsign information based on the given search text.
     * @param {string} searchText - The search text for the query.
     * @returns {Promise<Object>} - A Promise that resolves with the fetched data.
     */
    public async getCallsignBundesnetzagentur(callsign: string): Promise<any> {
        try {
            let operator = new Operator();

            const initialResponse = await axios.get('https://ans.bundesnetzagentur.de/amateurfunk/Rufzeichen.aspx');
            const $ = cheerio.load(initialResponse.data);

            const postResponse = await axios.post('https://ans.bundesnetzagentur.de/amateurfunk/Rufzeichen.aspx', new URLSearchParams({
                    __EVENTTARGET: $('input[name="__EVENTTARGET"]').val(),
                    __VIEWSTATE: $('input[name="__VIEWSTATE"]').val(),
                    __VIEWSTATEGENERATOR: $('input[name="__VIEWSTATEGENERATOR"]').val(),
                    __EVENTVALIDATION: $('input[name="__EVENTVALIDATION"]').val(),
                    Text1: callsign,
                    Bt_Suche: 'Suche starten'
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

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
                return {error: "Callsign not found"};
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error fetching data: ${error.message}`);
            } else {
                throw error;
            }
        }
    }
}

export default new CallsignService();