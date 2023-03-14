import { IRouter } from "express";
import { createCampaign, deleteCampaign, filterCampaigns, getAllCampaigns, getCampaign, initiateDonation, updateCampaign, verifyCampaign } from "./campaign.controller";

const campaignRoute = (router: IRouter) => {
    router.route("/campaign/verify/:id").get(verifyCampaign)
    router.route("/campaign/filter").post(filterCampaigns)
    router.route("/campaign/initiate-donation").post(initiateDonation)

    router.route("/campaign").post(createCampaign).get(getAllCampaigns);
    router.route("/campaign/:id").get(getCampaign).patch(updateCampaign).delete(deleteCampaign)
}

export {campaignRoute}