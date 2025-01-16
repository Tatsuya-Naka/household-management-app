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

export type EditRecordType = {
    id: string;
    type: {name: string};
    comment: string | null;
    object: string | null;
    currency: {name: string};
    dateString: string;
    country: {name: string};
    income_amount: number | null;

    incomeresource: {name: string} | null;
    incomecategory: {name?: string} | null;
    income_status: string | null;
    regular_num: number | null;
    regular_unit: string | null;

    genre: string | null;
    Items: EditItemsType[],
    payment_method: string | null;
}

export type EditItemsType = {id: string, item: string, category: {name: string}, subcategory: {name: string} | null, amount: number, cost: number};