// Event Interface
export interface Event {
    id: number;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
}

const events: Event[] =[    
    {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-03-15T09:00:00.000Z",
        capacity: 200,
        registrationCount: 185
    },
    {
        id: 2,
        name: "Startup Pitch Night",
        date: "2025-02-20T18:00:00.000Z",
        capacity: 50,
        registrationCount: 12
    },
    {
        id: 3,
        name: "Web Dev Workshop",
        date: "	2025-02-10T10:00:00.000Z",
        capacity: 30,
        registrationCount: 30
    }
];

export const getAllEvents = (): Event[] => {
    return events;
}

export const getEventById = (id: number): Event | undefined => {
    return events.find(event => event.id === id);
}

export const calculatePopularity = (event: Event): number => {
    if (event.capacity === 0) {
        return 0; 
    }
    return (event.registrationCount / event.capacity) * 100;
};

export const getPopularityTier = (score: number): string => {
    if (score >= 90) {
        return "Hot";
    }
    if (score >= 70) {
        return "Popular";
    }
    if (score >= 50) {
        return "Moderate";
    }
    if (score >= 25) {
        return "Building";
    }
   
    return "New";
    
};

export interface EventPopularity extends Event {
    spotsRemaining: number;
    popularityScore: number;
    popularityTier: string;
}

export const getEventPopularity = (event: Event): EventPopularity => {
    const spotsRemaining = event.capacity - event.registrationCount;
    const popularityScore = calculatePopularity(event);
    const popularityTier = getPopularityTier(popularityScore);

    return {
        ...event,
        spotsRemaining,
        popularityScore,
        popularityTier
    };
};

export const createEvent = (
    name: string,
    date: string,
    capacity: number
): Event => {
    const newEvent: Event = {
        id: events.length + 1,
        name,
        date,
        capacity,
        registrationCount: 0
};
events.push(newEvent);
return newEvent;
}

export const updateEvent = (
    id: number,
    name: string,
    date: string,
    capacity: number
): Event | undefined => {

    const event = getEventById(id);

    if (event === undefined) {
        return undefined;
    }

    event.name = name;
    event.date = date;
    event.capacity = capacity;

    return event;
}

export const deleteEvent = (id: number): boolean => {
    const index = events.findIndex(event => event.id === id);

    if (index === -1) {
        return false;
    }
    events.splice(index, 1);
    return true;
}