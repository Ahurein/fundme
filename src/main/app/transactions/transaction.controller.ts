import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import { keys } from "../../config/keys";
import { decodeToken } from "../../helpers/auth.helpers";
import { ITransaction, ITransactionModel } from "../../interfaces/transaction.interface";
import { apiResponse } from "../../utility/apiResponse";
import catchAsync from "../../utility/catchAsync";
import { getCampaignService } from "../campaigns/campaign.service";
import TransactionModel from "./transaction.model";
import { addTransactionService } from "./transaction.service";

const addTransaction  = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {amount} = req.query
    if(!id || !amount) return apiResponse(401, null , 'Unauthorized Access', res);
    const {data} = decodeToken(id, keys.IDS_TOKEN_KEY!) as {data: {id: string}};

    if(!data?.id) return apiResponse(400, null, 'Invalid request', res)
    const campaign = await getCampaignService(data.id,{populate: "userId"});
    if(!campaign) return apiResponse(400, null, 'Campaign does not exist', res)
    campaign.currentAmount = campaign?.currentAmount! + Number(amount)

    if(campaign.currentAmount >= campaign.targetAmount){
        campaign.targetReached = true;
    }
    campaign.save({validateBeforeSave: false})

    const transaction = await addTransactionService({
        userId: campaign?.userId._id,
        campaignId: data.id,
        transactionStatus: 'Successful',
        amount
    })


    return apiResponse(200, null, "Transaction added successfully", res)
})


export {addTransaction}