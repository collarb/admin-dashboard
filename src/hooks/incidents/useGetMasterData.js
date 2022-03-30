import {useState, useEffect} from 'react';
import useFetch from '../core/useFetch';
import { INCIDENTS_API, LOCATION_API } from '../../util/apis';

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
        ajax(`${LOCATION_API}`).then(data => {
            setDivisions(data.results);
            setFetchingData(false);
        });
    }, []);

    useEffect(() => {
        let mounted = true;
        ajax(`${INCIDENTS_API}type/`)
            .then(data => {
                if (mounted) {
                    setTypes(data.results);
                    setFetchingTypes(false);
                }
            })
            .catch(() => {});

        return () => {
            mounted = false;
        };
    }, []);

    const fetchChildren = (parent, meta) => {
        ajax(`${LOCATION_API}${parent}`).then(data => {
            switch (meta) {
                case 'parishes':
                    setParishes(data.areas);
                    break;

                case 'villages':
                    setVillages(data.areas);
                    break;

                case 'streets':
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
