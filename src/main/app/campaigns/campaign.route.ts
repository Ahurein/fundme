import { IRouter } from "express";
import { createCampaign, getAllCampaigns, getCampaign, verifyCampaign } from "./campaign.controller";

const campaignRoute = (router: IRouter) => {
    router.route("/campaign/verify/:id").get(verifyCampaign)

    router.route("/campaign").post(createCampaign).get(getAllCampaigns);
    router.route("/campaign/:id").get(getCampaign)
}

export {campaignRoute}