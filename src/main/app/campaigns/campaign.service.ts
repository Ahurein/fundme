import CampaignModel from "./campaign.model";

const createCampaignService = async (data: any) => await CampaignModel.create(data) 

const getCampaignService = async (id: any) => await CampaignModel.findById(id)

const getAllCampaignsService = async () => await CampaignModel.find()

const updateCampaignService = async (id: string, data: any) =>
CampaignModel.findByIdAndUpdate(id, data, {new: true});

const deleteCampaignService = async (id: string) =>
CampaignModel.findByIdAndDelete(id);

export {createCampaignService, getCampaignService, getAllCampaignsService, updateCampaignService, deleteCampaignService}