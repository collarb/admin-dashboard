import { useState, useEffect } from "react";
import { HODS_API, DESIGS_API, LOCATION_API, DEPARTMENT_API } from "../../util/apis";
import useFetch from "../core/useFetch";

function useAccountMasterData() {
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [loadingDesigs, setLoadingDesigs] = useState(true);
  const [loadingDivs, setLoadingDivs] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const ajax = useFetch();

  useEffect(() => {
    ajax(DEPARTMENT_API).then((data) => {
      if (data) setDepartments(data.results);
      setLoadingDeps(false);
    });

    ajax(DESIGS_API).then((data) => {
      if (data) setDesignations(data.results);
      setLoadingDesigs(false);
    });

    ajax(LOCATION_API).then((data) => {
      if (data) setDivisions(data.results);
      setLoadingDivs(false);
    });
  }, []);

  return {
    departments,
    designations,
    divisions,
    loading: loadingDeps || loadingDesigs || loadingDivs,
  };
}

export default useAccountMasterData;
