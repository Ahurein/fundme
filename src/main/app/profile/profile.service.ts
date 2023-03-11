import ProfileModel from "./profile.model";

const createProfileService = async (data: any) => await ProfileModel.create(data);
const getProfileService = async (id: String) => await ProfileModel.findOne({userId: id});




export {createProfileService,getProfileService}