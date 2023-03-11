import { createProfile, getProfile } from "./profile.controller";
import express, { Express, IRouter } from "express";

export const profileRoute = (router: IRouter) => {
    router.route('/profile').post(createProfile).get(getProfile);

    router.route('/profile/:id').get(getProfile)
}

