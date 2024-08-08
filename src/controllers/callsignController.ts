import callsignService from "../services/callsignService"
import operatorController from '../controllers/operatorController';

class CallsignController {
    async getCallsign(req: any, res: any) {
        const callsign = req.query.callsign;
        if (!callsign) {
            return res.status(400).json({error: 'search term parameter is required'});
        }
        try {
            const operator = await operatorController.get(callsign);
            if (operator) {
                res.json(operator);
            } else {
                console.log(`Callsign ${callsign} not found in DB, searching online.`);
                const remoteOperator = await callsignService.getCallsignBundesnetzagentur(callsign);
                if (remoteOperator) {
                    await operatorController.create(remoteOperator);
                }
                res.json(remoteOperator);
            }
        } catch (error) {
            // @ts-ignore
            res.status(500).json({error: error.message});
        }
    }
}
export default new CallsignController();