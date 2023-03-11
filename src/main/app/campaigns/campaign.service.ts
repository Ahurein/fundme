import CampaignModel from "./campaign.model";

const createCampaignService = async (data: any) => await CampaignModel.create(data) 

const getCampaignService = async (id: any) => await CampaignModel.findById(id)

const getAllCampaignsService = async () => await CampaignModel.find()

export {createCampaignService, getCampaignService, getAllCampaignsService}