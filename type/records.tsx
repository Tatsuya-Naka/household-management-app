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

export type RecordsListsType = {
    id: string;
    type: {name: string};
    dateString: string;
    dateCalendar: string;
    comment: string | null;
    incomeresource: {name: string} | null;
    incomecategory: {name?: string} | null;
    income_status: string | null;
    genre: string | null;
    Items: {item: string;}[];
}
