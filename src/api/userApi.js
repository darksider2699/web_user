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
export const getCheckoutByDateAndIdUserRequest = (param) => {
  return RequestHelper.post(`${apiUrl}/user/daily_checkout/${param.id}`, {
    dateRecord: param.dateRecord,
  })
    .then((res) => {
      console.log("checkout by date and id", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getUserMedicalInformationRequest = () => {
  const id = localStorage.getItem('idUser')
  return RequestHelper.get(`${apiUrl}/user/medical_user/${id}`)
    .then((res) => {
      console.log("medical get from api", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
export const getAllQuestionRequest = () => {
  console.log("Get All Question Request");
  return RequestHelper.get(`${apiUrl}/question/all`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const addNewDailyCheckinRequest = (param) => {
  console.log("addNewDailyCheckinRequest", param);
  const id = localStorage.getItem('idUser')
  return RequestHelper.put(`${apiUrl}/user/medical_user/daily_checkin/${id}`,{
    dateRecord: param.dateRecord,
    isComing: param.isComing,
    isAllowToCome: param.isAllowToCome 
  })
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("error", error)
      throw new Error(error);
    });
};
export const getAllCompanyUserInformationRequest = () => {
  return RequestHelper.get(`${apiUrl}/user/company_user/all`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const addNewDailyCheckoutRequest = ({ dateRecord, listIdContactToday}) => {
  const id = localStorage.getItem('idUser')
  return RequestHelper.put(`${apiUrl}/user/medical_user/daily_checkout/${id}`,{dateRecord, listIdContactToday})
    .then((res) => {
      console.log("Successs", res.data)
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllVaccineTypeRequest = () => {
  return RequestHelper.get(`${apiUrl}/user/medical_user/vaccine/vaccine_type/all`)
    .then((res) => {
      console.log("res", res.data)
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const addNewVaccineShotRequest = ({ date, type}) => {
  const id = localStorage.getItem('idUser')
  return RequestHelper.post(`${apiUrl}/user/medical_user/vaccine/${id}`,{date, type})
    .then((res) => {
      console.log("Successs", res.data)
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const deleteVaccineShotRequest = ({id}) => {
  return RequestHelper.delete(`${apiUrl}/user/medical_user/vaccine/${id}`)
    .then((res) => {
      console.log("Successs", res.data)
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
export const getAllCovidCaseRequest = () => {
  console.log("Get All Covid Case Request");
  return RequestHelper.get(`${apiUrl}/user/covid_case/all`)
    .then((res) => {
      console.log("res quest", res.data);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};