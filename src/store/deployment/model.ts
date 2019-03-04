export interface DeploymentWithDefs {
    id: string,
    name: string,
    source: string,
    processDefs: ProcessDef[],
    caseDefs: CaseDef[],
    decisionDefs: DecisionDef[],
    decisionRequirementsDefs: DecisionRequirementsDef[],
}

export interface ProcessDef {
    id: string,
    key: string,
    name: string,
    description: string,
    hasStartFormKey: boolean,
    version: number,
    versionTag: string,
    isSuspended: boolean,
}

export interface DecisionDef {
    id: string,
    key: string,
    name: string,
    version: number,
    versionTag: string,
    decisionRequirementsDefinitionId: string,
    decisionRequirementsDefinitionKey: string,
}

export interface DecisionRequirementsDef {
    id: string,
    key: string,
    name: string,
    version: number,
}

export interface CaseDef {
    id: string,
    key: string,
    name: string,
    version: number,
}

export interface FindProcessDefOptions {
    key?: string,
    name?: string,
    latest: boolean
}

export function emptyProcessDefFilter(): FindProcessDefOptions {
    return {
        key: '',
        name: '',
        latest: true,
    }
}

export interface ProcessReference {
    reference: string,
    key?: string,
    id?: string
}

export interface ProcessReferenceDetail {
    key: string,
    version?: string,
    name: string,
}
