import { platformController } from "../controllers/platformController.ts";
import { userController } from "../controllers/userController.ts";
import useFetch from "./useFetch.ts";

const useApi = () => {
  const { fetchApi, loading } = useFetch();

  const user = userController(fetchApi);
  const platform = platformController(fetchApi);

  return {
    user,
    platform,
    loading,
  };
};

export default useApi;
