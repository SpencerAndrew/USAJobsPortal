
import React, { useState, useMemo } from 'react';
import { holidays2026 } from '../constants';
import { useCountdown } from '../hooks/useCountdown';
import { CalendarIcon } from './icons';
import { Holiday } from '../types';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <div className="bg-white rounded-lg shadow-inner p-3 md:p-4">
            <span className="text-2xl md:text-4xl font-bold text-brand-blue">{value.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-xs md:text-sm text-gray-600 mt-1 block">{label}</span>
    </div>
);

const HolidayItem: React.FC<{ holiday: Holiday, status: 'past' | 'today' | 'upcoming' }> = ({ holiday, status }) => {
    const { icon: Icon } = holiday;
    const date = new Date(holiday.date);
    
    const statusClasses = {
        past: 'bg-gray-100 text-gray-500',
        today: 'bg-green-100 text-green-800 border-l-4 border-green-500',
        upcoming: 'bg-white hover:bg-gray-50'
    };
    
    return (
        <li className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 ${statusClasses[status]}`}>
            <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${status === 'past' ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-brand-blue'}`}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-grow">
                <p className={`font-semibold ${status === 'past' ? 'text-gray-600' : 'text-gray-800'}`}>{holiday.name}</p>
                <p className="text-sm text-gray-500">{holiday.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
                {status === 'today' ? (
                    <span className="px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full">TODAY</span>
                ) : (
                    <>
                        <p className="text-sm font-semibold">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-gray-400">{date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    </>
                )}
            </div>
        </li>
    );
};

const HolidayCalendar: React.FC = () => {
    const [showAll, setShowAll] = useState(false);

    const { nextHoliday, allHolidaysForDisplay } = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let upcoming = holidays2026.filter(h => new Date(h.date) >= today);
        const past = holidays2026.filter(h => new Date(h.date) < today);
        
        let currentNextHoliday;
        let displayList;
        
        if (upcoming.length > 0) {
            currentNextHoliday = upcoming[0];
            displayList = [...upcoming, ...past.reverse()];
        } else {
            // All holidays for this year have passed. Roll over to next year.
            const nextYear = now.getFullYear() + 1;
            const holidaysNextYear = holidays2026.map(h => {
                const nextYearDateStr = h.date.replace(String(now.getFullYear()), String(nextYear));
                return { ...h, date: nextYearDateStr };
            });
            currentNextHoliday = holidaysNextYear[0];
            upcoming = holidaysNextYear;
            displayList = [...upcoming, ...past.reverse()];
        }
        
        return {
            nextHoliday: currentNextHoliday,
            allHolidaysForDisplay: displayList,
        };
    }, []);

    const { days, hours, minutes, seconds } = useCountdown(nextHoliday.date);

    const displayedHolidays = showAll ? allHolidaysForDisplay : allHolidaysForDisplay.slice(0, 6);

    const getStatus = (holiday: Holiday): 'past' | 'today' | 'upcoming' => {
        const now = new Date();
        const holidayDate = new Date(holiday.date);
        if (now.toDateString() === holidayDate.toDateString()) return 'today';
        if (holidayDate < now) return 'past';
        return 'upcoming';
    };

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center"><CalendarIcon className="w-8 h-8 mr-3 text-brand-blue"/> Federal Holiday Calendar</h2>
                <button onClick={() => setShowAll(!showAll)} className="text-brand-blue font-semibold hover:underline">
                    {showAll ? 'View Less' : `View All Holidays (${allHolidaysForDisplay.length})`}
                </button>
            </div>
            <p className="text-gray-600 mb-6">Official U.S. Government Holidays. Now showing dates for {new Date(nextHoliday.date).getFullYear()}.</p>

            <div className="bg-red-50 rounded-lg p-6 mb-8 border border-red-200">
                <p className="text-sm text-center text-red-700 font-semibold">Next Federal Holiday</p>
                <h3 className="text-3xl font-bold text-center text-red-800 mt-1">{nextHoliday.name}</h3>
                <p className="text-center text-red-600 mt-1">{new Date(nextHoliday.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="mt-4 grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
                    <CountdownUnit value={days} label="Days" />
                    <CountdownUnit value={hours} label="Hours" />
                    <CountdownUnit value={minutes} label="Minutes" />
                    <CountdownUnit value={seconds} label="Seconds" />
                </div>
            </div>

            <ul className="space-y-3">
                {displayedHolidays.map(holiday => (
                    <HolidayItem key={`${holiday.name}-${holiday.date}`} holiday={holiday} status={getStatus(holiday)}/>
                ))}
            </ul>

            <div className="mt-6 bg-blue-50 border-l-4 border-brand-blue p-4 rounded-r-lg">
                <p className="text-sm text-blue-800"><span className="font-bold">Federal Holiday Information:</span> Federal holidays are designated by the U.S. government for federal employees. Most federal offices are closed on these days. State and local government offices, as well as private businesses, may observe different holiday schedules.</p>
            </div>
        </section>
    );
};

export default HolidayCalendar;
