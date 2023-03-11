import {NextFunction, Request, Response} from "express";
import { keys } from "../../config/keys";
import { decodeToken } from "../../helpers/auth.helpers";
import { ICampaign, ICampaignModel } from "../../interfaces/campaign.interface";
import {logger} from "../../logger";
import {apiErrorResponse, apiResponse} from "../../utility/apiResponse";
import catchAsync from "../../utility/catchAsync";
import {
  createCampaignService,
  getAllCampaignsService,
  getCampaignService,
} from "./campaign.service";

const createCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const userProfile = await createCampaignService(data);
    return apiResponse(200, userProfile, null, res);
  }
);

const getCampaign = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const campaign = await getCampaignService(id);
    if (!campaign) return apiErrorResponse(400, "No campaign to return", res);
    return apiResponse(200, campaign, null, res);
  }
);

const getAllCampaigns = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const campaigns = await getAllCampaignsService();
    if (campaigns.length < 1)
      return apiErrorResponse(400, "No campaigns to return", res);

    return apiResponse(200, campaigns, null, res);
  }
);

const verifyCampaign = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      const {data} = decodeToken(id, keys.IDS_TOKEN_KEY!) as {data: {id: string, email: string}}
      const campaign: ICampaignModel | null = await getCampaignService(data.id)!
    
      let approvedStatus = true
      if(!campaign) return apiResponse(400,null,"Invalid Request",res)
      const newApprovals: any = campaign?.approvals.map((approval:any) => {
            console.log("db email: ",approval.email)
            console.log('token email: ', data.email)
            console.log(approval)
            if(approval.email === data.email){
                approval.verified = true;
            }
            if(!(approval.verified)) approvedStatus = false;
            return approval;
      })

      campaign.approvals = newApprovals;
      campaign.approved = approvedStatus;
      campaign.save()
       apiResponse(200, null , 'Request successful', res)
    }
  );

export {createCampaign, getCampaign, getAllCampaigns, verifyCampaign};
