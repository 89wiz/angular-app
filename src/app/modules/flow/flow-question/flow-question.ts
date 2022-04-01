export interface FlowQuestion {
    position: FlowQuestionPosition,
    id: number,
    question: string,
    answers: FlowQuestionAnswer[]
}

export interface FlowQuestionPosition {
    x: number,
    y: number
}

export interface FlowQuestionAnswer {
    id: number,
    answer: string,
    leadTo: number | undefined,
    position: FlowQuestionPosition
}