import React from 'react';
import DoozieList from '../components/DoozieList';
import Calendar from '../components/Calendar';

import { useQuery } from '@apollo/client';
import { QUERY_DOOZIES } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_DOOZIES);
    const doozies = data?.doozies || [];


    return (
        <main className="flex-row">
            <div>
                {loading? (
                    <div>Loading...</div>
                ) : (
                    <DoozieList 
                    doozies={doozies}
                />
                )}
            </div>
            <div>
                <Calendar />
            </div>
        </main>
    );
};

export default Home;