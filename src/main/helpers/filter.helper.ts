import { ICampaign } from "../interfaces/campaign.interface";
import _ from 'lodash';

class FilterCampaigns {
    public campaigns;

    constructor(Campaigns: Array<ICampaign>) {
        this.campaigns = Campaigns
    }

    byPrice(minPrice: Number, maxPrice: Number) {
        if (!maxPrice) return this;
        this.campaigns = this.campaigns.filter((campaign) => {
            let price = Math.round(campaign.targetAmount)

            return price >= minPrice && price <= maxPrice
        })
        return this;
    }

    byOrder(sortBy: String) {
        if(!sortBy) return this
        const campaignsCopy = JSON.parse(JSON.stringify(this.campaigns)) || []
        if (sortBy === "newest") {
            campaignsCopy.sort((a: ICampaign, b: ICampaign) => {
                const timeA = a.createdAt!
                const timeB = b.createdAt!
    
                if (timeA < timeB) return 1;
                if (timeA == timeB) return 0;
                if (timeA > timeB) return -1;
    
            })
        } else if(sortBy === "oldest"){
            campaignsCopy.sort((a: ICampaign, b: ICampaign) => {
                const timeA = a.createdAt!
                const timeB = b.createdAt!
    
                if (timeA > timeB) return 1;
                if (timeA == timeB) return 0;
                if (timeA < timeB) return -1;
    
            })
        }
        this.campaigns = campaignsCopy
        // this.campaigns = _.reverse(this.campaigns)
        return this
    }

    byLowerPrice(lowerPrice: Number) {
        if(!lowerPrice) return this;

        const CampaignsCopy = JSON.parse(JSON.stringify(this.campaigns)) || []
        CampaignsCopy.sort((a: ICampaign, b: ICampaign) => {
            const priceA = a.targetAmount
            const priceB = b.targetAmount

            if (priceA > priceB) return 1;
            if (priceA == priceB) return 0;
            if (priceA < priceB) return -1;

        })
        this.campaigns = CampaignsCopy

        return this
    }

    byHigherPrice(higherPrice: Number) {
        if(!higherPrice) return this;

        const CampaignsCopy = JSON.parse(JSON.stringify(this.campaigns)) || []
        CampaignsCopy.sort((a: ICampaign, b: ICampaign) => {
            const priceA = a.targetAmount
            const priceB = b.targetAmount

            if (priceA < priceB) return 1;
            if (priceA == priceB) return 0;
            if (priceA > priceB) return -1;
        })
        this.campaigns = CampaignsCopy

        return this
    }

}

export { FilterCampaigns }