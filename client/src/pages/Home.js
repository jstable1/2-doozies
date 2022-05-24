import React from 'react';
import DoozieList from '../components/DoozieList';
import Calendar from '../components/Calendar';

import { useQuery } from '@apollo/client';
import { QUERY_DOOZIES } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_DOOZIES);
    const doozies = data?.doozies || [];

    const moment = require('moment');
    const date = moment().format('l [To-Do List:]');


    return (
        <main className="flex-row">
            <div>
                <h2>{date}</h2>
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