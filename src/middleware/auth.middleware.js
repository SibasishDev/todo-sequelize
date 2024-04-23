
const JWtService = require("../utils/jwt.service");

module.exports = {
    authenticateAccessToken : async (req, res, next) => {
        try{
            
            let tokenFromReq = req.body.token || req.query.token || req.headers['x-access-token'];

            if(req.headers['authorization']){
                const authHeader = req.headers['authorization'];

                if(!authHeader) return next({code : 401, message : "Access denied token required!"});

                tokenFromReq = authHeader.split(" ")[1];
            }

            if(!tokenFromReq) return next({code : 401, message : "Access Denied!"});

            const payload = await JWtService.verify(tokenFromReq);

            console.log(payload);

            if(!payload) return next({code : 401, message : "Token is expired"});

            delete payload.iat;

            delete payload.exp;

            req.user = payload;

            next();

        }catch(e){
            console.log(e);
            next({code : 401, message : "Access Denied"});
        }
    }
}