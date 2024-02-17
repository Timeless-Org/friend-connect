import { verificateCodeModel } from "../models/code";
import { createPointFromId, getSpecificPointModel } from "../models/point";
import { createUserModel, getUserFromCodeModel, getUserModel } from "../models/user";

export const VerifyCodeService = async (code: string, address: string): Promise<boolean> => {
  try {
    const res = await verificateCodeModel(code);
    console.log(`✅ VerifyCodeService: ${res}`)
    if (res) {
      const inviteUser = await getUserFromCodeModel(code);
      console.log(`✅ VerifyCodeService: inviteUser -> ${JSON.stringify(inviteUser)}, address -> ${address}`);
      if (!inviteUser || inviteUser.address === address) throw new Error("User not found");
      let requestUser = await getUserModel(address);
      if (!requestUser) {
        requestUser = await createUserModel({ address });
      }
      const alreadyAddPoint = await getSpecificPointModel(inviteUser.id, requestUser.id, 0);
      if (alreadyAddPoint.length === 0) await createPointFromId(inviteUser.id, requestUser.id,  0);
      return true;
    }
    return false;
  } catch (err) {
    console.log(`👾 VerifyCodeService: ${err}`);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return false;
  }
};
