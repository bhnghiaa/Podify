import {
  create,
  sendReVerificationToken,
  verifyEmail,
  sendForgetPasswordLink,
  grantValid,
  updatePassword,
  signIn,
  updateProfile,
  sendProfile,
  logOut,
} from "#/controllers/auth";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  TokenAndIDValidation,
  UpdatePasswordValidation,
} from "#/utils/validationSchema";
import fileParser, { RequestWithFiles } from "#/middleware/fileParser";
import { isValidPassResetToken, mustAuth } from "#/middleware/auth";
import { Router } from "express";
const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", sendForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(UpdatePasswordValidation),
  isValidPassResetToken,
  updatePassword
);
router.post("/sign-in", signIn);
router.post("/is-auth", mustAuth, sendProfile);
router.post("/update-profile", mustAuth, fileParser, updateProfile);
router.post("/log-out", mustAuth, logOut);
export default router;
