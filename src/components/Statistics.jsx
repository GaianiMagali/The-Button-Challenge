import React, { useEffect, useState } from 'react';
import { getStatisticsUsers } from '../core/session';
import _ from 'lodash';

const colors = [
    "purple",
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
]

export const Statistics = () => {   
  
    return (
        <div className="container-statistics">
            <span className="title-statics">Clicks statistics by users:</span>
            {
                colors.map((color, i) =>
                    <div className="statistics-data" key={i}>
                        <div className={`square-statistics square-${color}`}></div>
                        <p className="statistics-number">
                            {
                               getStatisticsUsers() && getStatisticsUsers().filter(e => e.buttonColor === color).length
                            } users
                        </p>
                    </div>
                )
            }
        </div>
    )
}
