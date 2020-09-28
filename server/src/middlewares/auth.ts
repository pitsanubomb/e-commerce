import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
class AuthJwt {
  static checkAuth = (req: Request, res: Response, next: NextFunction) => {
    let jwtToken: any = req.headers["x-authorization"];
    let isAuth: any;

    try {
      if (jwtToken) {
        jwtToken = jwtToken.replace(/Bearer /g, "");
        isAuth = jwt.verify(jwtToken, "secretis1234");
        res.locals.isAuth = isAuth;
      } else {
        res.status(401).send();
        return;
      }
    } catch (error) {
      res.status(401).send();
      return;
    }

    const { userId, username } = jwtToken;
    const newToken = jwt.sign({ userId, username }, "secretis1234", {
      expiresIn: "1h",
    });
    res.setHeader("refreshtoken", newToken);
    next();
  };
}
export default AuthJwt;
