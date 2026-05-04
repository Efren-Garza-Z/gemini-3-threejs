"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Part {
    id: string;
    text: string;
    type: "subject" | "verb" | "object" | "time" | string;
}

interface DragDropSentenceProps {
    parts: Part[];
    correctOrder: string[];
    onSuccess: () => void;
}

export default function DragDropSentence({ parts, correctOrder, onSuccess }: DragDropSentenceProps) {
    const [items, setItems] = useState<Part[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setIsClient(true);
        // Shuffle initially
        setItems([...parts].sort(() => Math.random() - 0.5));
    }, [parts]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
    };

    const checkAnswer = () => {
        const currentOrder = items.map(item => item.id);
        const correct = currentOrder.join(",") === correctOrder.join(",");
        setIsCorrect(correct);
        if (correct) {
            onSuccess();
        }
    };

    const getColorForType = (type: string) => {
        switch (type) {
            case "subject": return "bg-blue-100 border-blue-400 text-blue-800";
            case "verb": return "bg-red-100 border-red-400 text-red-800";
            case "object": return "bg-green-100 border-green-400 text-green-800";
            case "time": return "bg-purple-100 border-purple-400 text-purple-800";
            default: return "bg-gray-100 border-gray-400 text-gray-800";
        }
    };

    if (!isClient) return null; // Avoid hydration mismatch

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-xl text-gray-800 mb-2">Form the correct sentence:</h3>
            <p className="text-gray-500 mb-6 font-medium">Drag and drop the word blocks below to form a grammatically correct sentence.</p>
            
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sentence" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-wrap gap-2 p-6 bg-gray-50 rounded-2xl min-h-[100px] items-center border-2 border-dashed border-gray-300 relative"
                        >
                            {items.length === 0 && (
                                <span className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                                    Drop words here
                                </span>
                            )}
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`
                                                px-5 py-3 rounded-xl border-2 font-bold text-lg shadow-sm cursor-grab active:cursor-grabbing
                                                ${getColorForType(item.type)}
                                                ${snapshot.isDragging ? "scale-105 shadow-xl opacity-90 z-50 rotate-2" : ""}
                                            `}
                                            style={provided.draggableProps.style}
                                        >
                                            {item.text}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={checkAnswer}
                    className="bg-[#58cc02] hover:bg-[#46a302] text-white font-bold py-3 px-8 rounded-2xl shadow-[0_4px_0_rgb(60,138,2)] active:shadow-none active:translate-y-1 transition-all"
                >
                    CHECK
                </button>
                
                {isCorrect === true && (
                    <span className="text-[#58cc02] font-bold flex items-center gap-2">
                        <span className="text-2xl">✓</span> Excellent!
                    </span>
                )}
                {isCorrect === false && (
                    <span className="text-red-500 font-bold flex items-center gap-2">
                        <span className="text-2xl">✗</span> Try again
                    </span>
                )}
            </div>
        </div>
    );
}
