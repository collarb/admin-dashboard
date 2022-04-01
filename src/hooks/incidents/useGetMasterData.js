import { useState, useEffect } from "react";
import useFetch from "../core/useFetch";
import { LOCATION_API, REPORT_API } from "../../util/apis";

function useGetMasterData() {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchingTypes, setFetchingTypes] = useState(true);
  const [types, setTypes] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [villages, setVillages] = useState([]);
  const [streets, setStreets] = useState([]);

  const ajax = useFetch();

  useEffect(() => {
    ajax(`${LOCATION_API}`).then((data) => {
      if (data) setDivisions(data.results);
      setFetchingData(false);
    });
  }, []);

  useEffect(() => {
    ajax(`${REPORT_API}type/`).then((data) => {
      if (data) setTypes(data.results);
      setFetchingTypes(false);
    });
  }, []);

  const fetchChildren = (parent, meta) => {
    ajax(`${LOCATION_API}${parent}`).then((data) => {
      switch (meta) {
        case "parishes":
          setParishes(data.areas);
          break;

        case "villages":
          setVillages(data.areas);
          break;

        case "streets":
          setStreets(data.areas);
          break;
      }
    });
  };

  return {
    divisions,
    parishes,
    villages,
    streets,
    types,
    fetchChildren,
    loading: fetchingData || fetchingTypes,
  };
}

export default useGetMasterData;
