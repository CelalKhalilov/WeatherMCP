import { z } from 'zod';
declare const WeatherToolParams: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    latitude: number;
    longitude: number;
}, {
    latitude: number;
    longitude: number;
}>;
export declare const weatherTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>;
    execute({ latitude, longitude }: z.infer<typeof WeatherToolParams>): Promise<string>;
};
export {};
