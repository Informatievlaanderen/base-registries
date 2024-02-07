import apiClient from "./api-client";

export const PublicApiClient= {
    getVersionsOfRegistries: async() : Promise<any> => {
        const path = `/basisregisters-api/v2/versions`;
        return (await apiClient.get<any>(path)).data;
    },
    getImportStatus: async (): Promise<ImportStatusResponse> => {
        const path = `/basisregisters-api/v2/status/import`;
        return (await apiClient.get<any>(path)).data;
    },
    getProjectionStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v2/status/projection`;
        return (await apiClient.get<any>(path)).data;
    },
    getProducerStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v2/status/producer`;
        return (await apiClient.get<any>(path)).data;
    },
    getConsumerStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v2/status/consumer`;
        return (await apiClient.get<any>(path)).data;
    },
    getCacheStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v2/status/cache`;
        return (await apiClient.get<any>(path)).data;
    },
    getSyndicationStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v2/status/syndication`;
        return (await apiClient.get<any>(path)).data;
    },
    getImporterGrbStatus: async (): Promise<ImportStatusResponse> => {
        const path = `/basisregisters-api/v2/status/importergrb`;
        return (await apiClient.get<any>(path)).data;
    },
    getBackOfficeProjectionsStatus: async (): Promise<ImportStatusResponse> => {
        const path = `/basisregisters-api/v2/status/backoffice`;
        return (await apiClient.get<any>(path)).data;
    },
    getErrorDetail: async (id: string): Promise<string> => {
        const path = `/basisregisters-api/foutmeldingen/${id}`;
        try {
            await apiClient.get<ErrorDetailResponse>(path);
        }catch (e: any) {
            const response = e.response.data as ErrorDetailResponse;
            return JSON.stringify(response, null, 2);
        }
        return "";
    }
}
export default PublicApiClient;


export interface ImportStatusResponse {
    addressRegistry: ImportStatusRegistryItem[];
    buildingRegistry: ImportStatusRegistryItem[];
    municipalityRegistry: ImportStatusRegistryItem[];
    parcelRegistry: ImportStatusRegistryItem[];
    streetNameRegistry: ImportStatusRegistryItem[];
}

export interface ImportStatusRegistryItem {
    currentImport: any;
    lastCompletedImport: {
        from: Date;
        until: Date;
    };
    name: string;
}

export interface ErrorDetailResponse {
    type:string;
    title: string;
    detail: string;
    status: string;
    instance: string;
}