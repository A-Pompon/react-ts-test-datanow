export interface External {
    sourceId: string;
    statusCode: number;
    value: string;
}

export interface ListValue {
    uri: string;
    type: string;
    value: string;
}

export interface Pulse {
    uri: string;
    version: string;
    cipherSuite: number;
    period: number;
    certificateId: string;
    chainIndex: number;
    pulseIndex: number;
    timeStamp: Date;
    localRandomValue: string;
    external: External;
    listValues: ListValue[];
    precommitmentValue: string;
    statusCode: number;
    signatureValue: string;
    outputValue: string;
}

export interface AllPulse {
    pulse: Pulse;
}

export interface HandleResult {
    status: string;
    error: Error | null;
    data: AllPulse | null;
}