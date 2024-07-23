const callsignService = require('../services/callsignService');
const operatorController = require('../controllers/operatorController');

class CallsignController {
    async getCallsign(req, res) {
        const callsign = req.query.callsign;

        if (!callsign) {
            return res.status(400).json({error: 'search term parameter is required'});
        }

        try {
            const operator = await operatorController.get(callsign);
            if (operator) {
                res.json(operator);
            } else {
                console.log("Callsign " + callsign + " not found in DB, searching online.");
                const operator = await callsignService.getCallsignBundesnetzagentur(callsign);

                if (operator) {
                    await operatorController.create(operator);
                }

                res.json(operator);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = new CallsignController();
