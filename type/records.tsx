export type RecordEditCurrentType = {
    id: string;
    incomeresource: {name: string};
    incomecategory: {name: string};
    income_amount: number;
    object: string;
    income_status: boolean;
    dateString: string;
    dateCalendar: string;
    currency: {
        name: number;
    }
    genre: string;
    Items: {item: string; cost: number}[];
    totalcost: number;
};

export type RecordEditPrevType = {
    id: string;
    incomeresource: {name: string};
    incomecategory: {name: string};
    income_amount: number;
    income_status: boolean;
    dateString: string;
    dateCalendar: string;
    currency: {
        name: number;
    }
    genre: string;
    Items: {item: string; cost: number}[];
    totalcost: number;
};