import { apiUrl } from "../config/index";
import RequestHelper from "../helpers/RequestHelper";

export const signInRequest = ({ username, password }) => {
  return RequestHelper.post(`${apiUrl}/auth/signin`, {
    username,
    password,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllMedicalInformationRequest = () => {
  console.log("User api")
  return RequestHelper.get(`${apiUrl}/user/medical_user/daily_checkin/all`)
  .then((res) => {
    console.log("userApi calling", res)
    return res
  })
  .catch((error) => {
    throw new Error(error);
  });
}