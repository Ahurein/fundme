import { IRouter } from "express";
import { createCampaign, deleteCampaign, getAllCampaigns, getCampaign, updateCampaign, verifyCampaign } from "./campaign.controller";

const campaignRoute = (router: IRouter) => {
    router.route("/campaign/verify/:id").get(verifyCampaign)

    router.route("/campaign").post(createCampaign).get(getAllCampaigns);
    router.route("/campaign/:id").get(getCampaign).patch(updateCampaign).delete(deleteCampaign)
}

export {campaignRoute}