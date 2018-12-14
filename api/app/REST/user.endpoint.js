'use strict';

import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from "../middleware/admin";

import auth from "../middleware/auth";

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        try {
            let result = await business(request).getUserManager(request).authenticate(request.body.login,request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        try {
            let result = await business(request).getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:id', auth, async (request, response, next) => {
        try {
            let result = await business(request).getUserManager(request).removeHashSession(request.body.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
};

export default userEndpoint;