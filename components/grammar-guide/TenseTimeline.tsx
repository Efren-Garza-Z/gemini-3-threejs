"use client";

import React from "react";

interface TimelineProps {
    past: boolean;
    present: boolean;
    future: boolean;
}

export default function TenseTimeline({ past, present, future }: TimelineProps) {
    return (
        <div className="py-8">
            <div className="relative w-full h-1 bg-gray-300 flex items-center justify-between">
                {/* Past Marker */}
                <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${past ? 'bg-orange-500 scale-125' : 'bg-gray-400'}`}></div>
                    <span className={`mt-2 font-bold text-sm ${past ? 'text-orange-600' : 'text-gray-400'}`}>PAST</span>
                </div>

                {/* Present Marker */}
                <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${present ? 'bg-teal-500 scale-125' : 'bg-gray-400'}`}></div>
                    <span className={`mt-2 font-bold text-sm ${present ? 'text-teal-600' : 'text-gray-400'}`}>PRESENT</span>
                </div>

                {/* Future Marker */}
                <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${future ? 'bg-blue-500 scale-125' : 'bg-gray-400'}`}></div>
                    <span className={`mt-2 font-bold text-sm ${future ? 'text-blue-600' : 'text-gray-400'}`}>FUTURE</span>
                </div>
            </div>
        </div>
    );
}
