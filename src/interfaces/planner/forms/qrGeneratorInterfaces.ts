export interface TimeLapse{
    startDate: Date;
    startTime: Date;
    endDate: Date;
    endTime: Date;
}

export interface TimeLapseProps{
    timeLapseValues: TimeLapse | null,
    setTimeLapseValues: (values: TimeLapse) => void;
}