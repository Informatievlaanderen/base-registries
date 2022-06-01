import apiClient from "./api-client";

export const PublicApiClient= {
    getVersionsOfRegistries: async() : Promise<any> => {
        const path = `/basisregisters-api/v1/versions`;
        return (await apiClient.get<any>(path)).data;
    },
    getImportStatus: async (): Promise<ImportStatusResponse> => {
        const path = `/basisregisters-api/v1/status/import`;
        return (await apiClient.get<any>(path)).data;
    },
    getProjectionStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v1/status/projection`;
        return (await apiClient.get<any>(path)).data;
    },
    getCacheStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v1/status/cache`;
        return (await apiClient.get<any>(path)).data;
    },
    getSyndicationStatus: async (): Promise<any> => {
        const path = `/basisregisters-api/v1/status/syndication`;
        return (await apiClient.get<any>(path)).data;
    },
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