export interface DataSchemaSummary {
    key: string,
    name: string,
    description?: string,

}

export interface Datatype {
    type: string,
    key?: string,
    element?: Datatype,
    struct?: DataSchema,
}

export interface DataSchemaField {
    key: string,
    name: string,
    caption: string,
    datatype: Datatype,
    value?: any,
}

export interface DataSchemaFields {
    [key: string]: DataSchemaField
}

export interface DataSchema extends DataSchemaSummary {
    fields: DataSchemaFields
}

export interface DataSchemaFilter {
    filter: string
}

export function emptyDataSchemaFilter(): DataSchemaFilter {
    return {
        filter: '',
    };
}


export function newDataSchema(): DataSchema {
    return {
        key: '',
        name: '',
        description: '',
        fields: {},
    };
};


export interface DataSchemaDetail {
    key: string,
    name: string,
}
