//TODO: protect all route


import {NextFunction, Request, Response} from "express";
import {keys} from "../../config/keys";
import {decodeToken, encodeToken} from "../../helpers/auth.helpers";
import { FilterCampaigns } from "../../helpers/filter.helper";
import {ICampaignModel} from "../../interfaces/campaign.interface";
import {logger} from "../../logger";
import {apiErrorResponse, apiResponse} from "../../utility/apiResponse";
import catchAsync from "../../utility/catchAsync";
import CampaignModel from "./campaign.model";
import {
  createCampaignService,
  deleteCampaignService,
  getAllCampaignsService,
  getCampaignService,
  updateCampaignService,
} from "./campaign.service";

const createCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: add videos and picture
    const data = req.body;
    const userProfile = await createCampaignService(data);
    return apiResponse(200, userProfile, null, res);
  }
);

const getCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const campaign = await getCampaignService(id);
    if (!campaign) return apiErrorResponse(400, "Invalid campaign Id", res);
    return apiResponse(200, campaign, null, res);
  }
);

const getAllCampaigns = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const campaigns = await getAllCampaignsService();
    if (campaigns.length < 1)
      return apiErrorResponse(400, "No campaigns to return", res);

    return apiResponse(200, {counts: campaigns.length, campaigns}, null, res);
  }
);

const updateCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //TODO: add videos and picture update
    const fields = [
      "targetAmount",
      "currentAmount",
      "approvals",
      "goal",
      "additionalInfo",
      "pictures",
      "videos",
    ];
    const updateKeys = Object.keys(req.body);
    const isValidFields = updateKeys.every(
      (el) =>
        fields.includes(el) &&
        !updateKeys.includes("userId") &&
        !updateKeys.includes("currency") &&
        !updateKeys.includes("status") &&
        !updateKeys.includes("approved")
    );

    if (!isValidFields)
      return apiResponse(
        400,
        null,
        "Invalid fields. Your data contains invalid inputs",
        res
      );
    const {id} = req.params;
    const campaign = await getCampaignService(id);
    if (!campaign) return apiResponse(400, null, "Campaign not found", res);
    const updatedCampaign = await updateCampaignService(id, req.body);
    return apiResponse(
      200,
      updatedCampaign,
      "Campaign updated successfully",
      res
    );
  }
);

const deleteCampaign = catchAsync(async (req: Request, res: Response) => {
//TODO: verify access before delete
  const campaignId = req.params.id;
  await deleteCampaignService(campaignId);
  return apiResponse(204, null, null, res);
});

const verifyCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {data} = decodeToken(id, keys.IDS_TOKEN_KEY!) as {
      data: {id: string; email: string};
    };
    const campaign: ICampaignModel | null = await getCampaignService(data.id)!;

    let approvedStatus = true;
    if (!campaign) return apiResponse(400, null, "Invalid Request", res);
    const newApprovals: any = campaign?.approvals.map((approval: any) => {
      if (approval.email === data.email) {
        approval.verified = true;
      }
      if (!approval.verified) approvedStatus = false;
      return approval;
    });

    campaign.approvals = newApprovals;
    campaign.approved = approvedStatus;
    campaign.save();
    apiResponse(200, null, "Request successful", res);
  }
);

const filterCampaigns = catchAsync(async (req: Request, res: Response) => {
  const campaigns = await getAllCampaignsService()
  const {lowerPrice, higherPrice, sortBy} = req.body

  const filteredData = new FilterCampaigns(campaigns).byOrder(sortBy).byLowerPrice(lowerPrice).byHigherPrice(higherPrice);

  return apiResponse(200, filteredData, null, res);
})

const initiateDonation = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.body;
  const campaign = await getCampaignService(id);
  if (!campaign) return apiErrorResponse(400, "Invalid campaign Id", res);

  const donationCallback = `${keys.BASE_HOOK_URL}/transaction/hook/donate/${encodeToken({id}, keys.IDS_TOKEN_KEY!)}`

  // TODO: redirect the user to payment platform instead of sending response
  return apiResponse(200,{donationCallback}, "Request successful", res);
})

const searchCampaigns  =  catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {search} = req.body;
    if (!search) return apiErrorResponse(400, "Invalid request", res);
    const campaigns = await CampaignModel.find({goal: {$regex: search, $options: 'i'}});
    apiResponse(200, {counts: campaigns.length, campaigns}, "Request successful", res);
  }
);
export {
  createCampaign,
  getCampaign,
  getAllCampaigns,
  verifyCampaign,
  updateCampaign,
  deleteCampaign,
  filterCampaigns,
  searchCampaigns,
  initiateDonation
};
